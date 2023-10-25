import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { useRouter } from "next/router";
import axios from "axios";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";
import CMSLayout from "../../../panel/newCMS/layouts";
import { Card } from "antd";

const AllBlogs = () => {
  const router = useRouter();
  const [auth] = useContext(AuthContext);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingAllBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/blogs-for-admin`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setAllBlogs(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) fetchingAllBlogs();
  }, [auth && auth.token]);

  const deleteBlog = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this blog?");

      if (confirmed) {
        const { data } = await axios.delete(`${API}/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        fetchingAllBlogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CMSLayout>
        <Card>
          <div className="table-responsive">
            <table
              class="table table-striped  text-dark"
              style={{ backgroundColor: "white", borderRadius: "10px" }}
            >
              <thead>
                <tr>
                  <th scope="col">{loading ? "loading..." : "#"}</th>
                  <th scope="col">Category</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {allBlogs.length === 0 && (
                  <p className="mx-3 my-2 text-dark">Empty</p>
                )}
                {AllBlogs &&
                  allBlogs?.map((x, i) => (
                    <tr>
                      <th className="text-dark" scope="row ">
                        {++i}
                      </th>
                      <td className="text-dark">{x?.categories[0]?.name}</td>
                      <td className="text-dark">{x?.title}</td>
                      <td className="text-dark">{x?.postedBy?.name}</td>
                      <td className="text-dark">
                        <BiEdit
                          onClick={() => {
                            router.push(`/cms-test/blog/${x?._id}`);
                          }}
                        />
                      </td>
                      <td className="text-dark">
                        <TbTrash onClick={() => deleteBlog(x?._id)} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      </CMSLayout>
    </>
  );
};

export default AllBlogs;

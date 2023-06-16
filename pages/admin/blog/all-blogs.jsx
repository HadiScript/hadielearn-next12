import React, { useContext, useEffect, useState } from "react";
import PanelHeader from "../../../panel/common/PanelHeader";
import AdminLayout from "../../../panel/admin/AdminLayout";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/auth";
import { API } from "../../../config/API";
import axios from "axios";
import { Empty } from "antd";

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
      <PanelHeader />

      <AdminLayout>
        <div className="table-responsive">
          <table
            class="table table-striped  text-light"
            style={{ backgroundColor: "#0f3f5d", borderRadius: "10px" }}
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
              {AllBlogs.length === 0 && (
                <p className="mx-3 my-2 text-light">Empty</p>
              )}
              {AllBlogs &&
                allBlogs?.map((x) => (
                  <tr>
                    <th className="text-light" scope="row ">
                      1
                    </th>
                    <td className="text-light">{x?.categories[0]?.name}</td>
                    <td className="text-light">{x?.title}</td>
                    <td className="text-light">{x?.postedBy.name}</td>
                    <td className="text-light">
                      <BiEdit
                        onClick={() => {
                          router.push(`/admin/blog/${x?._id}`);
                        }}
                      />
                    </td>
                    <td className="text-light">
                      <TbTrash onClick={() => deleteBlog(x?._id)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default AllBlogs;

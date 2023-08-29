import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../../../panel/admin/AdminLayout";
import PanelHeader from "../../../panel/common/PanelHeader";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/auth";
import axios from "axios";
import { API } from "../../../config/API";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";

const allCourses = () => {
  const router = useRouter();
  const [auth] = useContext(AuthContext);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingAllCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/admin-courses`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setAllCourses(data.courses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) fetchingAllCourses();
  }, [auth && auth.token]);

  const deleteCourse = async (id) => {
    try {
      let ok = confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.delete(`${API}/delete/course/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        fetchingAllCourses();
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
                <th scope="col">Instructor</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allCourses.length === 0 ? (
                <h5 className="text-light p-4">No Course</h5>
              ) : (
                allCourses &&
                allCourses?.map((x, index) => (
                  <tr>
                    <th className="text-light" scope="row ">
                      {++index}
                    </th>
                    <td className="text-light">{x?._doc?.categories[0]?.name}</td>
                    <td className="text-light">{x?._doc?.title}</td>
                    <td className="text-light">{x?._doc?.instructor?.name}</td>
                    <td className="text-light">
                      <BiEdit
                        onClick={() => {
                          router.push(`/admin/course/${x?._doc?._id}`);
                        }}
                      />
                    </td>
                    <td className="text-light">
                      <TbTrash onClick={() => deleteCourse(x?._doc?._id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default allCourses;

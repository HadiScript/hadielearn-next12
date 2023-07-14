// AllCourses
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { AuthContext } from "../../../context/auth";
import { API } from "../../../config/API";
import { Card } from "antd";
import LMSLayout from "../../../panel/newLMS/layouts";

const AllCourses = () => {
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
    <LMSLayout>
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
                <th scope="col">Instructor</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allCourses.length === 0 ? (
                <h5 className="text-dark p-4">No Course</h5>
              ) : (
                allCourses &&
                allCourses?.map((x, index) => (
                  <tr>
                    <th className="text-dark" scope="row ">
                      {++index}
                    </th>
                    <td className="text-dark">{x?.categories[0]?.name}</td>
                    <td className="text-dark">{x?.title}</td>
                    <td className="text-dark">{x?.instructor?.name}</td>
                    <td className="text-dark">
                      <BiEdit
                        onClick={() => {
                          router.push(`/lms-test/courses/${x?._id}`);
                        }}
                      />
                    </td>
                    <td className="text-dark">
                      <TbTrash onClick={() => deleteCourse(x?._id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </LMSLayout>
  );
};

export default AllCourses;

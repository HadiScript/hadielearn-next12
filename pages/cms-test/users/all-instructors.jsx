import React from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { TbTrash } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";
import CMSLayout from "../../../panel/newCMS/layouts";
import { Card } from "antd";

const AllInstructors = () => {
  const router = useRouter();
  const [auth] = useContext(AuthContext);
  const [allEmployee, setAllEmployee] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/admin/all-user`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setAllEmployee(data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) fetchingAllUsers();
  }, [auth && auth.token]);

  const deleteCourse = async (id) => {
    try {
      let ok = confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.delete(`${API}/admin/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setAllEmployee(allEmployee.filter((x) => x._id !== id));
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
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {allEmployee.length === 0 ? (
                  <h5 className="text-dark p-4">No Course</h5>
                ) : (
                  allEmployee &&
                  allEmployee?.map((x, index) => (
                    <tr>
                      <th className="text-dark" scope="row ">
                        {++index}
                      </th>
                      <td className="text-dark">{x.name}</td>
                      <td className="text-dark">{x.role}</td>
                      <td className="text-dark">{x.email}</td>

                      {auth?.user?._id !== x._id && (
                        <td className="text-dark">
                          <BiEdit
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              router.push(`/cms-test/users/${x._id}`)
                            }
                          />
                        </td>
                      )}

                      {auth?.user?._id !== x._id && (
                        <td className="text-dark">
                          <TbTrash
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteCourse(x._id)}
                          />
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </CMSLayout>
    </>
  );
};

export default AllInstructors;

import React from "react";
import PanelHeader from "../../../panel/common/PanelHeader";
import AdminLayout from "../../../panel/admin/AdminLayout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { TbTrash } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { API } from "../../../config/API";

const AllUsers = () => {
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
      <PanelHeader />
      <AdminLayout>
        <div className="table-responsive">
          <table class="table table-striped  text-light" style={{ backgroundColor: "#0f3f5d", borderRadius: "10px" }}>
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
                <h5 className="text-light p-4">No Course</h5>
              ) : (
                allEmployee &&
                allEmployee?.map((x, index) => (
                  <tr>
                    <th className="text-light" scope="row ">
                      {++index}
                    </th>
                    <td className="text-light">{x.name}</td>
                    <td className="text-light">{x.role}</td>
                    <td className="text-light">{x.email}</td>

                    {auth?.user?._id !== x._id && (
                      <td className="text-light">
                        <BiEdit style={{ cursor: "pointer" }} onClick={() => router.push(`/admin/edit-user/${x._id}`)} />
                      </td>
                    )}

                    {auth?.user?._id !== x._id && (
                      <td className="text-light">
                        <TbTrash style={{ cursor: "pointer" }} onClick={() => deleteCourse(x._id)} />
                      </td>
                    )}
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

export default AllUsers;

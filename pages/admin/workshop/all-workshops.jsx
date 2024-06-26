import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../../../panel/admin/AdminLayout";
import PanelHeader from "../../../panel/common/PanelHeader";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/auth";
import axios from "axios";
import { API } from "../../../config/API";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";

const All_Workshops = () => {
  const router = useRouter();
  const [auth] = useContext(AuthContext);
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingAllWorkshops = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/admin-workshops`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setAllWorkshops(data.allworkshops);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) fetchingAllWorkshops();
  }, [auth && auth.token]);

  const deleteWorkshop = async (id) => {
    try {
      let ok = confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.delete(`${API}/delete/workshop/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        fetchingAllWorkshops();
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
              {allWorkshops.length === 0 ? (
                <h5 className="text-light p-4">No Workshop</h5>
              ) : (
                allWorkshops &&
                allWorkshops?.map((x, index) => (
                  <tr>
                    <th className="text-light" scope="row ">
                      {++index}
                    </th>
                    <td className="text-light">{x?.categories[0]?.name}</td>
                    <td className="text-light">{x?.title}</td>
                    <td className="text-light">{x?.instructor?.name}</td>

                    <td className="text-light">
                      <BiEdit
                        onClick={() => {
                          router.push(`/admin/workshop/${x?._id}`);
                        }}
                      />
                    </td>
                    <td className="text-light">
                      <TbTrash onClick={() => deleteWorkshop(x?._id)} />
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

export default All_Workshops;

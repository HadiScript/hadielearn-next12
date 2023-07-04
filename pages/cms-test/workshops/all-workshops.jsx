import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import CMSLayout from "../../../panel/newCMS/layouts";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";
import { Card } from "antd";

const allWorkshops = () => {
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
    <CMSLayout>
      <Card>
        <div className="table-responsive">
          <h5>All Workshops</h5>
          <hr />
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
              {allWorkshops.length === 0 ? (
                <h5 className="text-dark p-4">No Workshop</h5>
              ) : (
                allWorkshops &&
                allWorkshops?.map((x, index) => (
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
                          router.push(`/cms-test/workshops/${x?._id}`);
                        }}
                      />
                    </td>
                    <td className="text-dark">
                      <TbTrash onClick={() => deleteWorkshop(x?._id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </CMSLayout>
  );
};

export default allWorkshops;

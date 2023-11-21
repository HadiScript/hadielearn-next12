// AllCourses
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { AuthContext } from "../../../context/auth";
import { API } from "../../../config/API";
import CMSLayout from "../../../panel/newCMS/layouts";
import { Card } from "antd";
import Btn from "../../../components/ui/Btn";
import { toast } from "react-hot-toast";

const AllCourses = () => {
  const router = useRouter();
  const [auth] = useContext(AuthContext);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

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

  const disableCourse = async (id) => {
    try {
      setShowLoading(true);
      const { data } = await axios.put(
        `${API}/show-or-not/${id}`,
        { showOrNot: false },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(data);
      if (data.ok) {
        setShowLoading(false);
        toast.success("Course has been disable");
        fetchingAllCourses();
      }
    } catch (error) {
      console.log(error);
      setShowLoading(false);
      toast.error("Try again");
    }
  };

  const enableCourse2 = async (id) => {
    try {
      setShowLoading(true);
      const { data } = await axios.put(
        `${API}/show-or-not-2/${id}`,
        { showOrNot: true },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(data);
      if (data.ok) {
        setShowLoading(false);
        toast.success("Course has been disable");
        fetchingAllCourses();
      }
    } catch (error) {
      console.log(error);
      setShowLoading(false);
      toast.error("Try again");
    }
  };

  const disableCourse2 = async (id) => {
    try {
      setShowLoading(true);
      const { data } = await axios.put(
        `${API}/show-or-not-2/${id}`,
        { showOrNot: false },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(data);
      if (data.ok) {
        setShowLoading(false);
        toast.success("Course has been disable");
        fetchingAllCourses();
      }
    } catch (error) {
      console.log(error);
      setShowLoading(false);
      toast.error("Try again");
    }
  };

  const enableCourse = async (id) => {
    try {
      setShowLoading(true);
      const { data } = await axios.put(
        `${API}/show-or-not/${id}`,
        { showOrNot: true },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(data);
      if (data.ok) {
        setShowLoading(false);
        toast.success("Course has been disable");
        fetchingAllCourses();
      }
    } catch (error) {
      console.log(error);
      setShowLoading(false);
      toast.error("Try again");
    }
  };

  // console.log(allCourses, "here ")

  return (
    <CMSLayout>
      <Card>
        <div className="table-responsive">
          <table class="table table-striped  text-dark" style={{ backgroundColor: "white", borderRadius: "10px" }}>
            <thead>
              <tr>
                <th scope="col">{loading ? "loading..." : "#"}</th>
                <th scope="col">Category</th>
                <th scope="col">Title</th>
                <th scope="col">Instructor</th>
                <th scope="col">Disable in form</th>
                <th scope="col"> {showLoading && "loading..."} </th>
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
                    <td className="text-dark">{x?._doc?.categories[0]?.name}</td>
                    <td className="text-dark">{x?._doc?.title}</td>
                    <td className="text-dark">{x?._doc?.instructor?.name}</td>
                    <td className="text-dark">
                      {x?._doc?.show ? (
                        <Btn onClick={() => disableCourse(x?._doc?._id)}>Enabled</Btn>
                      ) : (
                        <Btn danger={true} onClick={() => enableCourse(x?._doc?._id)}>
                          Disabled
                        </Btn>
                      )}
                    </td>
                    <td className="text-dark">
                      {x?._doc?.show2 ? (
                        <Btn onClick={() => disableCourse2(x?._doc?._id)}>Enabled</Btn>
                      ) : (
                        <Btn danger={true} onClick={() => enableCourse2(x?._doc?._id)}>
                          Disabled
                        </Btn>
                      )}
                    </td>
                    <td className="text-dark">
                      <BiEdit
                        onClick={() => {
                          router.push(`/cms-test/courses/${x?._doc?._id}`);
                        }}
                      />
                    </td>
                    <td className="text-dark">
                      <TbTrash onClick={() => deleteCourse(x?._doc?._id)} />
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

export default AllCourses;

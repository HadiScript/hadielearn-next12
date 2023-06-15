"use client";

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import Link from "next/link";
import Redirecting from "../common/Redrecting";
import axios from "axios";
import { BsUsbDriveFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { API } from "../../config/API";

const AdminLayout = ({ children }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();

  // state
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (auth?.token) {
      getCurrentAdmin();
    }
  }, [auth?.token]);

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get(`${API}/current-admin`);
      console.log(data, "From admin");
      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="d-none d-lg-block col-3 sticky-colm   ">
            <div className="services__sidebar mr-50 ">
              <div
                className=" services__widget grey-bg-18 mb-40 rounded "
                style={{
                  backgroundColor: "#0f3f5d",
                  color: "white",
                  height: "650px",
                  overflowY: "scroll",
                }}
              >
                <div className="services__widget-content ">
                  <div className="services__link_layouts ">
                    <ul>
                      {/* // my-profile  */}
                      <li className="">
                        <Link href="/admin">Dashboard</Link>
                      </li>
                      <hr />
                      <li>
                        <Link href="/admin/users/all-users">Users</Link>
                      </li>
                      <li>
                        <Link href="/admin/users/create-account">
                          Create Account
                        </Link>
                      </li>
                      <li>
                        <Link href={`/admin/setting/${auth?.user?._id}`}>
                          Setting
                        </Link>
                      </li>
                      <hr />
                      <li>
                        <Link href="/admin/categories">Categories</Link>
                      </li>
                      <hr />
                      <li>
                        <Link href="/admin/course/all-courses">Courses</Link>
                      </li>
                      <li>
                        <Link href={`/admin/course/new`}>Add Course</Link>
                      </li>
                      <hr />
                      <li>
                        <Link href="/admin/workshop/all-workshops">
                          Workshops
                        </Link>
                      </li>
                      <li>
                        <Link href={`/admin/workshop/new`}>Add Workshop</Link>
                      </li>

                      <hr />
                      <li>
                        <Link href="/admin/blog/all-blogs">Blogs</Link>
                      </li>
                      <li>
                        <Link href={`/admin/blog/new`}>Add Blog</Link>
                      </li>
                      <hr />
                      <li>
                        <Link href={`/admin/media/library`}>Blog Media</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <Redirecting />
          ) : (
            <div className="col-xl-8 col-lg-8 ">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;

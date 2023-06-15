"use client";

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import Link from "next/link";
import Redirecting from "../common/Redrecting";
import axios from "axios";

const EmployeeLayout = ({ children }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();

  // state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) {
      getCurrentEmployee();
    }
  }, [auth?.token]);

  const getCurrentEmployee = async () => {
    try {
      const { data } = await axios.get(`/current-employee`);
      console.log(data, "from employee layouts");
      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  return (
    <section className="services__details pt-50 pb-100">
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
                      <li className="">
                        <Link href="/admin">Dashboard</Link>
                      </li>
                      <hr />
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

export default EmployeeLayout;

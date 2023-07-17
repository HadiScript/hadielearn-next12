"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

const TopHeader = ({
  h4class,
  btn_text = "Get a Quote",
  btn_class = "z-btn-3",
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { stickyMenu } = useGlobalContext();
  const [auth] = useContext(AuthContext);

  return (
    <>
      <header>
        <div className="header__area p-relative header__transparent">
          <div
            id="header__sticky"
            className={
              stickyMenu
                ? `sticky header__bottom header__bottom-2 ${h4class && h4class}`
                : `header__bottom header__bottom-2 ${h4class && h4class}`
            }
          >
            <div className="container">
              <div className="row align-items-center py-1">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="logo-3">
                    <Link href="/">
                      <img
                        src="/assets/images/primary.svg"
                        alt="logo"
                        style={{ height: "60px" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6">
                  <div className="header__bottom-right d-flex justify-content-end align-items-center">
                    <div className="main-menu main-menu-3 menu_three_wrapper">
                      <nav id="mobile-menu">
                        <ul>
                          <li>
                            <Link href="/" style={{ fontSize: "17px" }}>
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link href="/about-us" style={{ fontSize: "17px" }}>
                              About
                            </Link>
                          </li>
                          <li>
                            <Link href="/programs" style={{ fontSize: "17px" }}>
                              Programs
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/workshops"
                              style={{ fontSize: "17px" }}
                            >
                              Workshops
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/how-it-works"
                              style={{ fontSize: "17px" }}
                            >
                              How it works?
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    {auth?.user?.role === "cord" ? (
                      <div className="header__btn d-none d-sm-block d-xl-block ml-50">
                        <Link href="/lms-test">
                          <span role="button" className={`z-btn ${btn_class}`}>
                            LMS
                          </span>
                        </Link>
                      </div>
                    ) : (
                      <div className="header__btn d-none d-sm-block d-xl-block ml-50">
                        <Link href="/enroll/program">
                          <span className={`z-btn ${btn_class}`} role="button">
                            Enroll Program
                          </span>
                        </Link>
                      </div>
                    )}
                    <div
                      onClick={handleShow}
                      className="sidebar__menu d-lg-none"
                    >
                      <div
                        className="sidebar-toggle-btn sidebar-toggle-btn-3"
                        id="sidebar-toggle"
                      >
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default TopHeader;

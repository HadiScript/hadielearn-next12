import Link from "next/link";
import React from "react";
import { Offcanvas } from "react-bootstrap";
import Collapsible from "react-collapsible";
import { BiMap } from "react-icons/bi";
import { FaEnvelope, FaPhoneAlt, FaSearch } from "react-icons/fa";

const Sidebar = ({ show, handleClose }) => {
  return (
    <>
      <div>
        <Offcanvas show={show} onHide={handleClose} placement="end" className="side__bar">
          <Offcanvas.Header closeButton>
            <div className="logo">
              <Link href="/">
                <img src="/assets/images/headerLight.svg" alt="logo" style={{ height: "70px" }} />
              </Link>
            </div>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <section>
              <div className="p-0">
                <div className="sidebar__content">
                  <div className="tab-content" id="sidebar-tab-content">
                    <div className="tab-pane fade show active" id="menu" role="tabpanel" aria-labelledby="menu-tab">
                      <div className="side_navBar">
                        <div className="home  ">{/* <Link href="/">Home </Link> */}</div>
                        <div className="about iconAdd">
                          <Link href="/">Home </Link>
                        </div>

                        <div className="about iconAdd">
                          <Link href="/about-us">About</Link>
                        </div>

                        <div className="about iconAdd">
                          <Link href="/programs">Programs </Link>
                        </div>

                        <div className="about iconAdd">
                          <Link href="/workshops">Workshops </Link>
                        </div>

                        <div className="about iconAdd">
                          <Link href="/how-it-works">How it works? </Link>
                        </div>

                        <div className="about iconAdd border-0">
                          <Link href="/contact-us">Contact </Link>
                        </div>
                      </div>
                    </div>

                    {/* <div
                      className="tab-pane fade"
                      id="info"
                      role="tabpanel"
                      aria-labelledby="info-tab"
                    >
                      <div className="sidebar__info">
                        <div className="logo mb-40">
                          <a href="index.html">
                            <img src="assets/img/logo/logo.png" alt="logo" />
                          </a>
                        </div>
                        <p>
                          We must explain to you how all seds this mistakens
                          idea off denouncing pleasures and praising pain was
                          born and I will give you a completed accounts of the
                          system and expound.
                        </p>
                        <a href="contact.html" className="z-btn z-btn-white">
                          contact us
                        </a>
                        <div className="sidebar__search">
                          <form action="#">
                            <input type="text" placeholder="Your Keywords.." />
                            <button type="submit">
                              <i>
                                {" "}
                                <FaSearch />{" "}
                              </i>
                            </button>
                          </form>
                        </div>
                        <div className="sidebar__contact mt-30">
                          <ul>
                            <li>
                              <div className="icon">
                                <i>
                                  {" "}
                                  <BiMap />{" "}
                                </i>
                              </div>
                              <div className="text">
                                <span>
                                  Ave 14th Street, Mirpur 210, San Franciso, USA
                                  3296.
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="icon">
                                <i>
                                  {" "}
                                  <FaEnvelope />{" "}
                                </i>
                              </div>
                              <div className="text ">
                                <span>
                                  <a href="mailto:support@zibber.com">
                                    support@zibber.com
                                  </a>
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="icon">
                                <i>
                                  <FaPhoneAlt />{" "}
                                </i>
                              </div>
                              <div className="text">
                                <span>
                                  <a href="tel:(+642)-394-396-432">
                                    (+642) 394 396 432
                                  </a>
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </section>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default Sidebar;

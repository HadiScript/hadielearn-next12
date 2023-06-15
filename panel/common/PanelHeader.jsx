import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useRouter } from "next/router";
import Link from "next/link";

const PanelHeader = ({ page = "notFromContact" }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { stickyMenu } = useGlobalContext();
  const router = useRouter();

  const signOut = () => {
    // remove from local storage
    localStorage.removeItem("auth");
    // remove from context
    setAuth({
      user: null,
      token: "",
    });
    // redirect to login
    router.push("/auth/login");
  };

  return (
    <>
      <header>
        <div
          className={`header__area p-relative `}
          style={{
            backgroundImage:
              " linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)",
          }}
        >
          <div
            id="header__sticky"
            className={stickyMenu ? "sticky header__bottom" : "header__bottom"}
          >
            <div className="container">
              <div className="row align-items-center py-1">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="logo">
                    <Link href="/">
                      <img
                        src="/assets/images/secondary.svg"
                        alt="logo"
                        style={{ height: "60px" }}
                      />
                    </Link>
                  </div>
                  <div className="logo-gradient">
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
                    <div className="main-menu menu_wrapper_one">
                      <nav id="mobile-menu">
                        <ul>
                          <li>
                            <Link href="/" style={{ fontSize: "17px" }}>
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/about-us"
                              style={{ fontSize: "17px" }}
                            >
                              Workshops
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/programs"
                              style={{ fontSize: "17px" }}
                            >
                              Courses
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/workshops"
                              style={{ fontSize: "17px" }}
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/dashboard"
                              style={{ fontSize: "17px" }}
                            >
                              Dashboard
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="header__btn d-none d-sm-block d-xl-block ml-50">
                      <span onClick={signOut} className="z-btn z-btn-3">
                        Logout
                      </span>
                    </div>
                    <div
                      onClick={handleShow}
                      className="sidebar__menu d-lg-none"
                    >
                      <div className="sidebar-toggle-btn" id="sidebar-toggle">
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

      {/* <PanelSidebar show={show} handleClose={handleClose} /> */}
    </>
  );
};

export default PanelHeader;

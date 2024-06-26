import { useState } from "react";
// import Sidebar from "./SideBar";
import Link from "next/link";
import useGlobalContext from "../../../hooks/useGlobalContext";

import { RxAvatar } from "react-icons/rx";
import { Avatar, Dropdown } from "antd";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/auth";
import { AiOutlineCheck, AiOutlineLogout } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import ProfileModal from "../../profileModal/ProfileModal";
import { toImageUrl } from "../../../utils/ImageURL";
import { BsCardList } from "react-icons/bs";

const StuHeader = ({ page = "notFromContact" }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  // modals
  const [openProfile, setOpenProfile] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { stickyMenu } = useGlobalContext();

  const items = [
    {
      label: auth?.user?.name,
      key: "0",
      icon: <RxAvatar size={17} />,
      onClick: () => {
        // setOpenProfile(true);
        router.push("/student-test");
      },
    },
    {
      label: "Enrollments",
      key: "4",
      icon: <BsCardList size={17} />,
      onClick: () => {
        // setOpenProfile(true);
        router.push("/student-test/enrollments");
      },
    },
    {
      type: "divider",
    },
    {
      label: "Learning",
      key: "1",
      icon: <FaGraduationCap size={17} />,
      onClick: () => {
        // setOpenProfile(true);
        router.push("/student-test/learning");
      },
    },
    {
      label: "Completed Batches",
      key: "2",
      disabled: true,
      icon: <AiOutlineCheck size={17} />,
      onClick: () => {},
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      onClick: (e) => {
        localStorage.removeItem("auth");
        setAuth({
          user: null,
          token: "",
        });
        router.push("/");
      },
      key: "3",
      icon: <AiOutlineLogout size={17} />,
    },
  ];

  return (
    <>
      <header>
        <div
          className={`header__area p-relative ${page === "notFromContact" && "header__transparent"}`}
          style={{
            backgroundImage: `${page === "contactPage" && " linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)"}`,
          }}
        >
          <div id="header__sticky" className={stickyMenu ? "sticky header__bottom" : "header__bottom"}>
            <div className="container">
              <div className="row align-items-center py-1">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="logo">
                    <Link href="/">
                      <img src="/assets/images/secondary.svg" alt="logo" style={{ height: "60px" }} />
                    </Link>
                  </div>
                  <div className="logo-gradient">
                    <Link href="/">
                      <img src="/assets/images/primary.svg" alt="logo" style={{ height: "60px" }} />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6">
                  <div className="header__bottom-right d-flex justify-content-end align-items-center">
                    <div className="header__btn d-none d-md-block ml-50 ">
                      <Dropdown menu={{ items }} className="custom-dropdown" overlayStyle={{ zIndex: 9999 }}>
                        {auth?.user?.image?.url?.includes("profileImage") ? (
                          <Avatar src={toImageUrl(auth?.user?.image?.url)}>{auth?.user?.name[0]}</Avatar>
                        ) : (
                          <Avatar src={auth?.user?.image?.url}>{auth?.user?.name[0]}</Avatar>
                        )}
                      </Dropdown>
                    </div>
                    <div className="sidebar__menu  d-block d-md-none">
                      <Dropdown menu={{ items }} className="mx-3" overlayStyle={{ zIndex: 9999 }}>
                        {auth?.user?.image?.url?.includes("profileImage") ? (
                          <Avatar src={toImageUrl(auth?.user?.image?.url)}>{auth?.user?.name[0]}</Avatar>
                        ) : (
                          <Avatar src={auth?.user?.image?.url}>{auth?.user?.name[0]}</Avatar>
                        )}
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <ProfileModal open={openProfile} setOpen={setOpenProfile} id={auth?.user?._id} />
    </>
  );
};

export default StuHeader;

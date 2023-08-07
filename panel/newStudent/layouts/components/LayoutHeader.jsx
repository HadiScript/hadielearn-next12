import React, { useState, useContext } from "react";

import { CloseOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { AiOutlineUser } from "react-icons/ai";
import { AuthContext } from "../../../../context/auth";

import { Avatar, Button, Drawer, Dropdown, Grid, Layout } from "antd";
import { GoLinkExternal } from "react-icons/go";
import StuNavs from "../StuNavs";
import BatchNotification from "../../modals/batchNotification";
import ProfileModal from "../../../profileModal/ProfileModal";
import { BsFillBellFill } from "react-icons/bs";
const { Header } = Layout;
const { useBreakpoint } = Grid;

const LayoutHeader = ({
  showDrawer,
  batch,
  notice,
  closeDrawer,
  drawerVisibility,
}) => {
  const breakpoints = useBreakpoint();

  const [auth, setAuth] = useContext(AuthContext);

  const [openProfile, setOpenProfile] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);

  const items = [
    {
      key: "1",
      label: <span>Profile</span>,
      icon: <AiOutlineUser />,
      onClick: () => setOpenProfile(true),
    },
    {
      key: "2",
      label: (
        <span
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Logout
        </span>
      ),
      icon: <LogoutOutlined />,
      onClick: (e) => {
        localStorage.removeItem("auth");
        setAuth({
          user: null,
          token: "",
        });
        router.push("/auth/login");
      },
    },
  ];

  return (
    <>
      <Header
        className="bg-light"
        style={{
          width: "100%",
          backgroundColor: "white !important",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {!breakpoints.md && (
          <MenuOutlined style={{ fontSize: 20 }} onClick={showDrawer} />
        )}
        <h5 style={{ color: "#0f3f5d" }}>
          {breakpoints.sm && (
            <span className="text-capitalize">
              Welcome {auth?.user?.name}
            </span>
          )}
        </h5>
        <div className="d-flex justify-content-center align-items-center">
          {notice && (
            <BsFillBellFill
              role="button"
              color="#0f3f5d"
              className="mx-2"
              onClick={() => setNotificationModal(true)}
            />
          )}
          <Button
            style={{ backgroundColor: "#0f3f5d", color: "white" }}
            className="mx-2"
            icon={<GoLinkExternal />}
          >
            Join Class
          </Button>
          <Dropdown menu={{ items }}>
            <Avatar
              role="button"
              style={{
                backgroundColor: "#0f3f5d",
                color: "white",
                justifySelf: "end",
              }}
              src={
                auth?.user?.image ? auth?.user?.image.url : auth?.user?.name[0]
              }
            >
              i
            </Avatar>
          </Dropdown>
        </div>

        <Drawer
          style={{ background: "linear-gradient(329deg,#31af98,#0f3f5d)" }}
          placement="left"
          closable={false}
          width={250}
          onClose={closeDrawer}
          open={drawerVisibility}
          extra={<CloseOutlined onClick={closeDrawer} />}
        >
          <StuNavs />
        </Drawer>
      </Header>
      {/* <BatchNotification
        notice={notice}
        open={notificationModal}
        setOpen={setNotificationModal}
        batchName={batch?.title}
      /> */}
      <ProfileModal
        open={openProfile}
        setOpen={setOpenProfile}
        id={auth?.user?._id}
      />
    </>
  );
};

export default LayoutHeader;

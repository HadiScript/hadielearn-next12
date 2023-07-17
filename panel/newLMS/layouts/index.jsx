import { useEffect } from "react";
import { CloseOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, Grid, Drawer, Dropdown, Avatar } from "antd";
import { useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/router";
import { useContext } from "react";

import { DefaultSider } from "./style/wrap.style";
import { AuthContext } from "../../../context/auth";
import { API } from "../../../config/API";
import LMSNavs from "./LMSNavs";
import Redirecting from "../../common/Redrecting";
import ProfileModal from "../../profileModal/ProfileModal";

const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

const LMSLayout = ({ children }) => {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const breakpoints = useBreakpoint();

  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [openProfileModel, setOpenProfileModel] = useState(false);

  const showDrawer = () => {
    setDrawerVisibility(true);
  };
  const closeDrawer = () => {
    setDrawerVisibility(false);
  };

  const signOut = () => {
    localStorage.removeItem("auth");
    setAuth({
      user: null,
      token: "",
    });
    router.push("/auth/login");
  };

  const items = [
    {
      key: "1",
      label: <span>Profile</span>,
      icon: <AiOutlineUser />,
      onClick: () => {
        setOpenProfileModel(true);
      },
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
      onClick: signOut,
    },
  ];

  useEffect(() => {
    if (auth?.token) {
      getCurrentAdmin();
    }
  }, [auth?.token]);

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get(`${API}/current-lms-user`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      router.push("/");
    }
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {breakpoints.md && (
          <DefaultSider>
            <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <LMSNavs />
            </Sider>
          </DefaultSider>
        )}
        <Layout>
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
              {" "}
              Welcome{" "}
              <span className="text-capitalize">{auth?.user?.name}</span>,{" "}
            </h5>
            <Dropdown menu={{ items }}>
              <Avatar
                style={{
                  backgroundColor: "#0f3f5d",
                  color: "white",
                  justifySelf: "end",
                }}
                src={auth?.user?.image && auth?.user?.image?.url}
              >
                {!auth?.user?.image && auth?.user?.name[0]}
              </Avatar>
            </Dropdown>

            <Drawer
              style={{ background: "linear-gradient(329deg,#31af98,#0f3f5d)" }}
              placement="left"
              closable={false}
              onClose={closeDrawer}
              visible={drawerVisibility}
              extra={<CloseOutlined onClick={closeDrawer} />}
            >
              <LMSNavs />
            </Drawer>
          </Header>
          <Content
            style={{
              minHeight: "80vh",
              margin: "10px",
              marginTop: "20px",
              padding: "10px",
              // background: "white",
            }}
          >
            {loading ? <Redirecting /> : children}
          </Content>
        </Layout>
      </Layout>
      <ProfileModal
        open={openProfileModel}
        setOpen={setOpenProfileModel}
        id={auth?.user?._id}
      />
    </>
  );
};

export default LMSLayout;

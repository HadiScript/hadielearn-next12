import { CloseOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, Grid, Drawer, Dropdown, Avatar } from "antd";
import { useState } from "react";

import Sidenavs from "./Sidenavs";

import { DefaultSider } from "./style/wrap.style";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { useEffect } from "react";
import { API } from "../../../config/API";
import axios from "axios";
import Redirecting from "../../common/Redrecting";
const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

const DefaultLayout = ({ children }) => {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const breakpoints = useBreakpoint();

  const router = useRouter();
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const showDrawer = () => {
    setDrawerVisibility(true);
  };
  const closeDrawer = () => {
    setDrawerVisibility(false);
  };

  const items = [
    {
      key: "1",
      label: <span>Profile</span>,
    },
    {
      key: "2",
      label: (
        <span target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Logout
        </span>
      ),
      icon: <LogoutOutlined />,
      onClick: () => {},
    },
  ];

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
      setLoading(false);
      console.log(err);
      router.push("/");
    }
  };

  return (
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
            <Sidenavs />
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
          {!breakpoints.md && <MenuOutlined style={{ fontSize: 20 }} onClick={showDrawer} />}
          <h5 style={{ color: "#0f3f5d" }}> Welcome Hadi, </h5>
          <Dropdown menu={{ items }}>
            <Avatar
              style={{
                backgroundColor: "#0f3f5d",
                color: "white",
                justifySelf: "end",
              }}
            >
              U
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
            <Sidenavs />
          </Drawer>
        </Header>
        <Content
          style={{
            minHeight: "80vh",
            margin: "20px",
            marginTop: "20px",
            padding: "20px",
            // background: "white",
          }}
        >
          {loading ? <Redirecting /> : children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;

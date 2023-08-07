import { useState } from "react";
import { Layout, Grid } from "antd";
import { DefaultSider } from "./style/wrap.style";
import StuNavs from "./StuNavs";
import LayoutHeader from "./components/LayoutHeader";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { API } from "../../../config/API";
import Redirecting from "../../common/Redrecting";
import { useRouter } from "next/router";
import axios from "axios";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const NewLayout = ({ children, batchID }) => {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const breakpoints = useBreakpoint();
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get(`${API}/current-student`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      router.push("/");
      setLoading(false);
      console.log(err);
    }
  };

  const showDrawer = () => {
    setDrawerVisibility(true);
  };
  const closeDrawer = () => {
    setDrawerVisibility(false);
  };

  // current-student
  useEffect(() => {
    if (auth && auth?.token) {
      getCurrentAdmin();
    }
  }, [auth && auth?.token]);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {breakpoints.md && (
          <DefaultSider>
            <Sider
              style={{
                // width: "350px !important", // Adjust the width here as needed
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
              }}
              // collapsedWidth="80" // Adjust the collapsed width as needed
              width="250" // Adjust the width here as needed
              // breakpoint="md"
            >
              <StuNavs id={batchID} />
            </Sider>
          </DefaultSider>
        )}
        <Layout
          style={{
            marginLeft: breakpoints.md ? "50px" : 0,
          }}
        >
          <LayoutHeader
            showDrawer={showDrawer}
            // batch={batch}
            // notice={notice}
            closeDrawer={closeDrawer}
            drawerVisibility={drawerVisibility}
          />
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
    </>
  );
};

export default NewLayout;

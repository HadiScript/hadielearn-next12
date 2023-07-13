import { useState } from "react";

import { Layout, Grid } from "antd";
import { DefaultSider } from "./style/wrap.style";
import StuNavs from "./StuNavs";
import StuNavsRight from "./StuNavsRight";
import LayoutHeader from "./components/LayoutHeader";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const StuLayout = ({ children, batch, assets, notice }) => {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const breakpoints = useBreakpoint();
  const showDrawer = () => {
    setDrawerVisibility(true);
  };
  const closeDrawer = () => {
    setDrawerVisibility(false);
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
              <StuNavs id={batch._id} />
            </Sider>
          </DefaultSider>
        )}
        <Layout
          style={{
            marginRight: breakpoints.md ? 100 : 0,
          }}
        >
          <LayoutHeader
            showDrawer={showDrawer}
            batch={batch}
            notice={notice}
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
            {children}
          </Content>
        </Layout>
        {breakpoints.md && (
          <DefaultSider>
            <Sider
              width={300}
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                right: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <StuNavsRight batch={batch} assets={assets} />
            </Sider>
          </DefaultSider>
        )}
      </Layout>
    </>
  );
};

export default StuLayout;

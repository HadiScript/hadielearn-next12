import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { BsClipboard2Check } from "react-icons/bs";
import {
  MdCastForEducation,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useRouter } from "next/router";
import { FaWordpress } from "react-icons/fa";

const Sidenavs = () => {
  const router = useRouter();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{
        height: "100%",
        borderRight: 0,
        background: "linear-gradient(329deg,#31af98,#0f3f5d)",
        color: "white",
      }}
    >
      <div className="mt-4 mb-4 text-center">
        <h4 className="text-light">Hadi E-Learning</h4>
      </div>
      <Menu.Item className="" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item className="mt-1" icon={<MdOutlineDashboardCustomize />}>
        Dashboard
      </Menu.Item>
      <Menu.Item className="mt-1" icon={<BsClipboard2Check />}>
        Payments Logs
      </Menu.Item>
      <Menu.Item className="mt-1" icon={<RxActivityLog />}>
        Activity Logs
      </Menu.Item>

      <Menu.Item
        onClick={() => router.push("/cms-test")}
        className="mt-3"
        icon={<FaWordpress />}
      >
        CMS
      </Menu.Item>
      <Menu.Item
        // onClick={() => router.push("/cms-test")}
        className="mt-1"
        icon={<MdCastForEducation />}
      >
        LMS
      </Menu.Item>
    </Menu>
  );
};

export default Sidenavs;

import { Menu, Avatar, List, Grid } from "antd";
import { useRouter } from "next/router";

import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { MdOutlinePlayLesson } from "react-icons/md";
import { LuFolders } from "react-icons/lu";
import { BsChatLeftDots } from "react-icons/bs";
import {
  getActivesLink,
  navsStyle,
} from "../../newInstructor/layouts/BatchNavs";

const StuNavs = ({ id }) => {
  const router = useRouter();
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{
        height: "100%",
        width: "",
        borderRight: 0,
        background: "linear-gradient(329deg,#31af98,#0f3f5d)",
        color: "white",
      }}
    >
      <div className="mt-4 mb-4 text-center">
        <h4 className="text-light">Welcome Student,</h4>
      </div>
      <Menu.Item className="mt-5" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item
        style={getActivesLink("lessons") ? navsStyle : {}}
        className=""
        onClick={() => router.push(`/student-test/batch/lessons/${id}`)}
        icon={<MdOutlinePlayLesson />}
      >
        Lessons
      </Menu.Item>
      <Menu.Item
        style={getActivesLink("folders") ? navsStyle : {}}
        className=""
        onClick={() => router.push(`/student-test/batch/folders/${id}`)}
        icon={<LuFolders />}
      >
        Folders
      </Menu.Item>
      <Menu.Item
        style={getActivesLink("comments") ? navsStyle : {}}
        onClick={() => router.push(`/student-test/batch/comments/${id}`)}
        icon={<BsChatLeftDots />}
      >
        Discussions
      </Menu.Item>

      <Menu.Item className="" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default StuNavs;

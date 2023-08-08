import { Menu, Avatar, List, Grid } from "antd";
import { useRouter } from "next/router";

import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { MdOutlinePlayLesson } from "react-icons/md";
import { LuFolders } from "react-icons/lu";
import {
  BsCalendarEvent,
  BsCardChecklist,
  BsChatLeftDots,
} from "react-icons/bs";
import {
  getActivesLink,
  navsStyle,
} from "../../newInstructor/layouts/BatchNavs";
import { FaFileInvoice } from "react-icons/fa";

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
        <h4 className="text-light">Hadi Elearning</h4>
      </div>
      <Menu.Item
        onClick={() => router.push(`/student-test/`)}
        className="mt-5"
        icon={<HomeOutlined />}
      >
        Home
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push(`/student-test/batch/description/${id}`)}
        style={getActivesLink("description") ? navsStyle : {}}
        className="mt-5"
        icon={<BsCardChecklist />}
      >
        Description
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
        onClick={() => router.push(`/student-test/batch/description/${id}`)}
        style={getActivesLink("/student-test/assets") ? navsStyle : {}}
        className="mt-5"
        icon={<BsCardChecklist />}
      >
        Assets
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

      <Menu.Item
        style={getActivesLink("time-table") ? navsStyle : {}}
        onClick={() => router.push(`/student-test/batch/time-table/${id}`)}
        icon={<BsCalendarEvent />}
      >
        Time Table
      </Menu.Item>

      <Menu.Item
        className=""
        style={{ cursor: "not-allowed" }}
        icon={<FaFileInvoice />}
      >
        Batch Invoice
      </Menu.Item>
    </Menu>
  );
};

export default StuNavs;

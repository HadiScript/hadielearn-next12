import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { BsCardList } from "react-icons/bs";
import { LuFileSpreadsheet, LuFolders, LuAlertTriangle } from "react-icons/lu";
import { FaRegComments } from "react-icons/fa";
import { MdOutlinePlayLesson } from "react-icons/md";

import { useRouter } from "next/router";

export const navsStyle = { backgroundColor: "#e6f4ff", color: "#1677ff" };
export const getActivesLink = (x) => {
  const router = useRouter();
  if (router.pathname.includes(x)) return true;
  return false;
};

const BatchNavs = ({ BatchId }) => {
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
      <Menu.Item
        onClick={() => router.push("/inst-test")}
        className=""
        icon={<HomeOutlined />}
      >
        Home
      </Menu.Item>
      <Menu.Item
        className="mt-1"
        onClick={() => router.push(`/inst-test/batch/description/${BatchId}`)}
        icon={<BsCardList />}
        style={getActivesLink("description") ? navsStyle : {}}
      >
        Description
      </Menu.Item>
      <Menu.Item
        className="mt-3"
        onClick={() => router.push(`/inst-test/batch/lessons/${BatchId}`)}
        icon={<MdOutlinePlayLesson />}
        style={getActivesLink("lessons") ? navsStyle : {}}
      >
        Lessons
      </Menu.Item>
      <Menu.Item
        className="mt-1"
        onClick={() => router.push(`/inst-test/batch/assets/${BatchId}`)}
        icon={<LuFileSpreadsheet />}
        style={getActivesLink("assets") ? navsStyle : {}}
      >
        Assets
      </Menu.Item>
      <Menu.Item
        className="mt-1"
        onClick={() => router.push(`/inst-test/batch/folders/${BatchId}`)}
        icon={<LuFolders />}
        style={getActivesLink("folders") ? navsStyle : {}}
      >
        Folders
      </Menu.Item>

      <Menu.Item
        onClick={() => router.push(`/inst-test/batch/notice/${BatchId}`)}
        className="mt-1"
        style={getActivesLink("notice") ? navsStyle : {}}
        icon={<LuAlertTriangle />}
      >
        Announcment
      </Menu.Item>
      <Menu.Item
        className="mt-1"
        onClick={() => router.push(`/inst-test/batch/comments/${BatchId}`)}
        icon={<FaRegComments />}
        style={getActivesLink("comments") ? navsStyle : {}}
      >
        Comments
      </Menu.Item>
    </Menu>
  );
};

export default BatchNavs;

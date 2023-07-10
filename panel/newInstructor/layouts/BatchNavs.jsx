import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { FaChalkboardTeacher, FaPlus } from "react-icons/fa";
import {
  MdCategory,
  MdImageSearch,
  MdLibraryBooks,
  MdOutlineCreateNewFolder,
  MdOutlineDashboardCustomize,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { useRouter } from "next/router";

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
      {/* {JSON.stringify(router)} */}
      <Menu.Item className="" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item className="mt-1" icon={<MdOutlineDashboardCustomize />}>
        Dashboard
      </Menu.Item>
      <Menu.Item
        className="mt-3"
        onClick={() => router.push(`/inst-test/batch/lessons/${BatchId}`)}
        icon={<MdOutlineDashboardCustomize />}
      >
        Lessons
      </Menu.Item>
      <Menu.Item
        className="mt-1"
        onClick={() => router.push(`/inst-test/batch/assets/${BatchId}`)}
        icon={<MdOutlineDashboardCustomize />}
      >
        Assets
      </Menu.Item>
      <Menu.Item
        className="mt-1"
        onClick={() => router.push(`/inst-test/batch/folders/${BatchId}`)}
        icon={<MdOutlineDashboardCustomize />}
      >
        Folders
      </Menu.Item>

      <Menu.Item
        onClick={() => router.push(`/inst-test/batch/notice/${BatchId}`)}
        className="mt-1"
        icon={<MdOutlineDashboardCustomize />}
      >
        Announcment
      </Menu.Item>
      <Menu.Item
        className="mt-1"
        onClick={() => router.push(`/inst-test/batch/comments/${BatchId}`)}
        icon={<MdOutlineDashboardCustomize />}
      >
        Comments
      </Menu.Item>
    </Menu>
  );
};

export default BatchNavs;

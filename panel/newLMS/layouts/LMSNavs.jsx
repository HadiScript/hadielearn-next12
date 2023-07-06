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

const LMSNavs = () => {
  const router = useRouter();
  console.log(router, "from cms navs");

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
        onClick={() => router.push("/lms-test/courses/all-courses")}
        icon={<FaChalkboardTeacher />}
      >
        Courses
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/lms-test/courses/add-courses")}
        className="mt-1"
        icon={<MdOutlineCreateNewFolder />}
      >
        Add Coruses
      </Menu.Item>

      <Menu.Item
        onClick={() => router.push("/lms-test/batch/active-batches")}
        className="mt-3"
        icon={<MdLibraryBooks />}
      >
        Active Batches
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/lms-test/batch/completed-batches")}
        className="mt-1"
        icon={<FaPlus />}
      >
        Completed Batches
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/lms-test/batch/create-batches")}
        className="mt-1"
        icon={<MdOutlineLibraryBooks />}
      >
        Create Batches
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/lms-test/student/all-students")}
        className="mt-3"
        icon={<FaPlus />}
      >
        Students
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/lms-test/student/enrolled-students")}
        className="mt-1"
        icon={<MdImageSearch />}
      >
        Enrolled Students
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/cms-test/library")}
        className="mt-1"
        icon={<MdImageSearch />}
      >
        Droped Students
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/admin-test")}
        className="mt-3"
        icon={<MdImageSearch />}
      >
        Admin
      </Menu.Item>
    </Menu>
  );
};

export default LMSNavs;

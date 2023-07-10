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

const CMSNavs = () => {
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
        onClick={() => router.push("/cms-test/users/all-instructors")}
        icon={<FaChalkboardTeacher />}
      >
        Instructors
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/cms-test/users/create-acounts")}
        className="mt-1"
        icon={<MdOutlineCreateNewFolder />}
      >
        Create Acounts
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/cms-test/category")}
        className="mt-3"
        icon={<MdCategory />}
      >
        Categories
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/cms-test/courses/all-courses")}
        className="mt-3"
        icon={<MdLibraryBooks />}
      >
        Courses
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/cms-test/courses/add-courses")}
        className="mt-1"
        icon={<FaPlus />}
      >
        Add Courses
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/cms-test/workshops/all-workshops")}
        className="mt-3"
        icon={<MdOutlineLibraryBooks />}
      >
        Workshops
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/cms-test/workshops/add-workshops")}
        className="mt-1"
        icon={<FaPlus />}
      >
        Add Workshops
      </Menu.Item>
      <Menu.Item
        onClick={() => router.push("/cms-test/library")}
        className="mt-1"
        icon={<MdImageSearch />}
      >
        Media
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

export default CMSNavs;
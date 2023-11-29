import { Menu } from "antd";
import { BackwardFilled, HomeOutlined } from "@ant-design/icons";
import { FaBackspace, FaChalkboardTeacher, FaPlus } from "react-icons/fa";
import { MdCategory, MdImageSearch, MdLibraryBooks, MdOutlineCreateNewFolder, MdOutlineDashboardCustomize, MdOutlineLibraryBooks } from "react-icons/md";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { getActivesLink, navsStyle } from "../../newInstructor/layouts/BatchNavs";

const LMSNavs = () => {
  const router = useRouter();
  const [auth] = useContext(AuthContext);

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
      <Menu.Item className="" icon={<HomeOutlined />} onClick={() => router.push("/")}>
        Home
      </Menu.Item>
      <Menu.Item className="mt-1" icon={<MdOutlineDashboardCustomize />} onClick={() => router.push("/lms-test")} style={getActivesLink("lms-test") ? navsStyle : {}}>
        Dashboard
      </Menu.Item>
      <Menu.Item
        className="mt-2"
        icon={<MdOutlineDashboardCustomize />}
        onClick={() => router.push("/lms-test/applications")}
        style={getActivesLink("applications") ? navsStyle : {}}
      >
        Applications
      </Menu.Item>

      <Menu.Item
        className="mt-1"
        icon={<MdOutlineDashboardCustomize />}
        onClick={() => router.push("/lms-test/enrollments-charts")}
        style={getActivesLink("enrollments-charts") ? navsStyle : {}}
      >
        Enrollments Charts
      </Menu.Item>

      <Menu.Item
        className="mt-3"
        style={getActivesLink("all-courses") ? navsStyle : {}}
        onClick={() => router.push("/lms-test/courses/all-courses")}
        icon={<FaChalkboardTeacher />}
      >
        Courses
      </Menu.Item>
      <Menu.Item style={getActivesLink("new") ? navsStyle : {}} onClick={() => router.push("/lms-test/courses/new")} className="mt-1" icon={<MdOutlineCreateNewFolder />}>
        Add Course
      </Menu.Item>

      <Menu.Item style={getActivesLink("active-batches") ? navsStyle : {}} onClick={() => router.push("/lms-test/batch/active-batches")} className="mt-3" icon={<MdLibraryBooks />}>
        Active Batches
      </Menu.Item>
      <Menu.Item style={getActivesLink("completed-batches") ? navsStyle : {}} onClick={() => router.push("/lms-test/batch/completed-batches")} className="mt-1" icon={<FaPlus />}>
        Completed Batches
      </Menu.Item>
      <Menu.Item
        style={getActivesLink("create-batches") ? navsStyle : {}}
        onClick={() => router.push("/lms-test/batch/create-batches")}
        className="mt-1"
        icon={<MdOutlineLibraryBooks />}
      >
        Create Batches
      </Menu.Item>
      <Menu.Item style={getActivesLink("all-students") ? navsStyle : {}} onClick={() => router.push("/lms-test/student/all-students")} className="mt-3" icon={<FaPlus />}>
        Students
      </Menu.Item>
      <Menu.Item
        style={getActivesLink("enrolled-students") ? navsStyle : {}}
        onClick={() => router.push("/lms-test/student/enrolled-students")}
        className="mt-1"
        icon={<MdImageSearch />}
      >
        Enrolled Students
      </Menu.Item>
      {/* <Menu.Item style={getActivesLink("library") ? navsStyle : {}} onClick={() => router.push("/cms-test/library")} className="mt-3" icon={<MdImageSearch />}>
        Gallery
      </Menu.Item> */}
      {auth?.user && auth?.user?.role === "admin" && (
        <Menu.Item onClick={() => router.push("/admin-test")} className="mt-3" icon={<BackwardFilled />}>
          Back
        </Menu.Item>
      )}
    </Menu>
  );
};

export default LMSNavs;

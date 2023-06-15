import AdminLayout from "../../panel/admin/AdminLayout";
import PanelHeader from "../../panel/common/PanelHeader";
import useNumbers from "../../hooks/useNumbers";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { FaUsers } from "react-icons/fa";

const Stats = ({ value, label }) => (
  <div class="col-md-3 col-sm-6 mb-4 text-center text-light">
    <div class="border-2 border-gray-200 px-4 py-2 rounded-lg">
      <h2 style={{ fontWeight: "bolder", fontSize: "50px", color: "white" }}>
        {value}
      </h2>
      <small style={{ fontSize: "12px" }}>{label}</small>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { numbers } = useNumbers();
  const [auth] = useContext(AuthContext);

  // 0f3f5d

  return (
    <>
      <PanelHeader />
      <AdminLayout>
        {/*  */}
        <section class="bg-gray-600 text-gray-100 py-24">
          <div class="container">
            <div class="text-start mb-20">
              <h1 class="sm:text-3xl text-2xl font-medium mb-4">
                Welcome{" "}
                <span className="text-capitalize">{auth.user?.name}</span>
              </h1>
            </div>
            <div
              class="row "
              style={{
                backgroundColor: "#0f3f5d",
                color: "whtie",
                borderRadius: "10px",
              }}
            >
              <Stats value={numbers.users} label={"USERS"} />
              <Stats value={numbers.blogs} label={"BLOGS"} />
              <Stats value={numbers.workshops} label={"WORKSHOPS"} />
              <Stats value={numbers.courses} label={"COURSES"} />
              <Stats value={numbers.categories} label={"CATEGORIES"} />
            </div>
          </div>
        </section>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;

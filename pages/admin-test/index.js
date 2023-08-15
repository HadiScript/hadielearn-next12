import React from "react";
import AdminLayouts from "../../panel/newAdmin/layouts";
import Stats from "../../panel/newAdmin/components/admin-stats";
import PaymentsEnrolledStudents from "../../panel/newAdmin/components/payments-enrolledStudents";
import BatchDetails from "../../panel/newAdmin/components/batch-details";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useEffect } from "react";
import { API } from "../../config/API";
import { toast } from "react-hot-toast";

const Admin = () => {
  const [stats, setStats] = useState({});
  const [auth] = useContext(AuthContext);

  const gettingNumbers = async () => {
    try {
      const { data } = await axios.get(
        // "http://localhost:5000/api/lms/batch-stats"
        `${API}/lms/batch-stats`
      );
      setStats(data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) gettingNumbers();
  }, [auth && auth.token]);

  return (
    <AdminLayouts>
      <Stats data={stats} />
      <div className="my-3">
        <PaymentsEnrolledStudents />
      </div>
      <div className="mb-3">
        <BatchDetails />
      </div>
    </AdminLayouts>
  );
};

export default Admin;

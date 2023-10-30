import React, { useContext, useEffect, useState } from "react";
import StuHeader from "../../panel/newStudent/components/StuHeader";
import { AuthContext } from "../../context/auth";
import { API } from "../../config/API";
import axios from "axios";
import Redirecting from "../../panel/common/Redrecting";

import Footer from "../../components/partials/Footer";
import StudentEnrollments from "../../panel/profiling/StudentEnrollments";

const Enrollments = () => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      getCurrentStudent();
    }
  }, [auth?.token]);

  const getCurrentStudent = async () => {
    try {
      const { data } = await axios.get(`${API}/current-student`);
      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      router.push("/");
    }
  };

  return loading ? (
    <Redirecting />
  ) : (
    <>
      <StuHeader page="contactPage" />
      {/* <img src="/assets/image/bg-gird1.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} /> */}

      <StudentEnrollments auth={auth} />

      <Footer />
    </>
  );
};

export default Enrollments;

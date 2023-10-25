import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { API } from "../../config/API";
import { AuthContext } from "../../context/auth";
import Redirecting from "../common/Redrecting";
import StuHeader from "../newStudent/components/StuHeader";
import { useRouter } from "next/router";
import InstHeader from "../newInstructor/components/InstHeader";
import Footer from "../../components/partials/Footer";

const ProfileLayout = ({ children }) => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      getCurrentStudent();
    }
  }, [auth?.token]);

  const getCurrentStudent = async () => {
    try {
      const { data } = await axios.get(`${API}/current-student-or-instructor`);
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
      {auth?.user?.role === "student" && <StuHeader page="contactPage" />}
      {auth?.user?.role === "instructor" && <InstHeader page="contactPage" />}
      {children}

      <div className="pt-5">
        <Footer />
      </div>
    </>
  );
};

export default ProfileLayout;

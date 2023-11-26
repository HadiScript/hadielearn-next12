import React, { useContext } from "react";
import InstHeader from "../../panel/newInstructor/components/InstHeader";
import { AuthContext } from "../../context/auth";
import { Card, List } from "antd";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import Redirecting from "../../panel/common/Redrecting";
import AssignBatches from "../../panel/newInstructor/components/AssignBatches";
import Footer from "../../components/partials/Footer";

const InstructorAssignedBatches = () => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // first of getting current instructor
  const gettingCurrentInstructor = async () => {
    try {
      const { data } = await axios.get(`${API}/current-teacher`);
      if (data.ok) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again ");
      setLoading(false);
      router.push("/");
    }
  };

  useEffect(() => {
    if (auth && auth.token) gettingCurrentInstructor();
  }, [auth && auth.token]);

  return (
    <>
      {loading ? (
        <Redirecting />
      ) : (
        <>
          <InstHeader page="contactPage" />
          <AssignBatches />
          <Footer />
        </>
      )}
    </>
  );
};

export default InstructorAssignedBatches;

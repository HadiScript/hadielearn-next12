import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { API } from "../../config/API";

import { AuthContext } from "../../context/auth";
import Redirecting from "../../panel/common/Redrecting";
import StuHeader from "../../panel/newStudent/components/StuHeader";
import MyAllBatches from "../../panel/newStudent/components/MyAllBatches";

const Studetn = () => {
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
      <MyAllBatches />
    </>
  );
};

export default Studetn;

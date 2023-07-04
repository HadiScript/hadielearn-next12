import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";


const useCourses = () => {
  // state
  const [courses, setCourses] = useState([]);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    if (auth && auth.token) getAllCourses();
  }, [auth && auth.token]);

  const getAllCourses = async () => {
    try {
      const { data } = await axios.get(`${API}/courses`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };

  return { courses };
};

export default useCourses;

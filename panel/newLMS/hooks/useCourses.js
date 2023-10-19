import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";

const useCourses = ({ want }) => {
  // state
  const [courses, setCourses] = useState([]);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    if (auth && auth.token) getAllCourses();
  }, [auth && auth.token]);

  const getAllCourses = async () => {
    try {
      let _api = want === "shorts" ? `${API}/courses-form` : `${API}/courses`;

      const { data } = await axios.get(_api, {
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

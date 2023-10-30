import { useState, useEffect } from "react";

import axios from "axios";
import { API } from "../../../config/API";

const useCourses = ({ want }) => {
  // state
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      let _api = want === "shorts" ? `${API}/courses-form` : `${API}/courses`;

      const { data } = await axios.get(_api);
      setCourses(data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  return { courses };
};

export default useCourses;

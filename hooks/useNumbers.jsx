import { useState, useEffect } from "react";

import axios from "axios";
import { API } from "../config/API";

const useNumbers = () => {
  // state
  const [numbers, setNumbers] = useState({});

  useEffect(() => {
    getNumbers();
  }, []);

  const getNumbers = async () => {
    try {
      const { data } = await axios.get(`${API}/numbers`);
      console.log(data, "number");
      setNumbers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return { numbers };
};

export default useNumbers;

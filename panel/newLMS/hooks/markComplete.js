import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import axios from "axios";
import { API } from "../../../config/API";
import { toast } from "react-hot-toast";

const markComplete = () => {
  const [loading, setLoading] = useState(false);
  const [auth] = useContext(AuthContext);

  const markCompleted = async (x) => {
    try {
      const ok = confirm("Are you sure? Please check all the dates");
      if (ok) {
        setLoading(true);
        const { data } = await axios.put(
          `${API}/lms/make-batch/${x}/complete`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setLoading(false);
        toast.success(data.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return { markCompleted, loading };
};

export default markComplete;

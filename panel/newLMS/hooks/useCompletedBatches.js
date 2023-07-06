import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import axios from "axios";
import { API } from "../../../config/API";

const useCompletedBatches = () => {
  // state
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    if (auth && auth.token) getActiveBatch();
  }, [auth && auth.token]);

  const getActiveBatch = async () => {
    try {
      const { data } = await axios.get(`${API}/lms/completed-batches`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setBatches(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  return { batches, loading };
};

export default useCompletedBatches;

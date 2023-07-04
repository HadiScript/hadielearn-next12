import axios from "axios";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";
import { useState, useEffect, useContext } from "react";

const useSingleBatchId = ({ id }) => {
  // state
  const [batch, setBatch] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    if (auth && auth.token) getSingleBatch({ id });
  }, [auth && auth.token, id]);

  const getSingleBatch = async () => {
    try {
      const { data } = await axios.get(`${API}/lms/single-batch/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setBatch(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };


  return { batch, loading };
};

export default useSingleBatchId;

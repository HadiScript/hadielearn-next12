import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config/API";
import toast from "react-hot-toast";

const useMyProfile = (auth) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const gettingMyProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-profile`);
      if (data.ok) {
        setProfile(data._profile);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth.token) {
      gettingMyProfile();
    }
  }, [auth && auth.token, triggerFetch]);

  return { profile, loading, refetch: () => setTriggerFetch(!triggerFetch) };
};

export default useMyProfile;

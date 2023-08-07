import { useRouter } from "next/router";
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth";
import axios from "axios";
import { API } from "../../../../config/API";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import StuLayout from "..";

const HooksLayout = ({ children }) => {
  const { id } = useRouter().query;
  const [auth] = useContext(AuthContext);

  const [batch, setBatch] = useState({});
  const [assets, setAssets] = useState([]);
  const [notice, setNotice] = useState([]);
  const [folders, setFolders] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [comments, setcomments] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchingSingleData = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/my-single-batch/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setLoading(false);
      setBatch(data.myBatch);
      setAssets(data.assets);
      setFolders(data.folders);
      setNotice(data.notice);
      setLessons(data.lessons);
      setcomments(data.comments);
    } catch (error) {
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (auth && auth.token && id) {
      fetchingSingleData(id);
    }
  }, [auth && auth.token, id]);

  return (
    <StuLayout
      batch={batch}
      assets={assets}
      loading={loading}
      notice={notice[0]}
    >
      {children}
      {/* {loading ? <p className="text-center"> loading...</p> : children} */}
    </StuLayout>
  );
};

export default HooksLayout;

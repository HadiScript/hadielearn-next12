import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth";
import { useState } from "react";
import axios from "axios";
import { API } from "../../../../config/API";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import HooksLayout from "../../../../panel/newStudent/layouts/components/HooksLayout";
import { Card, Space, Tooltip } from "antd";
import { FaFolder } from "react-icons/fa";
import InFolders from "../../../../panel/newStudent/modals/InFolders";
import NewLayout from "../../../../panel/newStudent/layouts/NewLayout";
import StatsBatch from "../../../../panel/newStudent/components/StatsBatch";

const StudentBatchFolders = () => {
  const router = useRouter();
  const { id } = router.query;
  const [auth] = useContext(AuthContext);
  const [BatchFolders, setBatchFolders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

  const fetchingOnlyBatchFolders = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/my-all-folders/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setBatchFolders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (auth && auth.token && id) {
      fetchingOnlyBatchFolders(id);
    }
  }, [auth && auth.token, id]);

  return (
    <>
      <NewLayout batchID={id}>
        <StatsBatch id={id} from={"folders"} />
        <Card title="Folders" className="my-4">
          {loading && <>loading..</>}
          <Space wrap>
            {BatchFolders.map((x) => (
              <Tooltip
                key={x._id}
                title={x?.name}
                className="d-flex align-items-center flex-column justify-content-center mx-2"
              >
                <FaFolder
                  color="#0f3f5d"
                  size={40}
                  role="button"
                  onClick={() => {
                    setCurrent(x);
                    setOpen(true);
                  }}
                />
                <small>{x.name.substring(0, 6)}..</small>
              </Tooltip>
            ))}
          </Space>
        </Card>
      </NewLayout>

      <InFolders
        open={open}
        setOpen={setOpen}
        current={current}
        setCurrent={setCurrent}
        auth={auth}
        BatchFolders={BatchFolders}
      />
    </>
  );
};

export default StudentBatchFolders;

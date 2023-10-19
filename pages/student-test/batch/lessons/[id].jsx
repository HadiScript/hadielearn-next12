import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { Card, List } from "antd";

import { toast } from "react-hot-toast";
import { API } from "../../../../config/API";
import { AuthContext } from "../../../../context/auth";
import NewLayout from "../../../../panel/newStudent/layouts/NewLayout";
import StatsBatch from "../../../../panel/newStudent/components/StatsBatch";

const StudentBatchLessons = () => {
  const { id } = useRouter().query;
  const [auth] = useContext(AuthContext);
  const [batchLessons, setBatchLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingOnlyBatchLessons = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/my-all-lessons/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setBatchLessons(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (auth && auth.token && id) {
      fetchingOnlyBatchLessons(id);
    }
  }, [auth && auth.token, id]);

  return (
    <NewLayout batchID={id}>
      <StatsBatch id={id} from={"lessons"} />

      <div className="my-4">
        <Card title="Lessons">
          <List
            itemLayout="horizontal"
            loading={loading}
            dataSource={batchLessons}
            renderItem={(item, index) => (
              <List.Item
                style={{
                  backgroundColor: `${item.complete ? "#0f3f5d" : "#0f3f5d1c"}`,
                  padding: "20px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
                actions={[<>{item.complete ? <span className="text-light">completed</span> : <></>}</>]}
                key={index}
              >
                <List.Item.Meta
                  title={<span className={item.complete && "text-light"}>{item.title}</span>}
                  description={<span className={item.complete && "text-light"}>{item.description}</span>}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </NewLayout>
  );
};

export default StudentBatchLessons;

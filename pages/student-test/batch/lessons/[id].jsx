import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { Card, List } from "antd";
import { toast } from "react-hot-toast";
import { API } from "../../../../config/API";
import HooksLayout from "../../../../panel/newStudent/layouts/components/HooksLayout";
import { AuthContext } from "../../../../context/auth";

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
    <HooksLayout>
      {/* {JSON.stringify(batchLessons)} */}
      <Card title="Lessons">
        <List
          itemLayout="horizontal"
          loading={loading}
          dataSource={batchLessons}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <>
                  {item.completed ? (
                    <span className="text-success">completed</span>
                  ) : (
                    <></>
                  )}
                </>,
              ]}
              key={index}
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </HooksLayout>
  );
};

export default StudentBatchLessons;

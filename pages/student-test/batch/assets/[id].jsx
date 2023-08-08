import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { API } from "../../../../config/API";
import { useEffect } from "react";
import NewLayout from "../../../../panel/newStudent/layouts/NewLayout";
import { AuthContext } from "../../../../context/auth";
import { toast } from "react-hot-toast";
import StatsBatch from "../../../../panel/newStudent/components/StatsBatch";
import { Card, List } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const BatchAssets = () => {
  const [auth] = useContext(AuthContext);
  const { id } = useRouter().query;
  const [allAssets, setAllAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingSingleData = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/stu-assets/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setLoading(false);
      setAllAssets(data);
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
    <NewLayout batchID={id}>
      <StatsBatch id={id} from={"assets"} />
      <div className="my-4">
        <Card title="Assets">
          <List
            itemLayout="horizontal"
            loading={loading}
            dataSource={allAssets}
            renderItem={(item, index) => (
              <List.Item
                style={{
                  padding: "20px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
                actions={[
                  <>
                    <DownloadOutlined onClick={() => window.open(item.file)} />
                  </>,
                ]}
                key={index}
              >
                <List.Item.Meta title={<span>{item.title}</span>} />
              </List.Item>
            )}
          />
        </Card>
      </div>
      <List />
    </NewLayout>
  );
};

export default BatchAssets;

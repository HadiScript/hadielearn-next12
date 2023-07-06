import React from "react";
import LMSLayout from "../../../panel/newLMS/layouts";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { useState } from "react";
import Certification_Model from "../../../panel/newLMS/modals/students/certificationModal";
import PaymentModels from "../../../panel/newLMS/modals/students/paymentsModal";
import CompletedBatchesModel from "../../../panel/newLMS/modals/students/completedBatchesModal";
import {
  Card,
  Descriptions,
  Divider,
  Input,
  List,
  Modal,
  Select,
  Space,
  Tag,
} from "antd";
import { API } from "../../../config/API";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const { Search } = Input;

const EnrolledStudents = () => {
  // main states
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // modals and current stu
  const [current, setCurrent] = useState([]);
  const [open, setOpen] = useState(false);
  const [completedBatchesModel, setCompletedBatchesModel] = useState(false);
  const [certificationModel, setCertificationModel] = useState(false);
  const [paymentModel, setPaymentModel] = useState(false);

  useEffect(() => {
    if (auth && auth.token) loadUsers();
  }, [auth && auth.token, currentPage, searchQuery]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/enrolled-students`, {
        params: {
          page: currentPage,
          search: searchQuery,
        },
      });
      const { users: loadedUsers, totalPages: loadedTotalPages } =
        response.data;

      setUsers(loadedUsers);
      setTotalPages(loadedTotalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const UnAssigned = async (x, y) => {
    try {
      let ok = confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.put(`${API}/lms/remove/${x}/${y}/student`);
        if (data.ok) {
          toast.success("Student UnAssigned");
        } else if (data.error) {
          toast.error("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    setCurrentPage(value);
  };

  return (
    <LMSLayout>
      <Card>
        <Space wrap>
          <Search
            addonBefore="Students"
            placeholder="input search text"
            allowClear
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: 304 }}
          />

          <Select
            style={{
              width: 120,
            }}
            placeholder="Select Page"
            onChange={handleChange}
            options={[
              {
                value: 1,
                label: 1,
              },
              {
                value: 2,
                label: 2,
              },
              {
                value: 3,
                label: 3,
              },
              {
                value: 4,
                label: 4,
              },
            ]}
          />
        </Space>

        <List
          className="mt-4"
          itemLayout="horizontal"
          dataSource={users}
          loading={loading}
          renderItem={(item, index) => (
            <>
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={() => {
                      setCurrent(item);
                      setOpen(true);
                    }}
                  >
                    View Detail
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={
                    <>
                      <Tag color="blue" role="button">
                        Assigned Batches : {item.enrolledBatches.length}
                      </Tag>
                    </>
                  }
                />
              </List.Item>
            </>
          )}
        />
        {currentPage < totalPages && (
          <div className="text-center">
            <Button onClick={handleLoadMore}>Load More</Button>
          </div>
        )}
      </Card>

      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Descriptions
          title={current.name}
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Email">{current.email}</Descriptions.Item>
          <Descriptions.Item label="enrolledBatches">
            {current.enrolledBatches?.length}
          </Descriptions.Item>

          <br />
          <Descriptions.Item
            label={`Completed Batches - (${current.completedBatches?.length})`}
          >
            <Tag
              color="blue"
              role="button"
              onClick={() => {
                setCompletedBatchesModel(true);
              }}
            >
              Completed Batches
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Un Assigned Counts">
            {current.unAssignedCount}
          </Descriptions.Item>
          <br />

          <Descriptions.Item label="Payments">
            <Tag
              color="blue"
              role="button"
              onClick={() => setPaymentModel(true)}
            >
              {" "}
              Add & Update Payments{" "}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={`Certifications - (${current.certifications?.length})`}
          >
            <Tag
              color="blue"
              role="button"
              onClick={() => setCertificationModel(true)}
            >
              {" "}
              Certifications{" "}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Enrolled Batches</Divider>
        <List
          size="small"
          bordered
          dataSource={current?.enrolledBatches}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Tag
                  role="button"
                  color="red"
                  onClick={() => UnAssigned(current._id, item._id)}
                >
                  Un Assign
                </Tag>,
              ]}
            >
              <List.Item.Meta title={item.title} description={item._id} />
            </List.Item>
          )}
        />
      </Modal>

      <CompletedBatchesModel
        completedBatchesModel={completedBatchesModel}
        setCompletedBatchesModel={setCompletedBatchesModel}
        current={current}
      />

      <PaymentModels
        paymentModels={paymentModel}
        setPaymentModel={setPaymentModel}
        current={current}
        setCurrent={setCurrent}
      />

      <Certification_Model
        certificationModel={certificationModel}
        setCertificationModel={setCertificationModel}
        current={current}
      />
    </LMSLayout>
  );
};

export default EnrolledStudents;

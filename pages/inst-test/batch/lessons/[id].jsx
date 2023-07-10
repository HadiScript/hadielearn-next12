import { useRouter } from "next/router";
import React, { useState } from "react";
import BatchLayout from "../../../../panel/newInstructor/layouts";
import useSingleBatch from "../../../../panel/newInstructor/hooks/useSingleBatch";
import { API } from "../../../../config/API";
import { Card, Col, List, Row, Space } from "antd";
import Btn from "../../../../components/ui/Btn";
import { BiCheck, BiTrash } from "react-icons/bi";
import { EditOutlined } from "@ant-design/icons";
import LessonUpdateModel from "../../../../panel/newInstructor/modals/LessonUpdateModel";

export const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const InstSingleBatchLessons = () => {
  const router = useRouter();
  const { id } = router.query;

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [current, setCurrent] = useState({});

  const itemsURL = `${API}/lms/all-lessons/${id}`;

  // udpates
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  // new adda
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const {
    singleBatch,
    items,
    itemsLoading,
    loading,
    updateItem,
    updatesLoading,
    deleteItem,
    addItem,
    makeItCompleteItem,
  } = useSingleBatch({
    id,
    itemsURL,
  });

  const updateLesson = (title, description, id) => {
    if (!title || !description) return toast.error("fields are requried");

    const updateItemURL = `${API}/lms/update-lesson/${id}`;
    updateItem({ title, description }, updateItemURL);
  };

  const deleteLesson = async (x) => {
    const deleteItemURL = `${API}/lms/delete-lesson/${x}`;
    deleteItem(deleteItemURL);
  };

  const makeItComplete = async (id) => {
    const makeItURL = `${API}/lms/make-lesson-complete/${id}`;
    makeItCompleteItem(makeItURL);
  };

  const newAdd = async (e) => {
    e.preventDefault();
    const addItemURL = `${API}/lms/new-lesson/${id}`;
    addItem({ title: newTitle, description: newDescription }, addItemURL);
  };

  return (
    <>
      <BatchLayout BatchId={id}>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col sm={24} xs={24} md={10} lg={10}>
            <Card>
              <h4>Add Lessons</h4>
              <form onSubmit={newAdd}>
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <br />
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </form>
              <br />
              <Btn type="submit" className="z-btn" onClick={newAdd}>
                Add New
              </Btn>
            </Card>
          </Col>
          <Col sm={24} xs={24} md={14} lg={14}>
            <div style={{ height: "700px", overflow: "auto" }}>
              <Card>
                <List
                  loading={itemsLoading}
                  style={{ maxWidth: "500px" }}
                  itemLayout="vertical"
                  dataSource={items}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <IconText
                          icon={
                            <EditOutlined
                              role="button"
                              onClick={() => {
                                setCurrent(item);
                                setUpdateModalOpen(true);
                                setTitle(item.title);
                                setDescription(item.description);
                              }}
                            />
                          }
                        />,
                        <IconText
                          icon={
                            <BiTrash
                              role="button"
                              onClick={() => deleteLesson(item._id)}
                            />
                          }
                        />,
                        <IconText
                          icon={
                            <BiCheck
                              onClick={() => makeItComplete(item._id)}
                              color={`${item.complete ? "green" : "gray"}`}
                              role="button"
                              size={25}
                            />
                          }
                          text={"Make it complete"}
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </BatchLayout>
      <LessonUpdateModel
        updateModalOpen={updateModalOpen}
        setUpdateModalOpen={setUpdateModalOpen}
        current={current}
        updateLesson={updateLesson}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        updatesLoading={updatesLoading}
      />
    </>
  );
};

export default InstSingleBatchLessons;

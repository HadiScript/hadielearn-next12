import { useRouter } from "next/router";
import React, { useState } from "react";
import BatchLayout from "../../../../panel/newInstructor/layouts";
import { Avatar, Card, Col, List, Row, Space } from "antd";
import { Form } from "react-bootstrap";
import Btn from "../../../../components/ui/Btn";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../../../config/API";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth";
import { useEffect } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { BiTrash } from "react-icons/bi";
import moment from "moment/moment";
import ReplyModel from "../../../../panel/newInstructor/modals/ReplyModel";

const IconText = ({ icon, text, onClick }) => (
  <div onClick={onClick} className="d-flex align-items-center gap-1">
    {React.createElement(icon)}
    {text}
  </div>
);

const singleBatchComments = () => {
  const [auth] = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [replyModal, setReplyModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      return toast.error("please write a message");
    }
    setLoading(true);
    const { data } = await axios.post(
      `${API}/lms/add-comment/${id}`,
      { text: comment },
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    if (data.ok) {
      fetchingAllComments(id);
      setComment("");
      toast.success("added");
      setLoading(false);
    }
    try {
    } catch (error) {
      setLoading(false);
      toast.error("Failed, please try again");
    }
  };

  const fetchingAllComments = async (x) => {
    try {
      setFetchingLoading(true);
      const { data } = await axios.get(`${API}/lms/all-comments/${x}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setAllComments(data);
      setFetchingLoading(false);
    } catch (error) {
      setFetchingLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && auth && auth?.token) {
      fetchingAllComments(id);
    }
  }, [auth && auth?.token && id]);

  const deleteComment = async (x) => {
    try {
      const { data } = await axios.delete(`${API}/lms/delete-comment/${x}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      if (data.ok) {
        toast.success("deleted");
        fetchingAllComments(id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    }
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
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="commentForm">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Btn loading={loading} className="mt-2" onClick={handleSubmit}>
                  Send
                </Btn>
              </Form>
            </Card>
          </Col>

          <Col sm={24} xs={24} md={14} lg={14}>
            <div style={{ height: "700px", overflow: "auto" }}>
              <Card>
                <List
                  itemLayout="vertical"
                  size="large"
                  loading={fetchingLoading}
                  dataSource={allComments}
                  renderItem={(item) => (
                    <List.Item
                      key={item._id}
                      actions={[
                        <IconText
                          onClick={() => {
                            setReplyModal(true);
                            setCurrentComment(item);
                          }}
                          icon={MessageOutlined}
                          text="Reply"
                          key="list-vertical-message"
                        />,
                        <>
                          {auth?.user?._id === item.commentBy._id && (
                            <BiTrash
                              role="button"
                              onClick={() => deleteComment(item._id)}
                            />
                          )}
                        </>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.commentBy?.image?.url} />}
                        title={
                          <>
                            <strong>{item.commentBy?.name}</strong> -
                            <small style={{ fontWeight: "normal" }}>
                              {moment(item.createdAt).fromNow()}
                            </small>
                          </>
                        }
                        description={item.text}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </BatchLayout>
      <ReplyModel
        current={currentComment}
        setCurrent={setCurrentComment}
        open={replyModal}
        setOpen={setReplyModal}
      />
    </>
  );
};

export default singleBatchComments;

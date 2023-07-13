import React from "react";
import HooksLayout from "../../../../panel/newStudent/layouts/components/HooksLayout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../../../config/API";
import { Avatar, Card, List } from "antd";
import moment from "moment";
import { MessageOutlined } from "@ant-design/icons";
import { BiTrash } from "react-icons/bi";
import ReplyModel from "../../../../panel/newInstructor/modals/ReplyModel";
import { Form } from "react-bootstrap";
import Btn from "../../../../components/ui/Btn";

const IconText = ({ icon, text, onClick }) => (
  <div onClick={onClick} className="d-flex align-items-center gap-1">
    {React.createElement(icon)}
    {text}
  </div>
);

const BatchStudentsBatch = () => {
  // all-comments

  const { id } = useRouter().query;
  const [auth] = useContext(AuthContext);
  const [batchComments, setBatchComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const [replyModal, setReplyModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  const fetchingOnlyBatchComments = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/all-comments/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setBatchComments(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (auth && auth.token && id) {
      fetchingOnlyBatchComments(id);
    }
  }, [auth && auth.token, id]);

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
      fetchingOnlyBatchComments(id);
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
      <HooksLayout>
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
        <hr />
        <List
          itemLayout="vertical"
          size="large"
          loading={loading}
          dataSource={batchComments}
          renderItem={(item) => (
            <List.Item
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
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
      </HooksLayout>
      <ReplyModel
        current={currentComment}
        setCurrent={setCurrentComment}
        open={replyModal}
        setOpen={setReplyModal}
      />
    </>
  );
};

export default BatchStudentsBatch;

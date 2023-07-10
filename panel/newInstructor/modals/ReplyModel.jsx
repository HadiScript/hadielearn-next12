import { Avatar, Divider, List, Modal } from "antd";
import React from "react";
import { BiTrash } from "react-icons/bi";
import Btn from "../../../components/ui/Btn";
import { Form } from "react-bootstrap";
import moment from "moment";
import { useState } from "react";
import { AuthContext } from "../../../context/auth";
import { useContext } from "react";
import { API } from "../../../config/API";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const ReplyModel = ({ current, setCurrent, open, setOpen }) => {
  const [auth] = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [fetchingLoading, setFetchingLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      return toast.error("please write a message");
    }
    setLoading(true);
    const { data } = await axios.post(
      `${API}/lms/add-reply/${current._id}`,
      { text: comment },
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    if (data.ok) {
      setLoading(false);
      setComment("");
      toast.success("added");
      fetchingAllComments(current._id);
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
      const { data } = await axios.get(`${API}/lms/all-replies/${x}`, {
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
    if (current._id && auth && auth?.token) {
      fetchingAllComments(current._id);
    }
  }, [auth && auth?.token && current._id]);

  const deleteComment = async (x) => {
    try {
      const { data } = await axios.delete(`${API}/lms/delete-reply/${x}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      if (data.ok) {
        toast.success("deleted");
        fetchingAllComments(current._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    }
  };
  return (
    <Modal
      title={current.name}
      centered
      width={700}
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
    >
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            backgroundColor: "#C5C5C5",
            padding: "5px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          <strong>{current.commentBy?.name}</strong> -
          <small style={{ fontWeight: "normal" }}>
            {moment(current.createdAt).fromNow()}
          </small>
          <br />
          <p>{current.text} </p>
        </div>
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
        <br />
        <List
          itemLayout="vertical"
          size="large"
          loading={fetchingLoading}
          dataSource={allComments}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              actions={[
                <>
                  {auth?.user?._id === item.replyBy._id && (
                    <span
                      role="button"
                      className="text-danger"
                      onClick={() => deleteComment(item._id)}
                    >
                      delete
                    </span>
                  )}
                </>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.replyBy?.image?.url} />}
                title={
                  <>
                    <strong>{item.replyBy?.name}</strong> -
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
      </div>
    </Modal>
  );
};

export default ReplyModel;

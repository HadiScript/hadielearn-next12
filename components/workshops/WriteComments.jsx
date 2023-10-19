import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-hot-toast";
import ReactTimeAgo from "react-time-ago";

const WriteComments = ({ selected }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const fetching = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://hadielearning.com/api/get-comments/${selected.key}`);
      setAllComments(data.allComments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (selected && selected.key) fetching();
  }, [selected && selected.key]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`https://hadielearning.com/api/add`, {
        name,
        email,
        key: selected.key,
        comment,
      });
      setAllComments([data.added, ...allComments]);
      setName("");
      setEmail("");
      setComment("");
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <>
      <div className="card p-5" style={{ backgroundColor: "#0f3f5d", borderRadius: "20px" }}>
        <div className="card-tittle">
          <form onSubmit={addComment}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-1 mb-1">
                  <label>
                    <h5 className="text-light">Name</h5>
                  </label>
                  <input style={{ outline: "none" }} type="text" className="form-control" placeholder="Name" value={name} name="name" onChange={(e) => setName(e.target.value)} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group py-1 mb-1">
                  <label>
                    <h5 className="text-light">Email</h5>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@mail.com"
                    style={{ outline: "none" }}
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group py-1 mb-5">
              <label htmlFor="">
                {" "}
                <h5 className="text-light">Write Comment</h5>
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Type Your Comment..."
                style={{ outline: "none" }}
                value={comment}
                name="comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn"
              disabled={name.length < 3 || !email ? true : false}
              style={{
                backgroundColor: `white`,
                color: "#0f3f5d",
                marginTop: "10px",
              }}
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>

      {/* list */}
      <div style={{ marginTop: "30px" }}>
        <h4>Comments ({allComments.length})</h4>
        <hr />

        {loading ? (
          <p>loading...</p>
        ) : (
          allComments &&
          allComments.map((x, index) => (
            <div key={index} className=" pb-4 d-flex justify-content-start align-items-start gap-3">
              {/* <HiUserCircle size={80} style={{marginTop : "-10px"}} color="#0f3f5d"/> */}
              <Avatar name={x.name} initials={1} size={50} round="50%" color="#0f3f5d" />
              <div
                className="  "
                style={{
                  backgroundColor: "",
                  border: "none",
                  borderBottom: "1px solid #f0f5f5",
                  borderRadius: "0",
                }}
              >
                <div className="d-flex w-100 align-items-center gap-3">
                  <h5 className="mb-1">{x.name}</h5>
                  <small style={{ fontSize: "10px" }}>
                    <ReactTimeAgo date={x.createdAt} locale="en-US" />
                  </small>
                </div>
                <p className="mb-1">{x.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default WriteComments;

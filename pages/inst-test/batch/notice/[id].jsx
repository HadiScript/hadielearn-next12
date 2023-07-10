import React, { useContext, useEffect } from "react";
import BatchLayout from "../../../../panel/newInstructor/layouts";
import { useRouter } from "next/router";
import { Card, Col, Row } from "antd";
import Btn from "../../../../components/ui/Btn";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../../../config/API";
import { AuthContext } from "../../../../context/auth";

const SingleBatchNotice = () => {
  const { id } = useRouter().query;
  const [auth] = useContext(AuthContext);

  const [notice, setNotice] = useState({});
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState("");

  const submit = async () => {
    if (!text || !variant || !heading) {
      return toast.error("All fields are required");
    }
    try {
      const { data } = await axios.post(
        `${API}/lms/add-update-notice/${id}`,
        {
          variant,
          text,
          heading,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.ok) {
        toast.success("added");
        setHeading("");
        setVariant("");
        setText("");
        getNotice(id);
      }
    } catch (error) {
      toast.error("Failed, try again");
    }
  };

  const getNotice = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/get-notice/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      setNotice(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (notice) {
      setText(notice?.text);
      setHeading(notice?.heading);
      setVariant(notice?.variant);
    }
  }, [notice]);

  useEffect(() => {
    if (auth && auth.token && id) getNotice(id);
  }, [auth && auth.token, id]);

  return (
    <BatchLayout BatchId={id}>
      {notice && (
        <Row className="mb-4">
          <Card>
            <div class={`alert alert-${notice?.variant}`} role="alert">
              <h4 class="alert-heading">{notice?.heading}</h4>
              <p>{notice?.text}</p>
              <hr />
              <p class="mb-0">{notice?.created_at}</p>
            </div>
          </Card>
        </Row>
      )}
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
            <div className="form-group">
              <label className="form-label fw-semibold">Heading</label>
              <input
                type="text"
                className="form-control"
                placeholder="Lecture 2 will be conducted on XX-XX-XXXX"
                name="heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label fw-semibold">Text</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="type..."
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label fw-semibold">Variant</label>
              <select
                required
                className="form-select"
                value={variant}
                onChange={(e) => {
                  setVariant(e.target.value);
                }}
              >
                <option value="">Choose</option>
                <option value="info">Info - Light Blue (mostly used)</option>
                <option value="danger">Red</option>
                <option value="success">Green</option>
                <option value="warning">Yellow</option>
              </select>
            </div>
            <br />
            <Btn onClick={submit}>Update</Btn>

            <span className="text-danger mx-2" onClick={(e) => {}}>
              Delete
            </span>
          </Card>
        </Col>
        <Col sm={24} xs={24} md={14} lg={14}>
          <Card>
            <div class={`alert alert-${variant}`} role="alert">
              <h4 class="alert-heading">{heading}</h4>
              <p>{text}</p>
              <hr />
              <small class="mb-0">
                {/* {formattedDate} | {formattedTime} */}
              </small>
            </div>
          </Card>
        </Col>
      </Row>
    </BatchLayout>
  );
};

export default SingleBatchNotice;

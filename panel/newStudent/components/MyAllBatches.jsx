import axios from "axios";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { API } from "../../../config/API";
import { useState } from "react";
import { AuthContext } from "../../../context/auth";
import { useContext } from "react";
import { Card, Col, Row } from "antd";
import CTA from "../../../components/partials/CTA";
import Footer from "../../../components/partials/Footer";
const { Meta } = Card;

const MyAllBatches = () => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [myBatches, setMyBatches] = useState([]);

  const getAllMyBatches = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/stu-all-batches`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setLoading(false);
      console.log(data, ".from getll batches");
      setMyBatches(data.enrolledBatches);
    } catch (error) {
      toast.error("Failed, try again");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      getAllMyBatches();
    }
  }, [auth && auth?.token]);

  return (
    <>
      <div className="container  pt-100 pb-80">
        <div className="row">
          <div className="col-xl-7">
            <div className="section-title section__title-3 mb-70">
              <h2>
                Welcome{" "}
                <span className="text-capitalize"> {auth?.user?.name} </span>
              </h2>
              {/* <p style={{ fontSize: "18px" }}>Your all Assigned Batches</p> */}
              {loading && (
                <div className="my-5">loading...</div>
              )}
            </div>
          </div>
        </div>
        <Row>
          {myBatches.length > 0 ? (
            myBatches?.map((x) => (
              <Col sm={24} md={6} lg={6} key={x._id}>
                <Card
                  style={{
                    width: 300,
                  }}
                >
                  <Meta
                    title={
                      <Link href={`/student-test/batch/${x._id}`}>
                        {x.title}
                      </Link>
                    }
                    description={x._id}
                  />
                </Card>
              </Col>
            ))
          ) : (
            <div className="col-12 text-center">
              <h5>Sorry {auth?.user?.name}, You don't have any batch.</h5>
              <br />
              <br />
              <br />
              <CTA />
            </div>
          )}
        </Row>
      </div>

      <Footer />
    </>
  );
};

export default MyAllBatches;

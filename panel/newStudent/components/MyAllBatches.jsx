import axios from "axios";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { API } from "../../../config/API";
import { useState } from "react";
import { AuthContext } from "../../../context/auth";
import { useContext } from "react";
import { Card, Col, Row, Skeleton } from "antd";
import CTA from "../../../components/partials/CTA";
import Footer from "../../../components/partials/Footer";
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/router";
const { Meta } = Card;

const MyAllBatches = () => {
  const [auth] = useContext(AuthContext);
  const router = useRouter();
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
      <div className="container d-flex flex-column justify-content-center align-items-center mt-100">
        {/* <Fade bottom cascade> */}
        <div className="page__title-content">
          <h1 className="pragrams-h1 text-center" style={{ fontSize: "40px", color: "#0f3f5d" }}>
            My enrollments
          </h1>
        </div>
        <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
          <em>
            We have got all your digital skill training needs covered with our extensive offered program list. All you have to do is to explore our program list, choose the program
            of your choice, and take your first step toward financial independence.
          </em>
        </p>
      </div>
      <div className="container pt-40 pb-80">
        <Row>
          {loading ? (
            <Col sm={24} md={6} lg={6} className="mx-3">
              <Skeleton />
            </Col>
          ) : myBatches.length > 0 ? (
            myBatches?.map((x) => (
              <Col sm={24} md={6} lg={6} key={x._id}>
                <Card
                  onClick={() => router.push(`/student-test/batch/description/${x._id}`)}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={x.courseDetails?.image?.url} />}
                >
                  <Meta
                    title={x.courseDetails?.title}
                    description={
                      <>
                        <b>{x.title}</b>
                        <div className="d-flex justify-content-start align-items-center gap-2">
                          Batch <FiExternalLink />
                        </div>
                      </>
                    }
                  />
                </Card>
                {/* <Card
                  style={{
                    width: 300,
                    borderRight: "2px solid #0f3f5d",
                  }}
                  actions={[
                    <span onClick={() => router.push(`/student-test/batch/description/${x._id}`)} className="d-flex justify-content-center align-items-center gap-2">
                      Batch <FiExternalLink />
                    </span>,
                  ]}
                >
                  <Meta
                    title={
                      <Link href={`/student-test/batch/description/${x._id}`}>
                        <span role="button" style={{ fontWeight: "bold", color: "#0f3f5d" }}>
                          {x.title}
                        </span>
                      </Link>
                    }
                    description={x._id}
                  />
                </Card> */}
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

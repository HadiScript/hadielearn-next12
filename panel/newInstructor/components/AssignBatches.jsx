import { Card } from "antd";
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../../config/API";
import { useEffect } from "react";
import { toImageUrl } from "../../../utils/ImageURL";
import Link from "next/link";

const AssignBatches = () => {
  const [auth] = useContext(AuthContext);
  const [batches, setbatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const myBatches = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/lms/inst/my-batches`);

      if (data.error) {
        return toast.error(data.error);
      }
      setbatches(data.batches);
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      myBatches();
    }
  }, [auth?.token]);

  console.log(batches, "here is the");

  return (
    <div className="container mt-100 ">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="page__title-content">
          <h1 className="pragrams-h1 text-center" style={{ fontSize: "40px", color: "#0f3f5d" }}>
            Assign Batches
          </h1>
        </div>
        <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
          <em>
            We have got all your digital skill training needs covered with our extensive offered program list. All you have to do is to explore our program list, choose the program
            of your choice, and take your first step toward financial independence.
          </em>
        </p>
        {loading && "Loading..."}
      </div>

      <div className="row mt-50 py-10">
        {batches?.map((x) => (
          <div key={x._id} className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4">
            <Link href={`/inst-test/batch/description/${x._id}`}>
              <Card
                hoverable
                style={{
                  width: "100%",
                }}
                cover={
                  <>
                    {x?.courseDetails?.image?.url?.includes("courseImages") ? (
                      <img alt="course-image" src={toImageUrl(x?.courseDetails?.image?.url)} />
                    ) : (
                      <img alt="course-image" src={x?.courseDetails?.image?.url} />
                    )}
                  </>
                }
              >
                <Card.Meta title={x.title} description={x.courseDetails?.title} />
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignBatches;

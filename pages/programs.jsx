import React, { useState } from "react";
import SEOHead from "../components/functions/SEOHead";
import Footer from "../components/partials/Footer";
import CourseList from "../components/programs/CourseList";
import axios from "axios";
import { API } from "../config/API";
import TopHeader from "../components/partials/TopHeader";
import { FaSearch } from "react-icons/fa";
import { Fade } from "react-reveal";
import { Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

const Programs = ({ courses }) => {
  const [course_data, setCourse_data] = useState(courses);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <SEOHead
        title={"Hadi, providing you with one of the best online course platforms"}
        desc={
          "With the help of industry experts, we have developed various computer short courses for hadi e-learning that can help you learn the tips and tricks of the digital world."
        }
        conLink={"https://hadielearning.com/programs"}
      />
      <img src="/assets/image/bg-gird1.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} />
      <TopHeader />

      <div className="position-relative">
        <div className="container d-flex flex-column justify-content-center align-items-center mt-150">
          <Fade bottom cascade>
            <div className="page__title-content">
              <h1 className="pragrams-h1 text-center" style={{ fontSize: "40px", color: "#0f3f5d" }}>
                Programs to level up your digital skills
              </h1>
            </div>
            <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
              <em>
                We have got all your digital skill training needs covered with our extensive offered program list. All you have to do is to explore our program list, choose the
                program of your choice, and take your first step toward financial independence.
              </em>
            </p>
          </Fade>
        </div>

        <Fade bottom cascade>
          <div className="container">
            <Row className="justify-content-center align-items-center">
              <Col xs="auto" className="mb-2">
                <Link href={"/enroll/program"}>
                  <Button style={{ backgroundColor: "#0f3f5d", border: "none" }}>Enroll Now</Button>
                </Link>
              </Col>

              <Col md="5" xs="12" className="mb-2">
                <form action="">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div
                        style={{
                          backgroundColor: "#0f3f5d",
                          border: "none",
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                          color: "white",
                          height: "40px",
                        }}
                        className="input-group-text"
                      >
                        <FaSearch color="white" />
                      </div>
                    </div>
                    <input
                      style={{ border: "1px solid #0f3f5d" }}
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupUsername"
                      placeholder="Search course here"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </Fade>
      </div>

      {/* {JSON.stringify(course_data)} */}
      <CourseList courses_data={course_data} searchQuery={searchQuery} />

      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/courses2`);

  return {
    props: {
      courses: data.courses,
    },
  };
}

export default Programs;

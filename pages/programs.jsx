import React, { useState } from "react";
import SEOHead from "../components/functions/SEOHead";
import PagesNavbar from "../components/partials/PageNavbar";
import Breadcrumbs from "../components/partials/Breadcrumbs";
import Footer from "../components/partials/Footer";
import CourseList from "../components/programs/CourseList";
import axios from "axios";
import { API } from "../config/API";
import TopHeader from "../components/partials/TopHeader";
import { FaSearch } from "react-icons/fa";
import ReactHtmlParser from "react-html-parser";
import { Fade } from "react-reveal";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import Link from "next/link";
import { CgArrowLongRight } from "react-icons/cg";

const Programs = ({ courses }) => {
  const [course_data, setCourse_data] = useState(courses);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCourses = course_data.filter((course) => {
    return course.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const extractTextFromHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <>
      <SEOHead
        title={
          "Hadi, providing you with one of the best online course platforms"
        }
        desc={
          "With the help of industry experts, we have developed various computer short courses for hadi e-learning that can help you learn the tips and tricks of the digital world."
        }
        conLink={"https://hadielearning.com/programs"}
      />
      <img
        src="/assets/image/bgPrograms.svg"
        alt="background"
        className="position-absolute "
        style={{ color: "transparent", zIndex: "-1", top: 0 }}
      />
      <TopHeader />

      <div className="position-relative">
        <div className="container d-flex flex-column justify-content-center align-items-center mt-150">
          <Fade bottom cascade>
            <h1
              className="text-center"
              style={{ fontSize: "60px", color: "#0f3f5d" }}
            >
              Programs to level up your digital skills
            </h1>
            <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
              <em>
                We have got all your digital skill training needs covered with
                our extensive offered program list. All you have to do is to
                explore our program list, choose the program of your choice, and
                take your first step toward financial independence.
              </em>
            </p>
          </Fade>
        </div>

        <Fade bottom cascade>
          <div className="container">
            <Row className="justify-content-center align-items-center">
              <Col xs="auto" className="mb-2">
                <Link href={'/enroll/program'}>
                  <Button
                    style={{ backgroundColor: "#0f3f5d", border: "none" }}
                  >
                    Enroll Now
                  </Button>
                </Link>
              </Col>

              <Col md="5" xs="12" className="mb-2">
                <form action="">
                  <label className="sr-only" for="inlineFormInputGroupUsername">
                    Username
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div
                        style={{
                          backgroundColor: "#0f3f5d",
                          border: "none",
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

      <div className="container">
        <div className="row mt-100">
          {filteredCourses?.map((x) => (
            <div className="col-xl-4 col-lg-4 col-md-4">
              <div key={x.id} className="blog__item-22 mb-50 fix">
                <div className={`blog__thumb-22 w-img fix `}>
                  <Link href={`/program/${x.slug}`}>
                    <img
                      src={x.image?.url}
                      alt=""
                      style={{ height: "250px" }}
                    />
                  </Link>
                </div>

                <div className="blog__content-2">
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    <Link href={`/program/${x.slug}`}>{x.title}</Link>
                  </span>
                  <Link href={`/program/${x.slug}`}>
                    <p className="mt-20 text-muted" role="button">
                      {ReactHtmlParser(
                        extractTextFromHtml(x.overview).substring(0, 70) + "..."
                      )}
                    </p>
                  </Link>
                  {/* <Link href={`/program/${x.slug}`}>
                    <span className="link-btn-2">
                      Read More
                      <i>
                        <CgArrowLongRight />
                      </i>
                      <i>
                        <CgArrowLongRight />
                      </i>
                    </span>
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <CourseList courses_data={course_data} /> */}

      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/courses`);
  return {
    props: {
      courses: data.courses,
    },
  };
}

export default Programs;

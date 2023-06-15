import React from "react";
import Link from "next/link";
import TestCourseItem from "./TestCourseItem";

const TestCourseList = ({ courses_data }) => {
  return (
    <>
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__wrapper mr-50">
                <div className="section__title section__title-3 ">
                  <h2>Available Programs</h2>
                </div>
                <p>
                  With the help of industry experts, we have crafted an online
                  learning platform that offers various specially designed
                  courses that can transform your career. We are sure that these
                  programs can open doors to new prospects for you.
                </p>
                <br />
                <br />
                {courses_data.map((x, index) => (
                  <React.Fragment key={index}>
                    <TestCourseItem
                      title={x.title}
                      overview={x.overview}
                      slug={x.slug}
                      image={x.image}
                      author={x.instructor}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4">
              <div className="blog__sidebar">
                <div className="sidebar__widget mb-50 ">
                  <div className="sidebar__widget-title mb-50">
                    <h4>Popular Tags</h4>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="tags">
                      <p to="#">DigitalSkillsWorkshop</p>
                      <p to="#">TechTraining</p>
                      <p to="#">DigitalLiteracy</p>
                      <p to="#">TechForAll</p>
                      <p to="#">DigitalEmpowerment</p>
                      <p to="#">DigitalInclusion</p>
                      <p to="#">DigitalTransformation</p>
                      <p to="#">TechSkillsForAll</p>
                      <p to="#">FutureOfWork</p>
                      <p to="#">BridgingTheDigitalDivide</p>
                    </div>
                  </div>
                </div>

                <div
                  className="text-center"
                  style={{
                    backgroundColor: "#0f3f5d",
                    padding: "20px",
                    borderRadius: "20px",
                  }}
                >
                  <h3 className="text-light">Level up. Enroll. Empower now!</h3>
                  <br />
                  <Link href="/enroll/program">
                    <span
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "white",
                        border: "1px solid white",
                        padding: "5px 50px 5px",

                        borderRadius: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      Enroll Now
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestCourseList;

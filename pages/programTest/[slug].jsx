
import React, { useState } from "react";
import Tops from "../../components/functions/Tops";
import Link from "next/link";
import Footer from "../../components/partials/Footer";
import { API } from "../../config/API";
import axios from "axios";
import FaqsCourseDetailTest from "../../test/FaqsCoruseDetailsTest";
import CourseSidebarTest from "../../test/CourseSidebarTest";

const ProgramDetails = ({ course }) => {
  
  const [findedCourse, setFindedCourse] = useState(course);

  // tabs
  const [activeTabs, setactiveTabs] = useState("first");

  return (
    <>
      <Tops
        headTitle={findedCourse?.title}
        headDesc={
          "Go through these simple steps and enroll now in the most suitable course to make your mark in this digital world with the best online learning platform, hadi e-learning."
        }
        conLink={`https://hadielearning.com/program/${findedCourse?.slug}`}
        breadTitle={findedCourse?.title}
        breadSubTtile={
          findedCourse?.bread ? findedCourse?.bread : findedCourse?.title
        }
        image={"/assets/images/bread.jpg"}
      />

      {/* starts */}
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__details-wrapper mr-50">
                <div className="blog__details-thumb w-img mb-45">
                  <img
                    src={findedCourse?.image?.url}
                    alt=""
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <div className="blog__text mb-40">
                  <h1>{findedCourse?.title}</h1>
                  {/* {findedCourse?.overview} */}
                  <p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: findedCourse?.overview,
                      }}
                    />
                  </p>
                  {/* {findedCourse?.overview} */}

                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <span
                        id="navLinks"
                        className={`nav-link  ${
                          activeTabs === "first" ? "active" : ""
                        }`}
                        onClick={(e) => setactiveTabs("first")}
                        aria-current="page"
                      >
                        Outline
                      </span>
                    </li>

                    <li className="nav-item">
                      <span
                        id="navLinks"
                        className={`nav-link  ${
                          activeTabs === "third" ? "active" : ""
                        }`}
                        onClick={(e) => setactiveTabs("third")}
                        aria-current="page"
                      >
                        Why us
                      </span>
                    </li>

                    <li className="nav-item">
                      <span
                        id="navLinks"
                        className={`nav-link  ${
                          activeTabs === "second" ? "active" : ""
                        }`}
                        onClick={(e) => setactiveTabs("second")}
                        aria-current="page"
                      >
                        Prerequisites
                      </span>
                    </li>

                    <li className="nav-item">
                      <span
                        id="navLinks"
                        className={`nav-link  ${
                          activeTabs === "fourth" ? "active" : ""
                        }`}
                        onClick={(e) => setactiveTabs("fourth")}
                        aria-current="page"
                      >
                        Benefits
                      </span>
                    </li>
                    <li className="nav-item">
                      <span
                        id="navLinks"
                        className={`nav-link  ${
                          activeTabs === "fifth" ? "active" : ""
                        }`}
                        onClick={(e) => setactiveTabs("fifth")}
                        aria-current="page"
                      >
                        Market Value
                      </span>
                    </li>

                    <li className="nav-item">
                      <span
                        id="navLinks"
                        className={`nav-link  ${
                          activeTabs === "sixth" ? "active" : ""
                        }`}
                        onClick={(e) => setactiveTabs("sixth")}
                        aria-current="page"
                      >
                        FAQs
                      </span>
                    </li>
                  </ul>

                  {/* outlines */}
                  {activeTabs === "first" && (
                    <p className="pt-30 ">
                      <FaqsCourseDetailTest
                        details={findedCourse?.lectures}
                        page={"outline"}
                      />
                    </p>
                  )}

                  {activeTabs === "second" && (
                    <p className="pt-30 px-4">
                      <div
                        id="horizontalTab_lists"
                        dangerouslySetInnerHTML={{
                          __html: findedCourse?.prerequisites,
                        }}
                      />
                    </p>
                  )}

                  {activeTabs === "third" && (
                    <p className="pt-30">{findedCourse?.whyUs}</p>
                  )}

                  {activeTabs === "fourth" && (
                    <p className="pt-30">{findedCourse?.benefits}</p>
                  )}

                  {activeTabs === "fifth" && (
                    <p className="pt-30">{findedCourse?.marketValue}</p>
                  )}

                  {activeTabs === "sixth" && (
                    <p className="pt-30 ">
                      <FaqsCourseDetailTest
                        details={findedCourse?.faqs}
                        page={"FAQs"}
                      />
                    </p>
                  )}

                  <br />
                  <br />
                  <Link href={"/enroll/program"}>
                    <button className="z-btn z-btn-3 w-50">Enroll now</button>
                  </Link>
                </div>
              </div>
            </div>

            {findedCourse && <CourseSidebarTest course={findedCourse} />}
          </div>
        </div>
      </section>
      {/* ends */}

      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${API}/course/${params.slug}`);
  return {
    props: {
      course: data.course,
    },
  };
}

export default ProgramDetails;

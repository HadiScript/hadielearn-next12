import { useRouter } from "next/router";
import React, { useState } from "react";
import Tops from "../../components/functions/Tops";
import { courses_data } from "../../data/courses";
import CourseSideBar from "../../components/programs/CourseSideBar";
import FaqsCourseDetail from "../../components/programs/FaqsCourseDetail";
import Link from "next/link";
import { TbPointFilled } from "react-icons/tb";
import Footer from "../../components/partials/Footer";
import axios from "axios";
import { API } from "../../config/API";

const ProgramDetails = ({ course }) => {
  const router = useRouter();
  const { slug } = router.query;
  // const findedCourse = courses_data.find((x) => x.slug === slug);
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
        conLink={`https://hadielearning.com/program/${slug}`}
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
                        Eligibility
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
                        Scope
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
                      <FaqsCourseDetail
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
                    <p className="pt-30 px-4">
                      <div
                        id="horizontalTab_lists"
                        dangerouslySetInnerHTML={{
                          __html: findedCourse?.whyUs,
                        }}
                      />
                    </p>
                  )}

                  {activeTabs === "fourth" && (
                    <p className="pt-30 px-4">
                      <div
                        id="horizontalTab_lists"
                        dangerouslySetInnerHTML={{
                          __html: findedCourse?.benefits,
                        }}
                      />
                    </p>
                  )}

                  {activeTabs === "fifth" && (
                    <p className="pt-30 px-4 ">
                      <div
                        id="horizontalTab_lists"
                        dangerouslySetInnerHTML={{
                          __html: findedCourse?.marketValue,
                        }}
                      />
                    </p>
                  )}

                  {activeTabs === "sixth" && (
                    <p className="pt-30 ">
                      <FaqsCourseDetail
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

            {findedCourse && <CourseSideBar course={findedCourse} />}
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

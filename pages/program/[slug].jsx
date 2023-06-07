import { useRouter } from "next/router";
import React, { useState } from "react";
import Tops from "../../components/functions/Tops";
import { courses_data } from "../../data/courses";
import CourseSideBar from "../../components/programs/CourseSideBar";
import FaqsCourseDetail from "../../components/programs/FaqsCourseDetail";
import Link from "next/link";
import { TbPointFilled } from "react-icons/tb";
import Footer from "../../components/partials/Footer";


const ProgramDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const findedCourse = courses_data.find((x) => x.slug === slug);

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
                    src={findedCourse?.image}
                    alt=""
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <div className="blog__text mb-40">
                  <h1>{findedCourse?.title}</h1>
                  <p>{findedCourse?.Overview}</p>
                  {findedCourse?.Overview2 && (
                    <>
                      <p>{findedCourse?.Overview2}</p>
                    </>
                  )}

                  {/* test */}

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
                        Curriculum
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
                        Objectives
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
                  </ul>

                  {/* outlines */}
                  {activeTabs === "first" && (
                    <p className="pt-30 ">
                      <FaqsCourseDetail details={findedCourse?.outlines} />
                    </p>
                  )}

                  {activeTabs === "second" && (
                    <p className="pt-30">
                      <ul>
                        {findedCourse?.Prerequisites.map((x, index) => (
                          <li key={index}>
                            <div className="py-1">
                              <TbPointFilled size={15} /> {x}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </p>
                  )}

                  {activeTabs === "third" && (
                    <p className="pt-30">
                      <ul>
                        {findedCourse?.objectives.map((x, index) => (
                          <li key={index} className="mb-3">
                            {x.points.map((i, index) => (
                              <div className="d-flex gap-1 py-1" key={index}>
                                <div className="">
                                  <TbPointFilled size={15} />
                                </div>
                                <div className="">{i}</div>
                              </div>
                            ))}
                          </li>
                        ))}
                      </ul>
                    </p>
                  )}

                  {activeTabs === "fourth" && (
                    <p className="pt-30">
                      <ul>
                        {findedCourse?.benefits.map((x, index) => (
                          <li key={index} className="mb-3">
                            {x.points.map((i, index) => (
                              <div className="d-flex gap-1 py-1" key={index}>
                                <div className="">
                                  <TbPointFilled size={15} />
                                </div>
                                <div className="">{i}</div>
                              </div>
                            ))}
                          </li>
                        ))}
                      </ul>
                    </p>
                  )}

                  {activeTabs === "fifth" && (
                    <p className="pt-30">
                      <ul>
                        <li className="mb-3">
                          <h4> Coming Soon :)</h4>
                        </li>
                      </ul>
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

          {  findedCourse && <CourseSideBar course={findedCourse} />}
          </div>
        </div>
      </section>
      {/* ends */}

      <Footer />
    </>
  );
};

export default ProgramDetails;

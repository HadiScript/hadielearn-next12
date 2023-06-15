import React, { useState } from "react";
import Tops from "../../components/functions/Tops";
import { useRouter } from "next/router";
import { workshop_data } from "../../data/workshop_data";
import Link from "next/link";
import WriteComments from "../../components/workshops/WriteComments";
import { BiCheck } from "react-icons/bi";
import axios from "axios";
import Footer from "../../components/partials/Footer";
import { API } from "../../config/API";

const WorkshopDetails = ({ workshop }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [selected, setSelected] = useState(workshop);

  const dateTime_workshop = new Date(selected?.dateAndTime);
  const currentDate = new Date();

  const givenDataAndTime = new Date(selected?.dateAndTime);

  const formattedDate = givenDataAndTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = givenDataAndTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  return (
    <>
      <Tops
        headTitle={selected?.title}
        headDesc={
          "Go through these simple steps and enroll now in the most suitable course to make your mark in this digital world with the best online learning platform, hadi e-learning."
        }
        conLink={`https://hadielearning.com/program/${slug}`}
        breadTitle={selected?.title}
        breadSubTtile={selected?.bread ? selected?.bread : selected?.title}
        image={"/assets/images/bread.jpg"}
      />

      {/* start */}
      {/* <section className="services__details pt-115 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 order-last order-lg-first">
              <div className="services__sidebar mr-50">
                <div className="sidebar__widget  mb-30 ">
                  <div className="sidebar__widget-title mb-50">
                    <h4>Popular Tags</h4>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="tags">
                      {selected?.tags.map((x, index) => (
                        <p key={index}>{x}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sidebar__widget  mb-30 ">
                  <div className="sidebar__widget-title mb-20">
                    <h4>Date & Timing</h4>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="tags">
                      {formattedDate} | {formattedTime}
                    </div>
                  </div>
                </div>
                {!(currentDate.getTime() > dateTime_workshop.getTime()) && (
                  <Link
                    href={"/enroll/workshop"}
                    className="z-btn z-btn-3 w-100"
                  >
                    Register Now
                  </Link>
                )}
              </div>
            </div>
            <div className="col-xl-8 col-lg-8">
              <div className="services__text">
                <h2>{selected?.title}</h2>
                <br />
                <h3>{selected?.heading1}</h3>
                <p>{selected?.content1}</p>
              </div>
              <div className="services__img mb-45 w-img">
                <img
                  src={`/assets/images/workshop/${selected?.image}.jpg`}
                  alt=""
                />
              </div>

              <div className="services__list mb-40">
                <div className="service-text">
                  <h3>Outlines</h3>
                  <p style={{ fontSize: "18px" }}> {selected?.outlineLine}</p>
                </div>
                <ul>
                  {selected?.outline.map((x, index) => (
                    <li
                      key={index}
                      className="d-flex justify-content-start align-items-center gap-2"
                    >
                      {" "}
                      <BiCheck size={25} />{" "}
                      <span style={{ fontSize: "17px" }}>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="services__text">
                <h4>Conclusion</h4>
                <p>{selected?.conclusion}</p>
              </div>

              {!(currentDate.getTime() > dateTime_workshop.getTime()) && (
                <>
                  <Link href={"/enroll/workshop"} className="z-btn z-btn-3 ">
                    Register Now
                  </Link>
                  <hr />
                </>
              )}
              <WriteComments selected={selected} />
             
            </div>
          </div>
        </div>
      </section> */}
      {/* ends */}

      <section className="services__details pt-115 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 order-last order-lg-first">
              <div className="services__sidebar mr-50">
                <div className="sidebar__widget  mb-30 ">
                  <div className="sidebar__widget-title mb-50">
                    <h4>Popular Tags</h4>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="tags">
                      {selected?.tags.map((x, index) => (
                        <p key={index}>{x}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sidebar__widget  mb-30 ">
                  <div className="sidebar__widget-title mb-20">
                    <h4>Date & Timing</h4>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="tags">
                      {formattedDate} | {formattedTime}
                    </div>
                  </div>
                </div>
                {!(currentDate.getTime() > dateTime_workshop.getTime()) && (
                  <Link
                    href={"/enroll/workshop"}
                    className="z-btn z-btn-3 w-100"
                  >
                    Register Now
                  </Link>
                )}
              </div>
            </div>
            <div className="col-xl-8 col-lg-8">
              <div className="services__text">
                <h2>{selected?.title}</h2>
                <p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selected?.content,
                    }}
                  />
                </p>
              </div>
              <div className="services__img mb-45 w-img">
                <img src={selected?.image?.url} alt="image_from_workshp" />
              </div>

              <div className="services__list mb-40">
                <div className="service-text">
                  <h3>Outlines</h3>
                  <p style={{ fontSize: "18px" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selected?.outlines,
                      }}
                    />
                  </p>
                </div>
                {/* <ul>
                  {selected?.outline.map((x, index) => (
                    <li
                      key={index}
                      className="d-flex justify-content-start align-items-center gap-2"
                    >
                      {" "}
                      <BiCheck size={25} />{" "}
                      <span style={{ fontSize: "17px" }}>{x}</span>
                    </li>
                  ))}
                </ul> */}
              </div>
              <div className="services__text">
                <h4>Conclusion</h4>
                <p>{selected?.conclusion}</p>
              </div>

              {!(currentDate.getTime() > dateTime_workshop.getTime()) && (
                <>
                  <Link href={"/enroll/workshop"} className="z-btn z-btn-3 ">
                    Register Now
                  </Link>
                  <hr />
                </>
              )}
              <WriteComments selected={selected} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${API}/workshop/${params.slug}`);
  return {
    props: {
      workshop: data.workshop,
    },
  };
}

export default WorkshopDetails;

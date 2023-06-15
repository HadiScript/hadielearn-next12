import React from "react";
import Tops from "../components/functions/Tops";
import Area from "../components/workshops/Area";
import Footer from "../components/partials/Footer";
import axios from "axios";
import { API } from "../config/API";
import { useState } from "react";
import Link from "next/link";
import { CgArrowLongRight } from "react-icons/cg";
import LeftSideBar from "../components/workshops/LeftSideBar";

const TestWorkshops = ({ workshops }) => {
  const [workshop_data, setWorkshop_data] = useState(workshops);
  return (
    <>
      <Tops
        headTitle={
          "Join our workshops to get the most out of web based learning"
        }
        headDesc={
          "Register for one of our workshops and unlock your potential to conquer the digital world with the power of one of the best online education platforms, Hadi e-learning."
        }
        conLink={"https://hadielearning.com/workshops"}
        breadTitle={"Workshops"}
        breadSubTtile={"All Workshops"}
        image={"/assets/images/bread.jpg"}
      />
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__wrapper mr-50">
                {/* <h2 style={{ fontSize: "50px" }}>Free Workshops</h2> */}
                <div className="section__title section__title-3 ">
                  <h2>Free Workshops</h2>
                </div>
                <p>
                  Join one of our workshops to explore various digital niches
                  and endless career options you can pursue for a prosperous
                  future.
                </p>
                <br />
                <br />
                {workshop_data.map((x, index) => (
                  <div className="blog__item-3 mb-50 fix">
                    <div className={`blog__thumb-3 w-img fix `}>
                      <Link href={`/workshop-detail-test/${x.slug} `}>
                        <img src={x.image?.url} alt="workshop_image"   height={80} />
                      </Link>
                    </div>
                    <div className="blog__content-2">
                      <div className="blog__meta-2 mb-15 d-sm-flex align-items-center">
                        <div className="d-flex align-items-center  pr-20 mr-20">
                          <Link href={`/workshop-detail-test/${x.slug} `}>
                            <img
                              className="pr-10"
                              src={x.instructor?.image?.url}
                              alt=""
                              height={80}
                            />
                          </Link>
                          <div>
                            <span
                              style={{ fontWeight: "bold", fontSize: "18px" }}
                            >
                              {x.instructor?.name}
                            </span>
                            <br />
                            <small style={{ fontSize: "14px" }}>
                              {x.instructor?.exp}
                            </small>
                            <br />
                            <small style={{ fontSize: "14px" }}>
                              {x.meetingTiming}
                            </small>
                          </div>
                        </div>
                      </div>
                      <br />

                      <h3>
                        <Link href={`/workshop-detail-test/${x.slug} `}>
                          {x.title}
                        </Link>
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: x.content.substring(0, 150) + "...",
                        }}
                      />
                      <div className="blog__btn d-sm-flex justify-content-between">
                        <div className="blog__btn">
                          <Link href={`/workshop-detail-test/${x.slug} `}>
                            <span className="link-btn-2">
                              Read More
                              <i>
                                <CgArrowLongRight />
                              </i>
                              <i>
                                <CgArrowLongRight />
                              </i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <LeftSideBar />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/workshops`);
  return {
    props: {
      workshops: data.allworkshops,
    },
  };
}

export default TestWorkshops;

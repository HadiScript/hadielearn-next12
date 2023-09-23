import React from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

const Background = () => {
  return (
    <>
      <section className="achievement__area pt-135">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-6">
              <div className="achievement__content">
                <div className="section__title section__title-3 mb-20">
                  {/* <span>Background</span> */}
                  <h2>Background</h2>
                </div>
                <p style={{ fontSize: "18px" }}>
                  Pakistan's economic conditions have gone through turbulence in
                  recent years. This situation has caused a void of
                  opportunities in the countries which has discouraged the youth
                  greatly. To address this disappointment among the youth of the
                  country Hadi E-learning plans to offer:
                </p>

                <div className="about__list">
                  <ul>
                    <li>
                      <span>
                        <i>
                          <FaCheck />
                        </i>
                        Free IT training to the youth.
                      </span>
                    </li>
                    <li>
                      <span>
                        <i>
                          <FaCheck />
                        </i>
                        Training in in-demand futuristic fields.
                      </span>
                    </li>
                    <li>
                      <span>
                        <i>
                          <FaCheck />
                        </i>
                        Mentorship to make students ready for the industry.
                      </span>
                    </li>
                    <li>
                      <span>
                        <i>
                          <FaCheck />
                        </i>
                        Opportunities to be financially independent.
                      </span>
                    </li>
                    <li>
                      <span>
                        <i>
                          <FaCheck />
                        </i>
                        Strengthening the country's economy through skilled HR.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* <a href="#about" className="z-btn">
                  Learn More
                </a> */}
              </div>
            </div>
            <div className="col-xl-7 col-lg-6 col-md-6">
              <div className="row">
                <div className="col-xl-7 col-sm-6">
                  <div className="achievement__thumb m-img pl-30 text-right">
                    <img
                      src="assets/images/left.webp"
                      alt="achievement-1"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                </div>
                <div
                  id="bgImg"
                  className="col-xl-5 col-sm-6 d-md-none d-lg-none d-xl-block"
                >
                  <div className="achievement__thumb w-img">
                    <img
                      src="assets/images/right.webp"
                      alt=""
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Background;

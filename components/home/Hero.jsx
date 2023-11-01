import React from "react";
import { Fade, Reveal, Zoom } from "react-reveal";
import { CgArrowLongRight } from "react-icons/cg";
import Link from "next/link";
import Slider from "react-slick";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 500,
    infinite: true,
    dots: true,
    // fade: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="slider__area slider__area-2">
      <Slider className="slider-active" {...settings}>
        <section className="hero__area p-relative ">
          <div className="hero__item hero__height d-flex ">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-5 col-0 order-last" id="imagesBox">
                  <div className="hero__thumb-wrapper ml-70 scene p-relative w ">
                    <Zoom cascade>
                      <img id="mascot" className="layer" data-depth="0.2" src="/assets/images/check/checks.svg" alt="" />

                      {/* <div className="hero__thumb two d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.3"
                          src="/assets/images/bell.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "200px" }}
                        />
                      </div>

                      <div className="hero__thumb two d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.3"
                          src="/assets/images/bell.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "-200px" }}
                        />
                      </div>

                      <div className="hero__thumb four d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.5"
                          src="/assets/images/circle.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "150px" }}
                        />
                      </div>
                      <div className="hero__thumb four d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.5"
                          src="/assets/images/circle.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "-290px" }}
                        />
                      </div> */}
                    </Zoom>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-7 d-flex align-items-center" style={{ marginTop: "250px" }}>
                  <Fade bottom cascade>
                    <div className="about__content">
                      <h1 style={{ fontSize: "60px", maxWidth: "450px" }}>
                        Hadi E-learning providing you
                        <span style={{ color: "#0f3f5d" }}>
                          <Typewriter
                            options={{
                              strings: ["Free IT", "training"],
                              autoStart: true,
                              loop: true,
                            }}
                          />
                        </span>
                      </h1>
                      <p className="text-justify">Transform your future with free IT training.</p>
                      <Link href="/about-us">
                        <span className="z-btn-outline">About us </span>
                      </Link>

                      <Link href="/programs">
                        <span className="z-btn-register mx-2">
                          Programs
                          <i className="mx-2">
                            <CgArrowLongRight />
                          </i>
                        </span>
                      </Link>
                    </div>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hero__area p-relative ">
          <div className="hero__item hero__height d-flex ">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-5 col-0 order-last" id="imagesBox">
                  <div className="hero__thumb-wrapper ml-70 scene p-relative w ">
                    <Zoom cascade>
                      <img id="mascot" className="layer" data-depth="0.2" src="/assets/images/check/skills.png" alt="" />

                      {/* <div className="hero__thumb two d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.3"
                          src="/assets/images/bell.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "200px" }}
                        />
                      </div>

                      <div className="hero__thumb two d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.3"
                          src="/assets/images/bell.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "-200px" }}
                        />
                      </div>

                      <div className="hero__thumb four d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.5"
                          src="/assets/images/circle.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "150px" }}
                        />
                      </div>
                      <div className="hero__thumb four d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.5"
                          src="/assets/images/circle.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "-290px" }}
                        />
                      </div> */}
                    </Zoom>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-7 d-flex align-items-center" style={{ marginTop: "250px" }}>
                  <Fade bottom cascade>
                    <div className="about__content">
                      <h1 style={{ fontSize: "60px", maxWidth: "450px" }}>
                        Hadi E-learning providing
                        <span style={{ color: "#0f3f5d" }}>
                          <Typewriter
                            options={{
                              strings: ["Quality", "skills"],
                              autoStart: true,
                              loop: true,
                            }}
                          />
                        </span>
                      </h1>
                      <p className="text-justify">Elevate your skill set with training in futuristic fields.</p>
                      <Link href="/about-us">
                        <span className="z-btn-outline">About us </span>
                      </Link>

                      <Link href="/programs">
                        <span className="z-btn-register mx-2">
                          Programs
                          <i className="mx-2">
                            <CgArrowLongRight />
                          </i>
                        </span>
                      </Link>
                    </div>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hero__area p-relative ">
          <div className="hero__item hero__height d-flex ">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-5 col-0 order-last" id="imagesBox">
                  <div className="hero__thumb-wrapper ml-70 scene p-relative w ">
                    <Zoom cascade>
                      <img id="mascot" className="layer" data-depth="0.2" src="/assets/images/check/finance.png" alt="" />

                      {/* <div className="hero__thumb two d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.3"
                          src="/assets/images/bell.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "200px" }}
                        />
                      </div>

                      <div className="hero__thumb two d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.3"
                          src="/assets/images/bell.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "-200px" }}
                        />
                      </div>

                      <div className="hero__thumb four d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.5"
                          src="/assets/images/circle.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "150px" }}
                        />
                      </div>
                      <div className="hero__thumb four d-none d-md-block d-lg-none d-xl-block">
                        <img
                          className="layer"
                          data-depth="0.5"
                          src="/assets/images/circle.png"
                          alt=""
                          style={{ height: "100px", marginLeft: "-290px" }}
                        />
                      </div> */}
                    </Zoom>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-7 d-flex align-items-center" style={{ marginTop: "250px" }}>
                  <Fade bottom cascade>
                    <div className="about__content">
                      <h1 style={{ fontSize: "60px", maxWidth: "450px" }}>
                        Hadi E-learning providing
                        <span style={{ color: "#0f3f5d" }}>
                          <Typewriter
                            options={{
                              strings: ["Opportunities"],
                              autoStart: true,
                              loop: true,
                            }}
                          />
                        </span>
                      </h1>
                      <p className="text-justify">Kick start your career and become financially independent.</p>
                      <Link href="/about-us">
                        <span className="z-btn-outline">About us </span>
                      </Link>

                      <Link href="/programs">
                        <span className="z-btn-register mx-2">
                          Programs
                          <i className="mx-2">
                            <CgArrowLongRight />
                          </i>
                        </span>
                      </Link>
                    </div>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Slider>
    </section>
  );
};

export default Hero;

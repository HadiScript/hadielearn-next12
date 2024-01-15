import React from "react";
import Slider from "react-slick";
import { BsCaretDown } from "react-icons/bs";
import Link from "next/link";

const MobHero = () => {
  // slick setting
  const settings = {
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 500,
    infinite: true,
    dots: true,
    fade: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* <VideoPopup videoId="yJg-Y5byMMw" /> */}

      <section className="slider__area">
        <Slider className="testimonial__slider" {...settings}>
          <div className={`single-slider `}>
            <div style={{ height: "62px" }} />
            <div className={`d-flex align-items-center home_slider_2`} style={{ height: "100%" }}>
              <div className="slider__shape">
                <img className="shape triangle" src="/assets/images/slider/triangle.png" alt="triangle" />
                <img className="shape dotted-square" src="/assets/images/slider/dotted-square.png" alt="dotted-square" />
                <img className="shape solid-square" src="/assets/images/slider/solid-square.png" alt="solid-square" />
              </div>
              <div className="container h1_slider_wrapper">
                <div className="row">
                  <div className="col-xl-9 col-lg-9 col-md-10 col-sm-10">
                    <div className="slider__content">
                      <span>Welcome to</span>
                      <h2>
                        Hadi <br /> E-learning
                      </h2>
                      <p className="text-light">Hadi E-Learning provides free online IT courses in Pakistan.</p>
                      <a href="#sectionArea" className="z-btn">
                        Explore <BsCaretDown size={25} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`single-slider `}>
            <div style={{ height: "62px" }} />
            <div className={`d-flex align-items-center home_slider_2`} style={{ height: "100%" }}>
              <div className="slider__shape">
                <img className="shape triangle" src="/assets/images/slider/triangle.png" alt="triangle" />
                <img className="shape dotted-square" src="/assets/images/slider/dotted-square.png" alt="dotted-square" />
                <img className="shape solid-square" src="/assets/images/slider/solid-square.png" alt="solid-square" />
              </div>
              <div className="container h1_slider_wrapper">
                <div className="row">
                  <div className="col-xl-9 col-lg-9 col-md-10 col-sm-10">
                    <div className="slider__content">
                      <span>Welcome to</span>
                      <h2>
                        Hadi <br /> E-learning
                      </h2>
                      <p className="text-light">Hadi E-Learning provides free online IT courses in Pakistan.</p>
                      <Link href="/programs">
                        <button className="z-btn">Programs</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>
    </>
  );
};

export default MobHero;

import React from "react";
import Slider from "react-slick";

const Brands = () => {
  const settings = {
    autoplay: false,
    autoplaySpeed: 10000,
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="brand__area p-relative pt-120 pb-100">
        <div className="brand__shape">
          <img
            className="square"
            src="assets/img/icon/brand/square.png"
            alt=""
          />
          <img
            className="circle"
            src="assets/img/icon/brand/circle.png"
            alt=""
          />
          <img
            className="circle-2"
            src="assets/img/icon/brand/circle-2.png"
            alt=""
          />
          <img
            className="triangle"
            src="assets/img/icon/brand/trianlge.png"
            alt=""
          />
        </div>
        <div className="container p-relative">
          <div className="row">
            {/* <div className="col-xl-4 offset-xl-1 col-lg-4 offset-lg-1">
              <div className="section__title mb-30">
                <span>Our Clients</span>
              </div>
            </div> */}
            <div className="col-xl-6 col-lg-7">
              <div
                className="section__title section__title-3 wow fadeInUp"
                data-wow-delay=".2s"
              >
                <h2>Our Partners</h2>
              </div>
              <div
                className="brand__subtitle mb-90 wow fadeInUp"
                data-wow-delay=".4s"
              >
                {/* <p>
                  Design anything from simple icons to fully featured websites
                  and applications.
                </p> */}
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-4 col-md-6 text-center mt-40">
              <img src="/assets/images/PIT.png" style={{ height: "50px" }} />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 text-center mt-40">
              <img
                src="/assets/images/cycarts_logo.png"
                style={{ height: "50px" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brands;

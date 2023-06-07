import React from "react";

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
                  The youth of Pakistan has been deprived of ample opportunities
                  for quite a while. With a large percentage of youth in our
                  population, we still, are unable to provide them with a
                  pathway that can lead to a bright future. This situation has
                  caused immense disappointment in our younger generation and
                  has urged the youth to look for opportunities aboard.
                </p>
                <p style={{ fontSize: "18px" }}>
                  With years of consideration and planning, we have come up with
                  a solution to play a positive role in the lives of Pakistani
                  youth and ultimately, for the betterment of society.
                </p>

                <a href="#about" className="z-btn">
                  Learn More
                </a>
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

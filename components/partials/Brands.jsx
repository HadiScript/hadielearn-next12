import React from "react";

const Brands = () => {
  return (
    <>
      <section className="brand__area p-relative pt-120 pb-100">
        <div className="container p-relative">
          <div className="row">
            <div className="col-xl-6 col-lg-7">
              <div className="section__title section__title-3 wow fadeInUp" data-wow-delay=".2s">
                <h2>Our Partners</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-4 col-md-6 text-center mt-40">
              <img src="/assets/images/PIT.png" style={{ height: "50px" }} />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 text-center mt-40">
              <img src="/assets/images/cycarts_logo.png" style={{ height: "50px" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brands;

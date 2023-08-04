import React from "react";
import SinglePrice from "./SinglePrice";

const Price = () => {
  return (
    <>
      <section className="about__area pt-0 pb-75">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
              <div className="section__title section__title-3 mb-85 text-center">
                <h2>Fee Structure</h2>
                <p>Here is the fee structure for all our courses.</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {/* <div className="col-xl-7 col-lg-6"> */}
            <SinglePrice
              title="Registeration Fee"
              price="0"
              point1={""}
              point2={""}
              point={""}
              linkTitle="Register Now"
            />
            <SinglePrice
              title="Course Fee"
              price="0"
              active="active"
              point1={""}
              point2={""}
              point={""}
              linkTitle="Enroll Now"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Price;

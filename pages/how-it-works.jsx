import React from "react";
import Tops from "../components/functions/Tops";
import CTA from "../components/partials/CTA";
import { Fade } from "react-reveal";
import Price from "../components/partials/Price";
import Footer from "../components/partials/Footer";
import FAQs from "./faqs";
import { faqs_data } from "../data/faqs";
import Link from "next/link";

const howItWorks = () => {
  return (
    <>
      <Tops
        headTitle={
          "How our best online learning platform, Hadi e-learning works"
        }
        headDesc={
          "Go through these simple steps and enroll now in the most suitable course to make your mark in this digital world with the best online learning platform, hadi e-learning."
        }
        conLink={"https://hadielearning.com/how-it-works"}
        breadTitle={"How it works?"}
        breadSubTtile={"How to join us?"}
        image={"/assets/images/bread-work.jpg"}
      />

      {/* start */}

      <div className="container pt-90">
        <div className="boxes">
          <Fade bottom cascade>
            <div id="leftBox">
              <h1>01</h1>
              <div className="left-box-content">
                <h2>Explore our available program list</h2>
              </div>
              <div className="left-box-image">
                <img src="/assets/images/flow/1st.png" />
              </div>
            </div>
          </Fade>

          <Fade bottom cascade>
            <div id="rightBox">
              <div className="right-box-image">
                <img src="/assets/images/flow/2nd.png" />
              </div>

              <div className="right-box-content">
                <h2>
                  Chat with our student coordinator to learn more about your
                  options
                </h2>
              </div>
              <h1>02</h1>
            </div>
          </Fade>

          <Fade bottom cascade>
            <div id="leftBox2">
              <h1>03</h1>
              <div className="left-box-content2">
                <h2>Choose the program that suits you the best </h2>
              </div>
              <div className="left-box-image2">
                <img src="/assets/images/flow/3rd.png" />
              </div>
            </div>
          </Fade>

          <Fade bottom cascade>
            <div id="rightBox">
              <div className="right-box-image2">
                <img src="/assets/images/flow/4th.png" />
              </div>

              <div className="right-box-content">
                <h2>Fill out the registration form</h2>
              </div>

              <h1>04</h1>
            </div>
          </Fade>

          <Fade bottom cascade>
            <div id="leftBox3">
              <h1>05</h1>
              <div className="left-box-content3">
                <h2>Pay registration fee</h2>
              </div>
              <div className="left-box-image3">
                <img src="/assets/images/flow/5th.png" />
              </div>
            </div>
          </Fade>

          <Fade bottom cascade>
            <div id="rightBox3">
              <div className="right-box-image3">
                <img src="/assets/images/flow/6th.png" />
              </div>

              <div className="right-box-content3">
                <h2>Learn about the course outline, outcomes, and schedules</h2>
              </div>
              <h1>06</h1>
            </div>
          </Fade>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src="/assets/images/flow/stars.png" />
          <div>
            <h2 className="star-heading">
              Brighten up your future with our specially designed programs
            </h2>
          </div>
        </div>

        <CTA />
        <Price />

        {/* faqs */}
        <FAQs list={3} component={false} />
      </div>
      {/* ends */}

      <Footer />
    </>
  );
};

export default howItWorks;

import React from "react";
import SEOHead from "../components/functions/SEOHead";
import Breadcrumbs from "../components/partials/Breadcrumbs";
import PagesNavbar from "../components/partials/PageNavbar";
import Background from "../components/about/Background";
import Platform from "../components/about/Platform";
import Testimonials from "../components/partials/Testimonials";
import Footer from "../components/partials/Footer";
import TopHeader from "../components/partials/TopHeader";
import { Fade } from "react-reveal";
import MissionsVissions from "../components/about/MissionsVissions";
import Stats from "../components/home/Stats";

const aboutUs = () => {
  return (
    <>
      <SEOHead
        title={"Build skills with Hadi e-learning: The best virtual learning platform"}
        desc={
          "Hadi e-learning is one of the best online learning platforms offering you various IT courses at a subsidized cost so you can get equal opportunities to build a successful career."
        }
        conLink={"https://hadielearning.com/about-us"}
      />
      {/* <PagesNavbar />
      <Breadcrumbs
        title="Get to know Hadi"
        subtitle="About Us"
        image={"/assets/images/bread.jpg"}
      /> */}
      <img src="/assets/image/bg-gird1.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} />
      <TopHeader />

      <div className="position-relative">
        <div className="container d-flex flex-column justify-content-center align-items-center mt-150">
          <Fade bottom cascade>
            <div className="page__title-content">
              <h1 className="pragrams-h1 text-center" style={{ fontSize: "40px", color: "#0f3f5d" }}>
                Learn more about Hadi E-learning
              </h1>
            </div>
            <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
              <em>Hadi E-learning, transforming your career through Free online IT training.</em>
            </p>
          </Fade>
        </div>
      </div>

      {/* <img
        src="/assets/image/bg-gird1.jpg"
        alt="background"
        className="position-absolute "
        style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }}
      />
      <TopHeader />

      <div className="position-relative">
        <div className="container d-flex flex-column justify-content-center align-items-center mt-150">
          <Fade bottom cascade>
            <div className="page__title-content">
              <h1
                className="pragrams-h1 text-center"
                style={{ fontSize: "40px", color: "#0f3f5d" }}
              >
                Programs to level up your digital skills
              </h1>
            </div>
            <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
              <em>
                We have got all your digital skill training needs covered with
                our extensive offered program list. All you have to do is to
                explore our program list, choose the program of your choice, and
                take your first step toward financial independence.
              </em>
            </p>
          </Fade>
        </div>
      </div> */}

      <MissionsVissions />
      <Stats />
      <Platform />
      <section className="pb-100">
        <Background />
      </section>
      <section className="pb-100">
        <Testimonials />
      </section>
      <Footer />
    </>
  );
};

export default aboutUs;

import React from "react";
import SEOHead from "../components/functions/SEOHead";
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
              <em>Hadi E-learning, transforming your career through Free and Subsidized online IT training.</em>
            </p>
          </Fade>
        </div>
      </div>



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

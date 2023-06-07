import React from "react";
import SEOHead from "../components/functions/SEOHead";
import Breadcrumbs from "../components/partials/Breadcrumbs";
import PagesNavbar from "../components/partials/PageNavbar";
import Background from "../components/about/Background";
import Platform from "../components/about/Platform";
import Testimonials from "../components/partials/Testimonials";
import Footer from "../components/partials/Footer";

const aboutUs = () => {
  return (
    <>
      <SEOHead
        title={
          "Build skills with Hadi e-learning: The best virtual learning platform"
        }
        desc={
          "Hadi e-learning is one of the best online learning platforms offering you various IT courses at a subsidized cost so you can get equal opportunities to build a successful career."
        }
        conLink={"https://hadielearning.com/about-us"}
      />
      <PagesNavbar />
      <Breadcrumbs
        title="Get to know Hadi"
        subtitle="About Us"
        image={"/assets/images/bread.jpg"}
      />
      <Background />
      <Platform />
      <section className="pb-100">
        <Testimonials />
      </section>
      <Footer />
    </>
  );
};

export default aboutUs;

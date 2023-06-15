import React from "react";
import ResponsiveHeros from "../components/home/ResposiveHeros";
import HomeAbout from "../components/home/HomeAbout";
import Courses from "../components/programs/Courses";
import HomeWorkshops from "../components/home/HomeWorkshops";
import CTA from "../components/partials/CTA";
import Testimonials from "../components/partials/Testimonials";
import Brands from "../components/partials/Brands";
import Footer from "../components/partials/Footer";
import SEOHead from "../components/functions/SEOHead";

const Home = () => {
  return (
    <>
      <SEOHead
        title={"Hadi E-learning - An excellent online learning platform"}
        desc={
          "Unlock the door to a bright and prosperous future in the digital world with Hadi-learning, an online learning platform that can help you excel in your career path."
        }
        conLink={"https://hadielearning.com/"}
      />
      <ResponsiveHeros />
      <HomeAbout />
      <Courses />
      <HomeWorkshops />
      <CTA />
      <Testimonials />
      <Brands />
      <Footer />
    </>
  );
};

export default Home;

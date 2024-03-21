import React, { useState } from "react";
import ResponsiveHeros from "../components/home/ResposiveHeros";
import HomeAbout from "../components/home/HomeAbout";
import Courses from "../components/programs/Courses";
import HomeWorkshops from "../components/home/HomeWorkshops";
import CTA from "../components/partials/CTA";
import Testimonials from "../components/partials/Testimonials";
import Brands from "../components/partials/Brands";
import Footer from "../components/partials/Footer";
import SEOHead from "../components/functions/SEOHead";
import axios from "axios";
import { API } from "../config/API";
import Stats from "../components/home/Stats";
import Testimonials2 from "../components/partials/Testimonials2";

const Home = ({ courses }) => {
  const [course_data, setCourse_data] = useState(courses);
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

      <Stats />
      <HomeAbout />
      {/* {JSON.stringify(course_data)} */}
      <Courses courses_data={course_data} />
      <HomeWorkshops />
      <CTA />
      {/* <Testimonials2 /> */}
      <Testimonials />
      <Brands />
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/courses2`);
  return {
    props: {
      courses: data.courses,
    },
  };
}

export default Home;

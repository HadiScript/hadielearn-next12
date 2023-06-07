import React from "react";
import SEOHead from "../components/functions/SEOHead";
import PagesNavbar from "../components/partials/PageNavbar";
import Breadcrumbs from "../components/partials/Breadcrumbs";
import Footer from "../components/partials/Footer";
import CourseList from "../components/programs/CourseList";

const Programs = () => {
  return (
    <>
      <SEOHead
        title={
          "Hadi, providing you with one of the best online course platforms"
        }
        desc={
          "With the help of industry experts, we have developed various computer short courses for hadi e-learning that can help you learn the tips and tricks of the digital world."
        }
        conLink={"https://hadielearning.com/programs"}
      />

      <PagesNavbar />
      <Breadcrumbs
        title="Programs"
        subtitle="Courses"
        image={"/assets/images/bread-program.jpg"}
      />
      <CourseList />
      <Footer />
    </>
  );
};

export default Programs;

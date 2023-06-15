import React, { useState } from "react";
import SEOHead from "../components/functions/SEOHead";
import PagesNavbar from "../components/partials/PageNavbar";
import Breadcrumbs from "../components/partials/Breadcrumbs";
import Footer from "../components/partials/Footer";
import CourseList from "../components/programs/CourseList";
import TestCourseList from "../test/TestCourseList";
import axios from "axios";
import { API } from "../config/API";

const ProgramsTest = ({ courses }) => {
  const [course_data, setCourse_data] = useState(courses);
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
      {/* {JSON.stringify(courses)} */}
      <TestCourseList courses_data={course_data} />
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/courses`);
  return {
    props: {
      courses: data.courses,
    },
  };
}

export default ProgramsTest;

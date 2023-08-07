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
import { useState } from "react";
import { Button, Modal } from "antd";
import { useEffect } from "react";
import Image from "next/image";
import Btn from "../components/ui/Btn";
import { useRouter } from "next/router";
import axios from "axios";
import { API } from "../config/API";

const Home = ({ courses }) => {
  const [course_data, setCourse_data] = useState(courses);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let fromLocal = localStorage.getItem("modal", open);

    if (!fromLocal) {
      setOpen(true);
      localStorage.setItem("modal", true);
    }

    // const timeout = setTimeout(() => {
    //   setOpen(true);
    // }, 5000);

    // return () => clearTimeout(timeout);
  }, []);

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
      {/* {JSON.stringify(course_data)} */}
      <Courses courses_data={course_data} />
      <HomeWorkshops />
      <CTA />
      <Testimonials />
      <Brands />
      <Footer />
      {/* asdsad */}

      <Modal
        centered
        open={open}
        onOk={() => {
          localStorage.setItem("modal", false);
          setOpen(false);
        }}
        onCancel={() => {
          localStorage.setItem("modal", false);
          setOpen(false);
        }}
        className="modal-notifications"
        width={1000}
        footer={[
          <Btn
            key="ok"
            type="primary"
            onClick={() => {
              localStorage.setItem("modal", false);
              setOpen(false);
              router.push("/enroll/program");
            }}
          >
            Enroll Now
          </Btn>,
        ]}
      >
        <Image
          className="mt-4"
          src={`/assets/image/modal-notifications2.jpg`}
          layout="responsive"
          width={1000}
          height={600}
          sizes="(max-width: 768px) 150vw, 150vw"
          alt="modal-image"
        />
      </Modal>
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

export default Home;

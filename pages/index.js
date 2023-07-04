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

const Home = () => {
  const [open, setOpen] = useState();
  useEffect(() => {
    let fromLocal = localStorage.getItem("modal", open);

    if (!fromLocal) {
      setOpen(true);
      localStorage.setItem("modal", true);
    }
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
      <Courses />
      <HomeWorkshops />
      <CTA />
      <Testimonials />
      <Brands />
      <Footer />

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
        width={1000}
        footer={[
          <Btn
            key="ok"
            type="primary"
            onClick={() => {
              localStorage.setItem("modal", false);
              setOpen(false);
            }}
          >
            Enroll Now
          </Btn>,
        ]}
      >
        <img
          className="mt-4"
          src={`/assets/image/modal-notifications.jpg`}
          width="100%"
          height="450px"
          alt="modal-image"
        />
      </Modal>
    </>
  );
};

export default Home;

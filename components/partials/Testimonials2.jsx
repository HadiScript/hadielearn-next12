import { Avatar } from "antd";
import React from "react";

import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "gray" }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "gray" }} onClick={onClick} />;
}

const Testimonials2 = () => {
  const testimonialData = [
    {
      id: 4,
      name: "Ayesha Hafeez",
      content:
        "I really want to appreciate Hadi eLearning platform because they provide high quality education in their classes. Currently, i am enroll in Seo course and the instructor explain everything very well. It's a best platform to learn and .",
    },

    {
      id: 4,
      name: "Ayesha Hafeez",
      content:
        "I really want to appreciate Hadi eLearning platform because they provide high quality education in their classes. Currently, i am enroll in Seo course and the instructor explain everything very well. It's a best platform to learn and .",
    },

    {
      id: 4,
      name: "Ayesha Hafeez",
      content:
        "I really want to appreciate Hadi eLearning platform because they provide high quality education in their classes. Currently, i am enroll in Seo course and the instructor explain everything very well. It's a best platform to learn and .",
    },

    {
      id: 5,
      name: "M. Zain Hassan Sabri",
      content:
        "Hadi E-Learning is a great platform for students who wants to learn new things while sitting at home and the tutors are much better than any other institute. They make sure you learn everything and teaches you in the best way possible.",
    },

    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
    {
      id: 6,
      name: "Jannat Awan",
      content:
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp .",
    },
  ];

  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "6px",
    speed: 500,

    arrows: false,
    dots: true,
    // slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          rows: 2,
          slidesPerRow: 2,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          rows: 2,
          slidesPerRow: 2,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h2>Multiple Rows</h2>
      <Slider {...settings}>
        {testimonialData.map((x) => (
          <div className="p-2">
            <div className="border rounded-2 p-3 d-flex flex-column align-items-start justify-content-center">
              <p>{x.content}</p>
              <div className="d-flex align-items-center gap-2 mt-4">
                <Avatar size={"large"} />
                <span>{x.name}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials2;

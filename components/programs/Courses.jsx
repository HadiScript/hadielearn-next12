import React from "react";
import Slider from "react-slick";
import Fade from "react-reveal/Fade";
import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { toImageUrl } from "../../utils/ImageURL";
import CourseCard from "./CourseCard";

const Courses = ({ courses_data }) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <AiOutlineArrowRight id="arrowBtns" onClick={onClick} className={className} size={25} color="#0f3f5d" />;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <AiOutlineArrowLeft id="arrowBtns" onClick={onClick} className={className} size={25} color="#0f3f5d" />;
  }

  // slick setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 992, // Medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
    ],
  };

  const filtered = courses_data?.filter((x) => x.show2 === true);

  return (
    <div className="container  pt-100 pb-80">
      <div className="row">
        <Fade bottom cascade>
          <div className="col-xl-7">
            <div className="section-title section__title-3 mb-70">
              <h2>Programs Hadi is offering </h2>
              <p style={{ fontSize: "18px" }}>
                We invite you to explore our{" "}
                <Link href="/programs" className="text-primary">
                  courses
                </Link>{" "}
                and discover the many benefits of Hadi E-Learning.
              </p>
            </div>
          </div>
        </Fade>
      </div>
      <Fade bottom cascade>
        <Slider className="project__slider" {...settings}>
          {filtered?.slice(0, 6)?.map((x, index) => (
            <React.Fragment key={index}>{x.show2 && <CourseCard x={x} />}</React.Fragment>
          ))}
        </Slider>
      </Fade>
    </div>
  );
};

export default Courses;

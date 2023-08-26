import React from "react";
import Slider from "react-slick";
import Fade from "react-reveal/Fade";
import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Rate, Tag } from "antd";
import { FaUser } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { CgArrowLongRight, CgLock } from "react-icons/cg";

export const checkStringTitle = (title) => {
  if (title?.length > 40) {
    return title.substring(0, 30) + "...";
  } else {
    return title;
  }
};

const Courses = ({ courses_data }) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <AiOutlineArrowRight
        id="arrowBtns"
        onClick={onClick}
        className={className}
        size={25}
        color="#0f3f5d"
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <AiOutlineArrowLeft
        id="arrowBtns"
        onClick={onClick}
        className={className}
        size={25}
        color="#0f3f5d"
      />
    );
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
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
    ],
  };

  // const avaliCourses = courses_data?.filter((x) => x._doc.available === true);

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
          {courses_data?.slice(0, 6)?.map((x, index) => (
            <div className="blog__item-2 mb-50 fix">
              <div className={`blog__thumb-2 w-img fix `}>
                <Link href={`/program/${x._doc.slug}`}>
                  <img
                    src={x._doc.image?.url}
                    alt=""
                    style={{ height: "250px" }}
                  />
                </Link>
              </div>

              <div className="blog__content-2">
                <div className="mt-1 mb-2 d-flex align-items-center gap-3">
                  <Rate
                    value={3}
                    style={{ color: "#0f3f5d", fontSize: "10px" }}
                  />
                  <small>(2/200)</small>
                </div>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  <Link href={`/program/${x._doc.slug}`}>{x._doc.title}</Link>
                </span>

                <div
                  className={`${
                    x._doc.title.length > 35 ? "mt-2" : "mt-4"
                  }  d-flex align-items-center justify-content-between `}
                >
                  <div className="d-flex align-items-center gap-1">
                    <IoMdTime size={18} />
                    <small style={{ fontSize: "10px" }}>
                      {x._doc.duration}
                    </small>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <IoMdTime size={18} />
                    <small style={{ fontSize: "10px" }}>40 classes</small>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <IoMdTime size={18} />
                    <small style={{ fontSize: "10px" }}>102 hrs</small>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #8080808c",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="pt-2 mt-3"
                >
                  <div className="d-flex align-items-center gap-2">
                    {x._doc.instructor && !x._doc.instructor?.image ? (
                      <FaUser size={25} color="gray" />
                    ) : (
                      <img
                        src={x._doc.instructor?.image.url}
                        alt=""
                        height={30}
                      />
                    )}
                    <span>{x._doc.instructor.name}</span>
                  </div>
                  <span style={{ fontWeight: "bold", color: "#0f3f5d" }}>
                    Free
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Fade>
    </div>
  );
};

export default Courses;

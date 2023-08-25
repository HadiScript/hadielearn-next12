import React from "react";
import Slider from "react-slick";
import Fade from "react-reveal/Fade";
import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

// import { courses_data } from "../../data/courses";
import { CgArrowLongRight } from "react-icons/cg";

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
                  <img src={x._doc.image?.url} alt="" style={{ height: "250px" }} />
                </Link>
              </div>

              <div className="blog__content-2">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  <Link href={`/program/${x._doc.slug}`}>{x._doc.title}</Link>
                </span>
                <p
                  className="pt-20"
                  dangerouslySetInnerHTML={{
                    __html: x.plainOverview.substring(0, 150) + "...",
                  }}
                />
                <Link href={`/program/${x._doc.slug}`}>
                  <span className="link-btn-2">
                    Read More
                    <i>
                      <CgArrowLongRight />
                    </i>
                    <i>
                      <CgArrowLongRight />
                    </i>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </Fade>
    </div>
  );
};

export default Courses;

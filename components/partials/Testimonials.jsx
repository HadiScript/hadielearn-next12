import React from "react";
import { Fade } from "react-reveal";
import Slider from "react-slick";

const Testimonials = () => {
  // slick setting
  const settings = {
    autoplay: false,
    autoplaySpeed: 10000,
    dots: true,
    fade: false,
    arrows: false,
  };
  const testimonialData = [
    {
      id: 1,
      name: "Abbas Ali",
      content:
        "This course was exactly what I needed to jumpstart my career in designing. The hands-on projects were challenging but rewarding, and I appreciated the personalized feedback from the instructor. I would highly recommend this course to anyone looking to gain practical skills in Designing.",
    },
    {
      id: 2,
      name: "Hassas Mukhtar",
      content:
        "I had no prior experience in development, but this course was so well-designed that I was able to quickly pick up the basics. The instructor was patient and encouraging, and I appreciated the community atmosphere that was fostered in the course. I'm now excited to explore ReactJS further and see where it can take me!",
    },
    {
      id: 3,
      name: "Taqi",
      content:
        "I've taken a lot of courses in 3d max, but this one stood out for its depth and rigor. The instructor was clearly an expert in the field and challenged us to think critically about the material. I appreciated the emphasis on real-world applications and the opportunity to work with industry-standard tools. This course has definitely helped me take my skills to the next level.",
    },
  ];

  return (
    <>
      <section
        className="testimoinal__area "
        style={{
          backgroundImage:
            " linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="testimonial__content pt-165 pb-175">
                <Fade bottom cascade>
                  <div className="section__title section__title-3 mb-30">
                    <span className="white-color">Testimonials</span>
                    <h2 className="white-color">What students are saying</h2>
                  </div>
                </Fade>

                <Fade bottom cascade>
                  <Slider className="testimonial__slider pb-70" {...settings}>
                    {testimonialData.map((testimonial, index) => {
                      return (
                        <div key={index} className="testimonial__item">
                          <p
                            className="white-color"
                            style={{ fontSize: "18px" }}
                          >
                            {testimonial.content}
                          </p>
                          <div className="testimonial__content d-flex align-items-center">
                            <div className="quote mr-20">
                              <img src="/assets/images/quote.png" alt="quote" />
                            </div>
                            <div className="testimonial__info">
                              <h3 className="white-color">
                                {testimonial.name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </Fade>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <Fade bottom cascade>
                <div className="testimonial__thumb m-img text-end pt-120 ">
                  <img src="/assets/images/testis.png" alt="testimonbial" />
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;

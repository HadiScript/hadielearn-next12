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
      name: "Alizah Jamal",
      content:
        "The 2-month graphic designing course has been amazing so far! I've gained a ton of new knowledge and the instructor is super helpful and supportive. It's been a fantastic experience!",
    },
    {
      id: 2,
      name: "Owais Khanzada",
      content:
        "Experience is amazing, being at Karachi and connecting with Hadi e learning was super smooth, and the mentor Ms Zahra Mohsin she's got immense knowledge regarding SEO , her friendly and cooperative nature makes it even more simple and easier to understand, highly recommended ☺️",
    },
    {
      id: 3,
      name: "Ubaid Ali",
      content:
        "I've been learning React JS through Hadi E-learning, and I can't express how grateful I am for the experience. The way they present complex concepts with simplicity and clarity is truly commendable. The examples they provide are not only relevant but also incredibly helpful in solidifying my understanding. Thanks to their efforts, I've gained a new level of confidence in my React skills.",
    },

    {
      id: 4,
      name: "Ayesha Hafeez",
      content:
        "I really want to appreciate Hadi eLearning platform because they provide high quality education in their classes. Currently, i am enroll in Seo course and the instructor explain everything very well. It's a best platform to learn and grow.",
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
        "I recently had the opportunity to enroll in the Hadi E-learning Free WordPress Course, and I must say it exceeded my expectations. The course content was comprehensive and well-structured, making it easy for beginners like me to grasp the fundamentals of WordPress.",
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

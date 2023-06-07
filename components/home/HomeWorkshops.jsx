import Link from "next/link";
import React from "react";


const HomeWorkshops = () => {
  return (
    <>
      <section className="faq__area p-relative pt-135 pb-100 mb-60 grey-bg-12">
        <div
          className="faq__thumb"
          style={{
            background: `url(/assets/images/workshop.png)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-5 offset-xl-7 col-lg-6 offset-lg-6 col-md-7 offset-md-5">
              <div className="faq__wrapper">
                <div
                  className="section__title section__title-3 mb-25 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  <h2>Join our Free Workshops</h2>
                </div>

                <p style={{ fontSize: "18px" }}>
                  Join our free online workshops on a variety of topics to gain
                  valuable insights and practical knowledge from the comfort of
                  your own home. Our team of experts will guide you through
                  interactive sessions, ensuring you leave with a deeper
                  understanding of the subject matter. Register now to secure
                  your spot!
                </p>
                <Link href={"/workshops"} className="z-btn mt-5">
                  See All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeWorkshops;

import React from "react";
import Link from "next/link";
import CourseItem from "./CourseItem";
import { Fade } from "react-reveal";
import ReactHtmlParser from "react-html-parser";

const CourseList = ({ courses_data, searchQuery }) => {
  const filteredCourses = courses_data.filter((course) => {
    return course.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // const extractTextFromHtml = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html");
  //   return doc.body.textContent || "";
  // };

  return (
    <>
      <div className="container">
        <Fade bottom cascade>
          <div className="row mt-100">
            {filteredCourses?.map((x) => (
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div key={x.id} className="blog__item-22 mb-50 fix">
                  <div className={`blog__thumb-22 w-img fix `}>
                    <Link href={`/program/${x.slug}`}>
                      <img
                        src={x.image?.url}
                        alt=""
                        style={{ height: "250px" }}
                      />
                    </Link>
                  </div>

                  <div className="blog__content-2">
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      <Link href={`/program/${x.slug}`}>{x.title}</Link>
                    </span>
                    <Link href={`/program/${x.slug}`}>
                      <p
                        className="mt-20 text-muted"
                        role="button"
                        dangerouslySetInnerHTML={{
                          __html: x.overview.substring(0, 150) + "...",
                        }}
                      >
                        {/* {ReactHtmlParser(x.overview) + "..."} */}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
      {/* <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__wrapper mr-50">
                <div className="section__title section__title-3 ">
                  <h2>Available Programs</h2>
                </div>
                <p>
                  With the help of industry experts, we have crafted an online
                  learning platform that offers various specially designed
                  courses that can transform your career. We are sure that these
                  programs can open doors to new prospects for you.
                </p>
                <br />
                <br />
                {courses_data.map((x, index) => (
                  <React.Fragment key={index}>
                    <CourseItem
                      title={x.title}
                      overview={x.overview}
                      slug={x.slug}
                      image={x.image}
                      author={x.instructor}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>

       
          </div>
        </div>
      </section> */}
    </>
  );
};

export default CourseList;

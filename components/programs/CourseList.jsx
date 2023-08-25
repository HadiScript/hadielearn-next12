import React from "react";
import Link from "next/link";
import CourseItem from "./CourseItem";
// import { Fade } from "react-reveal";
import ReactHtmlParser from "react-html-parser";

const CourseList = ({ courses_data, searchQuery }) => {
  const filteredCourses = courses_data.filter((course) => {
    return course._doc.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="container">
        {/* <Fade bottom cascade> */}
        <div className="row mt-100">
          {filteredCourses?.map((x) => (
            <div className="col-xl-4 col-lg-4 col-md-4">
              <div key={x._doc.id} className="blog__item-22 mb-50 fix">
                <div className={`blog__thumb-22 w-img fix `}>
                  <Link href={`/program/${x._doc.slug}`}>
                    <img
                      src={x._doc.image?.url}
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
                    <Link href={`/program/${x._doc.slug}`}>{x._doc.title}</Link>
                  </span>
                  <Link href={`/program/${x._doc.slug}`}>
                    <p
                      className="mt-20 text-muted"
                      role="button"
                      // dangerouslySetInnerHTML={{
                      //   __html: x?.plainOverview?.substring(0, 150) + "...",
                      // }}
                    >
                      {x?.plainOverview?.substring(0, 100) + "..."}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* </Fade> */}
      </div>
    </>
  );
};

export default CourseList;

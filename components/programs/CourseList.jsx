import React from "react";
import Link from "next/link";
import CourseCard from "./CourseCard";
import { toImageUrl } from "../../utils/ImageURL";

const CourseList = ({ courses_data, searchQuery }) => {
  const filteredCourses = courses_data.filter((course) => {
    return course._doc.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const DurationsTOHrs = (course) => {
    const hoursPerClass = 1.5;

    const totalCourseHours = course.classes * hoursPerClass;

    return totalCourseHours;
  };

  return (
    <>
      <div className="container">
        <div className="row mt-100">
          {filteredCourses?.map((x) => (
            <React.Fragment key={x._doc.slug}>
              {x._doc.show2 && (
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <CourseCard x={x} />
                </div>

                // <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                //   <div className="blog__item-2 mb-50 fix">
                //     <div className={`blog__thumb-2 w-img fix `}>
                //       <Link href={`/program/${x._doc.slug}`}>
                //         {x._doc.image?.url?.includes("courseImages") ? (
                //           <img src={toImageUrl(x._doc.image?.url)} alt="" style={{ height: "250px" }} />
                //         ) : (
                //           <img src={x._doc.image?.url} alt="" style={{ height: "250px" }} />
                //         )}
                //       </Link>
                //     </div>

                //     <div className="blog__content-2">
                //       <span
                //         style={{
                //           fontWeight: "bold",
                //           fontSize: "20px",
                //         }}
                //       >
                //         <Link href={`/program/${x._doc.slug}`}>{x._doc.title}</Link>
                //       </span>
                //       <p className="mt-4">{x.plainOverview.substring(0, 130)}...</p>
                //     </div>
                //   </div>
                // </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;

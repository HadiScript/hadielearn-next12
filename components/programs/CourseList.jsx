import React from "react";
import Link from "next/link";
import CourseCard from "./CourseCard";
import { toImageUrl } from "../../utils/ImageURL";

const CourseList = ({ courses_data, searchQuery }) => {
  const filteredCourses = courses_data.filter((course) => {
    return course?.title?.toLowerCase().includes(searchQuery.toLowerCase());
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
            <React.Fragment key={x.slug}>
              {x.show2 && (
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <CourseCard x={x} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;

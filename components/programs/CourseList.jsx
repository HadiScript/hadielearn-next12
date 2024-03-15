import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Select } from "antd";

const CourseList = ({ courses_data, searchQuery }) => {
  const [sortBy, setSortBy] = useState('all')
  const [filteredCourses, setfilteredCourses] = useState(courses_data)

  useEffect(() => {
    setfilteredCourses(courses_data.filter((course) => {
      return course?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    }))
  }, [searchQuery])



  useEffect(() => {
    if (sortBy === 'free') {
      setfilteredCourses(courses_data.filter(x => x.regFee == 0))
    } else if (sortBy === 'paid') {
      setfilteredCourses(courses_data.filter(x => x.regFee > 0))
    } else {
      setfilteredCourses(courses_data)
    }
  }, [sortBy])


  return (
    <>
      {/* {JSON.stringify(filteredCourses)} */}
      <div className="container">
        <div className="row mt-100">
          <div className="d-flex justify-content-end mb-3">
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={v => setSortBy(v)}
              options={[
                { value: 'all', label: 'All' },
                { value: 'free', label: 'Free' },
                { value: 'paid', label: 'Paid' },
              ]}
            />
          </div>
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

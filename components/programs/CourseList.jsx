import React from "react";
import Link from "next/link";
import { Card, Col, Rate, Row, Tag } from "antd";
import { FaUser } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const checkStringTitle = (title) => {
  if (title?.length > 23) {
    return title.substring(0, 23) + "...";
  } else {
    return title;
  }
};

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
        {/* <Fade bottom cascade> */}
        <div className="row mt-100">
          {filteredCourses?.map((x) => (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
              <Card
                cover={
                  <img
                    alt={x._doc.title}
                    src={x._doc.image?.url}
                    height={200}
                  />
                }
                actions={[
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginLeft: "20px",
                    }}
                  >
                    {x._doc.instructor && !x._doc.instructor?.image ? (
                      <FaUser size={25} color="gray" />
                    ) : (
                      <img
                        src={x._doc.instructor?.image.url}
                        alt=""
                        height={30}
                      />
                    )}
                    <span style={{ color: "#0f3f5d", fontWeight: "500" }}>
                      {" "}
                      {x._doc.instructor.name}
                    </span>
                  </div>,
                  <span style={{ fontWeight: "bold", color: "#0f3f5d" }}>
                    Free
                  </span>,
                ]}
              >
                <div className="d-flex align-items-center gap-2 mb-3">
                  <small>4.5</small>
                  <Rate
                    value={4.5}
                    style={{ color: "#0f3f5d", fontSize: "10px" }}
                  />
                </div>
                <Link href={`/program/${x._doc.slug}`}>
                  <h3 style={{ fontSize: "22px" }} role="button">
                    {checkStringTitle(x._doc.title)}
                  </h3>
                </Link>
                <div
                  className={`mt-3  d-flex align-items-center justify-content-between `}
                >
                  <div className="d-flex align-items-center gap-1">
                    <IoMdTime size={18} />
                    <small style={{ fontSize: "13px" }}>
                      {x._doc.duration}
                    </small>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <IoMdTime size={18} />
                    <small style={{ fontSize: "13px" }}>
                      {x._doc.classes} classes
                    </small>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <IoMdTime size={18} />
                    <small style={{ fontSize: "13px" }}>
                      {DurationsTOHrs(x._doc)} hrs
                    </small>
                  </div>
                </div>
              </Card>
            </div>

            // <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
            //   <div key={x._doc.id} className="blog__item-22 mb-50 fix">
            //     <div className={`blog__thumb-22 w-img fix `}>
            //       <Link href={`/program/${x._doc.slug}`}>
            //         <img
            //           src={x._doc.image?.url}
            //           alt=""
            //           style={{ height: "250px" }}
            //         />
            //       </Link>
            //     </div>

            //     <div className="blog__content-2">
            //       <div className="mt-1 mb-2 d-flex align-items-center gap-3">
            // <Rate
            //   value={3}
            //   style={{ color: "#0f3f5d", fontSize: "10px" }}
            // />
            //         <small>(2/200)</small>
            //       </div>
            //       <span
            //         style={{
            //           fontWeight: "bold",
            //           fontSize: "20px",
            //         }}
            //       >
            //         <Link href={`/program/${x._doc.slug}`}>{x._doc.title}</Link>
            //       </span>

            // <div
            //   className={`${
            //     x._doc.title.length > 35 ? "mt-2" : "mt-4"
            //   }  d-flex align-items-center justify-content-between `}
            // >
            //   <div className="d-flex align-items-center gap-1">
            //     <IoMdTime size={18} />
            //     <small style={{ fontSize: "10px" }}>
            //       {x._doc.duration}
            //     </small>
            //   </div>
            //   <div className="d-flex align-items-center gap-1">
            //     <IoMdTime size={18} />
            //     <small style={{ fontSize: "10px" }}>40 classes</small>
            //   </div>
            //   <div className="d-flex align-items-center gap-1">
            //     <IoMdTime size={18} />
            //     <small style={{ fontSize: "10px" }}>102 hrs</small>
            //   </div>
            // </div>

            //       <div
            //         style={{
            //           borderTop: "1px solid #8080808c",
            //           display: "flex",
            //           justifyContent: "space-between",
            //           alignItems: "center",
            //         }}
            //         className="pt-2 mt-3"
            //       >
            //         <div className="d-flex align-items-center gap-2">
            // {x._doc.instructor && !x._doc.instructor?.image ? (
            //   <FaUser size={25} color="gray" />
            // ) : (
            //   <img
            //     src={x._doc.instructor?.image.url}
            //     alt=""
            //     height={30}
            //   />
            // )}
            //           <span>{x._doc.instructor.name}</span>
            //         </div>
            //         <span style={{ fontWeight: "bold", color: "#0f3f5d" }}>
            //           Free
            //         </span>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
        {/* </Fade> */}
      </div>
    </>
  );
};

export default CourseList;

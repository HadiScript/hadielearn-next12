import React from "react";
import Link from "next/link";

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
                  <p className="mt-4">{x.plainOverview.substring(0, 130)}...</p>
                </div>
              </div>
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

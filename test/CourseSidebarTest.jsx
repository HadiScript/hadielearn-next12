import Link from "next/link";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

const CourseSidebarTest = ({ course }) => {
  console.log(course, "from sidebar");
  return (
    <>
      <div className="col-xl-4 col-lg-4 ">
        <div className="blog__sidebar">
          <div className="blog__author mb-50">
            <h3>Instructor</h3>
            <br />
            <div className="d-flex align-items-start gap-3">
              {course && !course.instructor?.image ? <FaUser size={50} color="gray" /> : <img src={course?.instructor?.image.url} alt="" height={100} />}
              <div>
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>{course?.instructor?.name}</span>
                <br />
                <small style={{ fontSize: "14px" }}>{course?.instructor?.status}</small>
                <br />
                <small style={{ fontSize: "14px" }}>{course?.instructor?.exp}</small>
              </div>
            </div>
          </div>

          <div className="sidebar__widget mb-40 ">
            <div className="sidebar__widget-title mb-30">
              <h4>Who this course is for:</h4>
            </div>
            <div className="sidebar__widget-content">
              <div className="cat-link">
                <ul>
                  <li>{course?.courseFor}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sidebar__widget mb-20 ">
            <div className="sidebar__widget-title mb-20">
              <h4>Duration</h4>
              <div className="d-flex align-items-center gap-1 py-1">
                <TbPointFilled size={15} />
                <div className="">{course.duration}</div>
              </div>
            </div>
          </div>

          <div className="sidebar__widget mb-20 ">
            <div className="sidebar__widget-title mb-20">
              <h4>Classes</h4>
              <div className="d-flex align-items-center gap-1 py-1">
                <TbPointFilled size={15} />
                <div className="">{course.classes} online classes</div>
              </div>
            </div>
          </div>

          <div className="sidebar__widget mb-20 ">
            <div className="sidebar__widget-title mb-20">
              <h4>Schedule</h4>

              <ul class="list-group list-group-flush">
                {course?.days?.map((x, index) => (
                  <li class="list-group-item d-flex align-items-center gap-1" key={index}>
                    <BiCheck size={25} />{" "}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // alignItems : "center",
                        marginTop: "15px",
                        width: "100%",
                      }}
                    >
                      <p>{x}</p>
                      <p>{course.timming}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {course.startingFrom && (
            <div className="sidebar__widget mb-30 ">
              <div className="sidebar__widget-title mb-30">
                <h4>Starting From</h4>
              </div>
              <div className="sidebar__widget-content">
                <div className="cat-link">
                  <ul>
                    <li>{course.startingFrom}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <div className="sidebar__widget mb-30 ">
            <div className="sidebar__widget-title mb-30">
              <h4>Registeration Fee</h4>
            </div>
            <div className="sidebar__widget-content">
              <div className="cat-link">
                <ul>
                  <li>{course.regFee}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sidebar__widget mb-30 ">
            <div className="sidebar__widget-title mb-30">
              <h4>Course Fee</h4>
            </div>
            <div className="sidebar__widget-content">
              <div className="cat-link">
                <ul>
                  <li>{course.courseFee}</li>
                </ul>
              </div>
            </div>
          </div>

          <Link href={"/enroll/program"}>
            <button className="z-btn z-btn-3 w-50">Enroll now</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CourseSidebarTest;

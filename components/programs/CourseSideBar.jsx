import Link from "next/link";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

const CourseSideBar = ({ course }) => {
  return (
    <>
      <div className="col-xl-4 col-lg-4 ">
        <div className="blog__sidebar">
          <div className="blog__author mb-50">
            <h3>Instructor</h3>
            <br />
            <div className="d-flex align-items-start gap-3">
              {course &&   !course.author.userImg ? (
                <FaUser size={50} color="gray" />
              ) : (
                <img
                  src={`/assets/images/profile_workshop/${course?.author.userImg}.jpg`}
                  alt=""
                  height={100}
                />
              )}
              <div>
                <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {course.author.name}
                </span>
                <br />
                <small style={{ fontSize: "14px" }}>
                  {course.author.working}
                </small>
                <br />
                <small style={{ fontSize: "16px" }}>
                  {course.author.userExp}
                </small>
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
                  <li>{course.thisCourseIsFor}</li>
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
                {course.days.map((x, index) => (
                  <li
                    class="list-group-item d-flex align-items-center gap-1"
                    key={index}
                  >
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
                  <li>5000 PKR</li>
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
                  <li>0 PKR</li>
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

export default CourseSideBar;

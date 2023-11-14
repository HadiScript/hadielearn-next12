import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Card, Rate } from "antd";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsCalendar } from "react-icons/bs";
import Link from "next/link";

const checkStringTitle = (title) => {
  if (title?.length > 25) {
    return title.substring(0, 25) + "...";
  } else {
    return title;
  }
};

const CourseCard = ({ x }) => {
  return (
    <>
      {/* {JSON.stringify(x._doc)} */}
      <Card
        cover={<img alt={x._doc.title} src={x._doc.image?.url} height={240} />}
        actions={[
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginLeft: "20px",
            }}
          >
            {x._doc.instructor && !x._doc.instructor?.image ? <FaUser size={25} color="gray" /> : <img src={x._doc.instructor?.image.url} alt="" height={30} />}
            <span
              style={{
                color: "#0f3f5d",
                fontWeight: "500",
                marginLeft: "10px",
              }}
            >
              {x._doc.instructor?.name}
            </span>
          </div>,
          <span style={{ fontWeight: "bold", color: "#0f3f5d" }}>Free</span>,
        ]}
      >
        <div className="d-flex align-items-center gap-2 mb-3">
          <Rate value={4.5} style={{ color: "#0f3f5d", fontSize: "10px" }} />
          <small style={{ fontWeight: "bold" }}>4.5</small>
        </div>
        <Link href={`/program/${x._doc.slug}`}>
          <h3 style={{ fontSize: "22px" }} role="button">
            {checkStringTitle(x._doc.title)}
          </h3>
        </Link>
        <div className={`mt-3  d-flex align-items-center justify-content-between `}>
          <div className="d-flex align-items-center gap-1">
            <BsCalendar size={15} />
            <small style={{ fontSize: "15px" }}>{x._doc.duration}</small>
          </div>
          <div className="d-flex align-items-center gap-1">
            <HiOutlineDocumentText size={18} />
            <small style={{ fontSize: "15px" }}>{x._doc.classes} classes</small>
          </div>
          <div className="d-flex align-items-center gap-1">
            <IoMdTime size={18} />
            <small style={{ fontSize: "15px" }}>243 hrs</small>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CourseCard;

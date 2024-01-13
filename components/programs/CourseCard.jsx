import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Card, Rate } from "antd";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsCalendar } from "react-icons/bs";
import Link from "next/link";
import { toImageUrl } from "../../utils/ImageURL";
import { useRouter } from "next/router";

const checkStringTitle = (title) => {
  if (title?.length > 25) {
    return title.substring(0, 25) + "...";
  } else {
    return title;
  }
};

const CourseCard = ({ x }) => {
  const router = useRouter();
  const DurationsTOHrs = (classes) => {
    const hoursPerClass = 1.5;

    const totalCourseHours = classes * hoursPerClass;

    return totalCourseHours;
  };

  const giveSomeRates = (course) => {
    return course.includes("React")
      ? 5
      : course.includes("MERN")
      ? 4.5
      : course.includes("SEO")
      ? 4.8
      : course.includes("Shopify")
      ? 4.6
      : course.includes("Content")
      ? 4.7
      : course.includes("Designing")
      ? 5
      : 4.5;
  };

  return (
    <>
      <Card
        role="button"
        onClick={() => router.push(`/program/${x.slug}`)}
        cover={<>{x.image?.url?.includes("courseImages") ? <img src={toImageUrl(x.image?.url)} alt="" height={240} /> : <img src={x.image?.url} alt="" height={240} />}</>}
        actions={[
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginLeft: "20px",
            }}
          >
            {x.instructor && !x.instructor?.image ? <FaUser size={25} color="gray" /> : <img src={x.instructor?.image.url} alt="" height={30} />}
            <span
              style={{
                color: "#0f3f5d",
                fontWeight: "500",
                marginLeft: "10px",
              }}
            >
              {x.instructor?.name}
            </span>
          </div>,
          <span style={{ fontWeight: "bold", color: "#0f3f5d" }}>Free</span>,
        ]}
      >
        <div className="d-flex align-items-center gap-2 mb-3">
          <Rate value={giveSomeRates(x.title)} style={{ color: "#0f3f5d", fontSize: "10px" }} />
          <small style={{ fontWeight: "bold" }}>{giveSomeRates(x.title)}</small>
        </div>
        <Link href={`/program/${x.slug}`}>
          <h3 style={{ fontSize: "22px" }} role="button">
            {checkStringTitle(x.title)}
          </h3>
        </Link>
        <div className={`mt-3  d-flex align-items-center justify-content-between `}>
          <div className="d-flex align-items-center gap-1">
            <BsCalendar size={15} />
            <small style={{ fontSize: "15px" }}>{x.duration}</small>
          </div>
          <div className="d-flex align-items-center gap-1">
            <HiOutlineDocumentText size={18} />
            <small style={{ fontSize: "15px" }}>{x.classes} classes</small>
          </div>
          <div className="d-flex align-items-center gap-1">
            <IoMdTime size={18} />
            <small style={{ fontSize: "15px" }}>{DurationsTOHrs(x.classes)} hrs</small>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CourseCard;

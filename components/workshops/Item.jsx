import Link from "next/link";
import React from "react";
import { CgArrowLongRight } from "react-icons/cg";

const Item = ({
  image,
  title,
  heading,
  content,
  outlines,
  slug,
  user_image,
  name,
  dateAndTime,
  userExp,
}) => {
  const givenDateAndTime = new Date(dateAndTime);

  const formattedDate = givenDateAndTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = givenDateAndTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return (
    <>
      <div className="blog__item-3 mb-50 fix">
        <div className={`blog__thumb-3 w-img fix `}>
          <Link href={`/workshop-detail/${slug} `}>
            <img src={`/assets/images/workshop/${image}.jpg`} alt="" />
          </Link>
        </div>
        <div className="blog__content-2">
          <div className="blog__meta-2 mb-15 d-sm-flex align-items-center">
            <div className="d-flex align-items-center  pr-20 mr-20">
              <Link href={`/workshop-detail/${slug} `}>
                <img
                  className="pr-10"
                  src={`/assets/images/profile_workshop/${user_image}.jpg`}
                  alt=""
                  height={80}
                />
              </Link>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {name}
                </span>
                <br />
                <small style={{ fontSize: "14px" }}>{userExp}</small>
                <br />
                <small style={{ fontSize: "14px" }}>
                  {formattedDate} | {formattedTime}
                </small>
              </div>
            </div>
          </div>
          <br />

          <h3>
            <Link href={`/workshop-detail/${slug} `}>{title}</Link>
          </h3>
          <p>{content.substring(0, 150)}...</p>
          <div className="blog__btn d-sm-flex justify-content-between">
            <div className="blog__btn">
              <Link href={`/workshop-detail/${slug} `}>
                <span className="link-btn-2">
                  Read More
                  <i>
                    {" "}
                    <CgArrowLongRight />{" "}
                  </i>
                  <i>
                    {" "}
                    <CgArrowLongRight />{" "}
                  </i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;

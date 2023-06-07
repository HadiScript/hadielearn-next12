import React from "react";
import Link from "next/link";
import { CgArrowLongRight } from "react-icons/cg";

const CourseItem = ({ title, overview, slug, image, author }) => {
  return (
    <>
      <div className="blog__item-3 mb-50 fix">
        <div className={`blog__thumb-3 w-img fix `}>
          {/* <Link href={`/program/${slug} `}> */}
            <img src={`${image}`} alt="" />
          {/* </Link> */}
        </div>
        <div className="blog__content-2">
          <div className="blog__meta-2 mb-15 d-sm-flex align-items-center">
            <div className="d-flex align-items-center  pr-20 mr-20">
              {/* <Link to={`/program/${slug}`} className="pr-10"> */}
                <img
                  src={`/assets/images/profile_workshop/${author.userImg}.jpg`}
                  alt=""
                  height={80}
                  className="pr-10"
                />
              {/* </Link> */}
              <div>
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {author.name}
                </span>
                <br />
                <small style={{ fontSize: "14px" }}>{author.working}</small>
                <br />
                <small style={{ fontSize: "14px" }}>{author.userExp}</small>
              </div>
            </div>
          </div>
          <br />

          <h3>
            <Link href={`/program/${slug} `}>{title}</Link>
          </h3>
          <p>{overview.substring(0, 80)}...</p>
          <div className="blog__btn d-sm-flex justify-content-between">
            <div className="blog__btn">
              <Link href={`/program/${slug} `}>
                <span className="link-btn-2">
                  Read More
                  <i>
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

export default CourseItem;

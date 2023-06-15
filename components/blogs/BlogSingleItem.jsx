import React from "react";
import Link from "next/link";

// icons
import { FaRegComments } from "react-icons/fa";
import { CgArrowLongRight, CgEye } from "react-icons/cg";

const BlogSingleItem = ({
  image,
  user_image,
  name,
  title,
  video_icon,
  viewCount,
  description,
  slug
}) => {
  return (
    <>
      {/* _blogs style -2 style height as auto */}
      <div className="blog__item-2 mb-50 fix">
        <div
          className={`blog__thumb-2 w-img fix ${video_icon && "p-relative"}`}
        >
          <Link href={`/blog/${slug}`}>
            <img src={image} alt="blog-image" />
          </Link>
          {video_icon && video_icon}
        </div>
        <div className="blog__content-2">
          <div className="blog__meta-2 mb-15 d-sm-flex align-items-center">
            <div className="blog__user pr-20 mr-20">
              <Link href={`/blog/${slug}`}>
                <>
                  <img src={user_image} alt="author image" height={"50px"} />
                  <h6>{name}</h6>
                </>
              </Link>
            </div>
            <div className="blog__date">
              <span>23 Jan 2022</span>
            </div>
          </div>
          <h3>
            <Link href={`/blog/${slug}`}><>{title}</></Link>
          </h3>
          <p>{description.substring(0,150)} ...</p>
          <div className="blog__btn d-sm-flex justify-content-between">
            <div className="blog__btn">
              <Link href={`/blog/${slug}`} className="link-btn-2">
                <>
                  Read More
                  <i>
                    {" "}
                    <CgArrowLongRight />{" "}
                  </i>
                </>
              </Link>
            </div>
            <div className="blog__comment">
              <Link href={`/blog/${slug}`}>
                <small>View {viewCount} </small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogSingleItem;

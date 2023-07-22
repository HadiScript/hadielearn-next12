import React from "react";
import Link from "next/link";
import BlogLeftSideBar from "./BlogLeftSideBar";
import BlogSingleItem from "./BlogSingleItem";

// icons
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { FiPlay } from "react-icons/fi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import moment from "moment/moment";

const BlogArea = ({
  allBlogs,
  RecentBlogs,
  Categories,
  page,
  setPage,
  Router,
  total,
  loading,
  handleSearch,
  searchQuery,
  setSearchQuery,
  mostViewed,
  whichPage,
}) => {
  return (
    <>
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__wrapper mr-50">
                {allBlogs.length === 0 && <h2> Empty: </h2>}
                {allBlogs?.map((x) => (
                  <article key={x._id} className="postcard light green">
                    <Link
                      className="postcard__img_link"
                      href={`/blog/${x.slug}`}
                    >
                      <img
                        className="postcard__img"
                        src={x?.image?.url}
                        alt="Image Title"
                      />
                    </Link>
                    <div className="postcard__text t-dark">
                      <Link href={`/blog/${x.slug}`}>
                        <h1 className="postcard__title green">
                          <a href="#">{x?.title}</a>
                        </h1>
                      </Link>
                      <div className="postcard__subtitle small">
                        <time datetime="2020-05-25 12:00:00">
                          <i
                            style={{ color: "#0f3f5d" }}
                            className="fas fa-calendar-alt mr-2"
                          ></i>{" "}
                          {moment(x.createdAt).fromNow()}
                        </time>
                      </div>
                      <div className="postcard__bar"></div>
                      <Link href={`/blog/${x.slug}`}>
                        <div className="postcard__preview-txt">
                          {x.description.substring(0, 100)}...
                        </div>
                      </Link>
                      {/* <ul className="postcard__tagbox">
                        <li className="tag__item">
                          <i className="fas fa-tag mr-2"></i>Podcast
                        </li>
                        <li className="tag__item">
                          <i className="fas fa-clock mr-2"></i>55 mins.
                        </li>
                        <li className="tag__item play green">
                          <a href="#">
                            <i className="fas fa-play mr-2"></i>Play Episode
                          </a>
                        </li>
                      </ul> */}
                    </div>
                  </article>
                ))}
              </div>
              {whichPage === "blogs" && (
                <>
                  {allBlogs?.length < total && (
                    <div className="text-start">
                      <button
                        className="z-btn"
                        onClick={() => {
                          setPage(page + 1);
                          Router.push({
                            pathname: "/blogs",
                            query: { page: page + 1 },
                          });
                        }}
                      >
                        {loading ? "loading..." : " Load More"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            <BlogLeftSideBar
              handleSearch={handleSearch}
              loading={loading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              RecentBlogs={RecentBlogs}
              Categories={Categories}
              mostViewed={mostViewed}
              page={"allBlogs"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogArea;

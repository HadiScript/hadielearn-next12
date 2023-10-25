import React from "react";
import Link from "next/link";
import BlogLeftSideBar from "./BlogLeftSideBar";
import BlogSingleItem from "./BlogSingleItem";

// icons
import { BiBookOpen } from "react-icons/bi";
import moment from "moment/moment";
import { toImageUrl } from "../../utils/ImageURL";

const BlogArea = ({ allBlogs, RecentBlogs, Categories, page, setPage, Router, total, loading, handleSearch, searchQuery, setSearchQuery, mostViewed, whichPage }) => {
  return (
    <>
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__wrapper mr-50">
                {allBlogs.length === 0 && <h2> Empty: </h2>}

                {allBlogs?.map((x) => (
                  <div key={x._id} className="card">
                    <Link className="postcard__img_link" href={`/blog/${x.slug}`}>
                      {x.image?.url?.includes("blogImages") ? (
                        <img className="card__image" src={toImageUrl(x.image?.url)} alt="workshop_image" />
                      ) : (
                        <img className="card__image" src={x.image?.url} alt="workshop_image" />
                      )}
                      {/* <img role="button" src={x?.image?.url} className="card__image" alt="Blog Image" /> */}
                    </Link>
                    <div className="card__content">
                      <Link className="postcard__img_link" href={`/blog/${x.slug}`}>
                        <h2 role="button" className="card__content-title">
                          {x?.title}
                        </h2>
                      </Link>
                      <Link className="postcard__img_link" href={`/blog/${x.slug}`}>
                        <p role="button" className="card__content-description">
                          {x.description.substring(0, 120)}...
                        </p>
                      </Link>
                      <div className="card__content-meta">
                        <p className="card__content-meta-views">
                          <b style={{ color: "#0f3f5d" }}>
                            <span className="mx-1"> {x.viewCount}</span>
                            <span>views</span>
                          </b>
                        </p>
                        <p className="card__content-meta-date">
                          <time datetime="2020-05-25 12:00:00">
                            <i style={{ color: "#0f3f5d" }} className="fas fa-calendar-alt mr-2"></i> {moment(x.createdAt).fromNow()}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* {allBlogs?.map((x) => (
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
                        <h5 className="postcard__title green">
                          <a href="#">{x?.title}</a>
                        </h5>
                      </Link>
                      <div className="d-flex justify-content-between  postcard__subtitle small">
                        <time datetime="2020-05-25 12:00:00">
                          <i
                            style={{ color: "#0f3f5d" }}
                            className="fas fa-calendar-alt mr-2"
                          ></i>{" "}
                          {moment(x.createdAt).fromNow()}
                        </time>
                        <b style={{ color: "#0f3f5d" }}>
                          <span className="mx-1"> {x.viewCount}</span>
                          <span>views</span>
                        </b>
                      </div>
                      <div className="postcard__bar"></div>
                      <Link href={`/blog/${x.slug}`}>
                        <div className="postcard__preview-txt">
                          {x.description.substring(0, 150)}...
                        </div>
                      </Link>
                    </div>
                  </article>
                ))} */}
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

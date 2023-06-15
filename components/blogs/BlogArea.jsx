import React from "react";
import Link from "next/link";
import BlogLeftSideBar from "./BlogLeftSideBar";
import BlogSingleItem from "./BlogSingleItem";

// icons
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { FiPlay } from "react-icons/fi";
import { IoEllipsisHorizontal } from "react-icons/io5";

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
                  <React.Fragment key={x._id}>
                    <BlogSingleItem
                      image={x?.image?.url}
                      user_image={x?.postedBy?.image?.url}
                      name={x?.postedBy?.name}
                      title={x?.title}
                      viewCount={x?.viewCount}
                      description={x?.description}
                      slug={x?.slug}
                    />
                  </React.Fragment>
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
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              RecentBlogs={RecentBlogs}
              Categories={Categories}
              mostViewed={mostViewed}
              loading={loading}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogArea;

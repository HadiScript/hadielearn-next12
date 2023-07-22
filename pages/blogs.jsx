import React, { useEffect, useState } from "react";
import Tops from "../components/functions/Tops";
import axios, { all } from "axios";
import Footer from "../components/partials/Footer";
import BlogArea from "../components/blogs/BlogArea";
import Router, { useRouter } from "next/router";
import { API } from "../config/API";
import NewBlogArea from "../components/blogs/NewBlogArea";

const blogs = ({ blogs, recentBlogs, categories, mostView }) => {
  const router = useRouter();

  const [allBlogs, setAllBlogs] = useState(blogs);
  const [RecentBlogs] = useState(recentBlogs);
  const [Categories] = useState(categories);
  const [mostViewed] = useState(mostView);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(Number(router?.query?.page) || 1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    getTotal();
  }, []);

  const loadMore = async () => {
    try {
      setLoading(true);
      console.log("running searching2");
      const { data } = await axios.get(
        `${API}/blogs/${page}?search=${searchQuery}`
      );
      if (searchQuery) {
        setAllBlogs([...data.blogs, ...allBlogs]);
      } else {
        setAllBlogs([...allBlogs, ...data.blogs]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();

    console.log("running searching");
    // Reset page number when performing a new search
    setPage(1);
    // Trigger loading more blogs with the updated search query
    loadMore();
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${API}/blog-count`);
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Tops
        headTitle={"Some interesting blogs to know more about Hadi E-learning."}
        headDesc={
          "Meta description: Interesting blogs to explore more about Hadi E-learning and all the courses Hadi is offering to you. "
        }
        conLink={`https://hadielearning.com/blogs`}
        breadTitle={"Blogs"}
        breadSubTtile={
          "All blogs"
          //   findedCourse?.bread ? findedCourse?.bread : findedCourse?.title
        }
        image={"/assets/images/bread.jpg"}
      />

      {/* <BlogArea
        allBlogs={allBlogs}
        RecentBlogs={RecentBlogs}
        Categories={categories}
        page={page}
        setPage={setPage}
        Router={Router}
        total={total}
        loading={loading}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mostViewed={mostView}
        whichPage={"blogs"}
      /> */}

      {/* <NewBlogArea blogs_data={allBlogs} /> */}

      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/blogs/1`);

  return {
    props: {
      blogs: data.blogs,
      recentBlogs: data.recentBlogs,
      categories: data.categories,
      mostView: data.mostView,
    },
  };
}

export default blogs;

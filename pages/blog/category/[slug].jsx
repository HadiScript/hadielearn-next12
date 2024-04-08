import React, { useState } from "react";
import Tops from "../../../components/functions/Tops";
import Footer from "../../../components/partials/Footer";
import axios from "axios";
import BlogArea from "../../../components/blogs/BlogArea";
import { API } from "../../../config/API";

const BlogByCategory = ({
  blogs,
  recentBlogs,
  categories,
  mostView,
  category,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadMore = async () => {
    try {
      setLoading(true);
      console.log("running searching2");
      const { data } = await axios.get(
        `${API}/blog-by-category/${category?.slug}?search=${searchQuery}`
      );
      setAllBlogs([...data.blogs, ...allBlogs]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    loadMore();
  };

  return (
    <>
      <Tops
        headTitle={"Explore amazing courses by Hadi E-Learning."}
        headDesc={"Explore some of the best courses offered by hadi E-learning and pick the best one of your choice. "}
        conLink={`https://hadielearning.com/blogs`}
        breadTitle={category?.name}
        breadSubTtile={`${category?.name} `}
        image={"/assets/images/bread.jpg"}
      />

      <BlogArea
        allBlogs={blogs}
        RecentBlogs={recentBlogs}
        Categories={categories}
        loading={loading}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mostViewed={mostView}
        whichPage={"blog-by-category"}
        category={category}
      />
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${API}/blog-by-category/${params.slug}`);
  return {
    props: {
      blogs: data.blogs,
      recentBlogs: data.recentBlogs,
      categories: data.categories,
      mostView: data.mostView,
      category: data.category,
    },
  };
}

export default BlogByCategory;

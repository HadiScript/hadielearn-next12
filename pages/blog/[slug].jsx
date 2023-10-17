import axios from "axios";
import React, { useEffect } from "react";
import Tops from "../../components/functions/Tops";
import Footer from "../../components/partials/Footer";
import BlogItemDetail from "../../components/blogs/BlogItemDetail";
import { API } from "../../config/API";

const BlogDetail = ({ blog, categories, recentBlogs, mostView }) => {
  const viewCount = async (x) => {
    try {
      const dataFrom = await axios.get(`${API}/view-count/${x}`);
      console.log(dataFrom);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (blog) viewCount(blog.slug);
  }, [blog]);

  return (
    <>
      <Tops
        headTitle={blog?.seoTitle ? blog?.seoTitle : "Read this blog to explore more about Hadi E-learning"}
        headDesc={blog?.metaDescription ? blog?.metaDescription : "Here is a blog to have insightful knowledge of Hadi E-learning and the various courses it is offering to you."}
        conLink={`https://hadielearning.com/blogs`}
        breadTitle={blog?.title}
        breadSubTtile={blog?.title}
        image={"/assets/images/bread.jpg"}
      />
      <BlogItemDetail blog={blog} categories={categories} recentBlogs={recentBlogs} mostView={mostView} />

      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${API}/blog/${params.slug}`);

  return {
    props: {
      blog: data.blog,
      categories: data.categories,
      recentBlogs: data.recentBlogs,
      mostView: data.mostView,
    },
  };
}

export default BlogDetail;

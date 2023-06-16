import axios from "axios";
import React, { useEffect } from "react";
import Tops from "../../components/functions/Tops";
import Footer from "../../components/partials/Footer";
import BlogItemDetail from "../../components/blogs/BlogItemDetail";

const BlogDetail = ({ blog, categories, recentBlogs, mostView }) => {
  const viewCount = async (x) => {
    try {
      const dataFrom = await axios.get(
        `http://localhost:5000/api/view-count/${x}`
      );
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
        headTitle={"all blogs"}
        headDesc={"descriptions"}
        conLink={`https://hadielearning.com/blogs`}
        breadTitle={blog?.title}
        breadSubTtile={blog?.title}
        image={"/assets/images/bread.jpg"}
      />
      <BlogItemDetail
        blog={blog}
        categories={categories}
        recentBlogs={recentBlogs}
        mostView={mostView}
      />

      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`/blog/${params.slug}`);

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

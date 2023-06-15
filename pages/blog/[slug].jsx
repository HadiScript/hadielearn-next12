import axios from "axios";
import React from "react";
import Tops from "../../components/functions/Tops";
import Footer from "../../components/partials/Footer";
import BlogItemDetail from "../../components/blogs/BlogItemDetail";

const BlogDetail = ({ blog, categories }) => {
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

      <BlogItemDetail />

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
    },
  };
}

export default BlogDetail;

import React, { useEffect, useState } from "react";
import Tops from "../components/functions/Tops";
import axios, { all } from "axios";
import Footer from "../components/partials/Footer";
import BlogArea from "../components/blogs/BlogArea";
import Router, { useRouter } from "next/router";

const blogs = ({ blogs, recentBlogs, categories, mostView }) => {
  // const router = useRouter();

  // const [allBlogs, setAllBlogs] = useState(blogs);
  // const [RecentBlogs] = useState(recentBlogs);
  // const [Categories] = useState(categories);
  // const [mostViewed] = useState(mostView);

  // const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(Number(router?.query?.page) || 1);
  // const [loading, setLoading] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   if (page === 1) return;
  //   loadMore();
  // }, [page]);

  // useEffect(() => {
  //   getTotal();
  // }, []);

  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     console.log("running searching2");
  //     const { data } = await axios.get(`/blogs/${page}?search=${searchQuery}`);
  //     if (searchQuery) {
  //       setAllBlogs([...data.blogs, ...allBlogs]);
  //     } else {
  //       setAllBlogs([...allBlogs, ...data.blogs]);
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };

  // const handleSearch = (event) => {
  //   event.preventDefault();

  //   console.log("running searching");
  //   // Reset page number when performing a new search
  //   setPage(1);
  //   // Trigger loading more blogs with the updated search query
  //   loadMore();
  // };

  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get("/blog-count");
  //     setTotal(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Tops
        headTitle={"All blogs"}
        headDesc={"descriptions"}
        conLink={`https://hadielearning.com/blogs`}
        breadTitle={"bread"}
        breadSubTtile={
          "desc"
          //   findedCourse?.bread ? findedCourse?.bread : findedCourse?.title
        }
        image={"/assets/images/bread.jpg"}
      />

     <h2>Comming Soon :)</h2> 

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

      <Footer />
    </>
  );
};

// export async function getServerSideProps() {
//   const { data } = await axios.get(`/blogs/1`);

//   return {
//     props: {
//       blogs: data.blogs,
//       recentBlogs: data.recentBlogs,
//       categories: data.categories,
//       mostView: data.mostView,
//     },
//   };
// }

export default blogs;

import React from "react";
import { useState, createContext } from "react";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blog, setBlog] = useState({
    blogs: [],
    categories: [],
  });

  return (
    <BlogContext.Provider value={[blog, setBlog]}>
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };

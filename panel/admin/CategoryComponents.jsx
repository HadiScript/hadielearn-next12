import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BlogContext } from "../../context/blogContext";
import axios from "axios";
import { API } from "../../config/API";
import { useEffect } from "react";
import { BsTrash } from "react-icons/bs";

const CategoryComponents = () => {
  const [blog, setBlog] = useContext(BlogContext);
  const { categories } = blog;

  const [loading, setLoading] = useState(false);
  //   as name
  const [category, setCategory] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!category) {
      toast.error("Please give it a name");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/category`, { name: category });
      setBlog((prev) => ({
        ...prev,
        categories: [...prev.categories, data],
      }));
      setCategory("");
      setLoading(false);
      toast.success("Category created successfully");
    } catch (err) {
      toast.error("Duplicate error. Try different name.");
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`${API}/categories`);
        console.log(data, "from fetching cats");
        setBlog((prev) => ({ ...prev, categories: data }));
      } catch (err) {
        console.log(err);
      }
    };
    // execute
    getCategories();
  }, []);

  const handleDelete = async (item) => {
    console.log("delete", item);
    try {
      const { data } = await axios.delete(`${API}/category/${item.slug}`);
      // setCategories(categories.filter((cat) => cat.slug !== item.slug));
      setBlog((prev) => ({
        ...prev,
        categories: categories.filter((cat) => cat.slug !== item.slug),
      }));
      toast.success("Category deleted");
    } catch (err) {
      console.log(err);
      toast.error("Category delete falied");
    }
  };

  return (
    <div className="text-center">
      <form onSubmit={submitHandler} >
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="form-group py-2">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="for example: Development"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-1">
            <div className="form-group ">
              <input
                type="submit"
                name="Add"
                className="bg-dark  text-light btn"
              />
            </div>
          </div>
        </div>
      </form>

      {loading && <p> Loading.. </p>}
      {/* {JSON.stringify(categories)} */}
      <br />
      <hr />
      <br />

      <h3>All Categories</h3>
      <div className="container">
        <ul className="list-group list-group-flush">
          {categories?.map((x) => (
            <li
              key={x._id}
              className="list-group-item d-flex justify-content-between align-items-center "
            >
              <h5>{x.name}</h5>
              <BsTrash
                onClick={() => handleDelete(x)}
                color="red"
                style={{ cursor: "pointer" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryComponents;

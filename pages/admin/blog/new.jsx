import React, { useContext, useEffect, useRef } from "react";
import PanelHeader from "../../../panel/common/PanelHeader";
import AdminLayout from "../../../panel/admin/AdminLayout";

import { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";
import { toast } from "react-hot-toast";
import { Select } from "antd";
// import Editor from "rich-markdown-editor";

const initialState = {
  slug: "",
  seoTitle: "",
  metaDescription: "",
  title: "",
  tags: "",
  description: "",
};

// const toolbarOptions = [
//   ["bold", "italic", "underline", "strike"], // toggled buttons
//   ["blockquote", "code-block"],
//   [{ header: 1 }, { header: 2 }], // custom button values
//   [{ list: "ordered" }, { list: "bullet" }],
//   [{ script: "sub" }, { script: "super" }], // superscript/subscript
//   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//   [{ direction: "rtl" }], // text direction
//   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//   [{ font: [] }],
//   [{ align: [] }],
//   ["link"],
//   ["video"], // add video option
//   ["clean"],
// ];

const NewBlogAdd = () => {
  const Editor = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const [formData, setFormData] = useState(initialState);
  const [auth, setAuth] = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [loadCategories, setLoadCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();

    formData.append("image", file);

    const reader = new FileReader();

    const { data } = await axios.post(`${API}/upload-image`, formData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    reader.onload = () => {
      const imageUrl = reader.result;
      setContent((prevContent) => prevContent + `<img src="${data?.url}" alt="uploaded image" />`);
    };

    console.log(content);

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await axios.get(`${API}/categories`);
      setLoadCategories(data);
    };
    fetchCats();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFeaturedImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();

    formData.append("image", file);
    setLoadingImage(true);

    try {
      const { data } = await axios.post(`${API}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setImage({
        url: data.url,
        public_id: data.public_id,
      });

      setLoadingImage(false);
    } catch (error) {
      console.log(error);
      setLoadingImage(false);
    }
  };

  // remove image
  const removeImage = async (public_id) => {
    setLoadingImage(true);

    try {
      const { data } = await axios.post(
        `${API}/deleteImage`,
        {
          filepath: public_id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (data) {
        toast.success("Removed");
        setImage({});
        setLoadingImage(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingImage(false);
    }
  };

  const payloadData = {
    ...formData,
    content,
    image,
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API}/create-blog`,
        {
          title: formData.title,
          content,
          categories,
          description: formData.description,
          image,
          slug: formData.slug,
          metaDescription: formData.metaDescription,
          seoTitle: formData.seoTitle,
          tags: formData.tags,
        },
        {
          headers: {
            Authorization: auth && auth.token && `Bearer ${auth?.token}`,
          },
        }
      );
      // console.log("POST CREATED => ", data);
      if (data?.error) {
        toast.error(data.error, { position: "bottom-center" });
        setLoading(false);
      } else {
        toast.success("Blog created successfully", {
          position: "bottom-center",
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Post create failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <PanelHeader />

      <AdminLayout>
        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1"> Slug Title</h5>
          <input type="text" className="form-control" id="exampleFormControlInput1" name="slug" placeholder="Blog Title" value={formData.slug} onChange={onChange} />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1"> Seo Title</h5>
          <input type="text" className="form-control" id="exampleFormControlInput1" name="seoTitle" placeholder="SEO Title" value={formData.seoTitle} onChange={onChange} />
        </div>
        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Meta Description</h5>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="metaDescription"
            placeholder="Meta Description"
            value={formData.metaDescription}
            onChange={onChange}
          />
        </div>

        <hr />

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Title</h5>
          <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Title" value={formData.title} onChange={onChange} />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Description</h5>
          <textarea
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="description"
            placeholder="Blog Description"
            value={formData.description}
            onChange={onChange}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Featured Image</h5>
          <input
            onChange={handleFeaturedImage}
            type="file"
            accept="images/*"
            // hidden
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        {loadingImage && "loading..."}
        {image && image?.url && (
          <>
            <span className="text-danger" onClick={() => removeImage(image?.public_id)}>
              {" "}
              delete image{" "}
            </span>
            <br />
          </>
        )}
        {image && image?.url && <img width="auto" height={300} src={image?.url} />}

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Content</h5>
          <input type="file" accept="image/*" onChange={handleImage} className="form-control" />
          <br />
          <Editor
            // modules={{ toolbar: toolbarOptions }}
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>

        {/* multiple */}
        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Categories</h5>
          <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select" onChange={(v) => setCategories(v)}>
            {loadCategories.map((item) => (
              <Select.Option key={item.name}>{item.name}</Select.Option>
            ))}
          </Select>
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Poplar Tags</h5>
          <input type="text" className="form-control" placeholder="Tags" name="tags" value={formData.tags} onChange={onChange} />
          <small className="form-text">Please use comma separated values (eg. #TREND,#DESIGNING,#JAVSSCRIPT,#EARNING,#EDUCATION)</small>
        </div>

        <br />
        <button className="z-btn" onClick={submitForm}>
          {loading ? "loading..." : "Submit"}
        </button>
      </AdminLayout>
    </>
  );
};

export default NewBlogAdd;

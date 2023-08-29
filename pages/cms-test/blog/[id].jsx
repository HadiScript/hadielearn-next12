import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Card, Select } from "antd";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import { toast } from "react-hot-toast";
import Btn from "../../../components/ui/Btn";
import CMSLayout from "../../../panel/newCMS/layouts";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";

const initialState = {
  slug: "",
  seoTitle: "",
  metaDescription: "",
  title: "",
  tags: "",
  description: "",
};

const EditBlog = () => {
  const Editor = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const router = useRouter();
  const { id } = router.query;

  //   context
  const [auth] = useContext(AuthContext);

  //   states
  const [singleLoading, setSingleLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [content, setcontent] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadCategories, setLoadCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await axios.get(`${API}/categories`);
      setLoadCategories(data);
    };
    fetchCats();
  }, []);

  const fetchSingleBlog = async () => {
    try {
      setSingleLoading(true);

      console.log("single blog");

      const { data } = await axios.get(`${API}/admin/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        title: data?.title,
      }));

      setFormData((prevFormData) => ({
        ...prevFormData,
        description: data?.description,
      }));

      setFormData((prevFormData) => ({
        ...prevFormData,
        seoTitle: data?.seoTitle,
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        metaDescription: data?.metaDescription,
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        slug: data?.slug,
      }));

      if (Array.isArray(data?.tags))
        setFormData((prevFormData) => ({
          ...prevFormData,
          tags: data?.tags.join(", "),
        }));

      let arr = [];
      data.categories.map((c) => arr.push(c.name));
      setCategories(arr);

      setImage(data?.image);
      setcontent(data?.content);

      setSingleLoading(false);
    } catch (error) {
      setSingleLoading(false);
      console.log(error);
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (auth && auth.token && id) fetchSingleBlog();
  }, [auth && auth.token && id]);

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
      setcontent(
        (prevContent) =>
          prevContent + `<img src="${data?.url}" alt="uploaded image" />`
      );
    };

    reader.readAsDataURL(file);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API}/blog/${id}`,
        {
          title: formData.title,
          content,
          categories,
          image,
          slug: formData.slug,
          metaDescription: formData.metaDescription,
          seoTitle: formData.seoTitle,
          tags: formData.tags,
          description: formData.description,
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
        toast.success("Done", {
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

  const removeImage = async (public_id) => {
    try {
      setImageLoading(true);

      const { data } = await axios.post(
        `${API}/delete-blog-image/${id}`,
        {
          filepath: public_id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.ok) {
        toast.success("Image is removed");
        setImage({});
        setImageLoading(false);
      }
    } catch (error) {
      setImageLoading(false);
      console.log("error");
      toast.error("Try again, failed");
    }
  };

  return (
    <>
      <CMSLayout>
        <Card>
          {singleLoading && <p>loading...</p>}
          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1"> Slug Title</h5>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="slug"
              placeholder="Blog Title"
              value={formData.slug}
              readOnly
              // onChange={onChange}
            />
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
            <h5 for="exampleFormControlInput1"> Seo Title</h5>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="seoTitle"
              placeholder="SEO Title"
              value={formData.seoTitle}
              onChange={onChange}
            />
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
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={onChange}
            />
          </div>
          {imageLoading && "loading..."}
          {image && image?.url && (
            <div className="form-group py-2">
              <h5 for="exampleFormControlInput1">Featured Image</h5>
              <img width="auto" height={300} src={image?.url} />
              <br />
              <span
                className="text-danger"
                onClick={() => removeImage(image?.public_id)}
              >
                Remove Image
              </span>
            </div>
          )}

          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1">Content</h5>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="form-control"
            />
            <br />
            <Editor theme="snow" value={content} onChange={setcontent} />
          </div>

          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1">Categories</h5>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={(v) => setCategories(v)}
              value={[...categories]}
            >
              {loadCategories.map((item) => (
                <Select.Option key={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </div>

          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1">Poplar Tags</h5>
            <input
              type="text"
              className="form-control"
              placeholder="Tags"
              name="tags"
              value={formData.tags}
              onChange={onChange}
            />
            <small className="form-text">
              Please use comma separated values (eg.
              #TREND,#DESIGNING,#JAVSSCRIPT,#EARNING,#EDUCATION)
            </small>
          </div>

          <br />
          <Btn loading={loading} onClick={submitForm}>
            Edit
          </Btn>
        </Card>
      </CMSLayout>
    </>
  );
};

export default EditBlog;

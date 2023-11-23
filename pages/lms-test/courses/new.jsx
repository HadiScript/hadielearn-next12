import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BiPlus } from "react-icons/bi";

// import Editor from "react-quill";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import { Card, Select } from "antd";
import Btn from "../../../components/ui/Btn";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";
import LMSLayout from "../../../panel/newLMS/layouts";
import AddNewCourse from "../../../panel/lms-cms/AddNewCourse";

const initDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

const AddCourse = () => {
  const Editor = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  const [auth] = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [lectures, setLectures] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [overview, setOverview] = useState("");
  const [whyUs, setwhyUs] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [benefits, setBenefits] = useState("");
  const [marketValue, setMarketValue] = useState("");
  const [courseFor, setCourseFor] = useState("");
  const [duration, setDuration] = useState("");
  const [classes, setClasses] = useState(0);
  const [timming, setTimming] = useState("");
  const [startingFrom, setStartingFrom] = useState("");
  const [regFee, setRegFee] = useState(0);
  const [courseFee, setcourseFee] = useState("");
  const [days, setDays] = useState(initDays);
  const [image, setImage] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(false);
  const [instructor, setInstructor] = useState("");

  const [loadCategories, setLoadCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await axios.get(`${API}/categories`);
      setLoadCategories(data);
    };
    fetchCats();
  }, []);

  const handleAddLecture = (e) => {
    e.preventDefault();
    setLectures([...lectures, { title: "", details: "" }]);
  };

  const handleAddFaqs = (e) => {
    e.preventDefault();
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleLectureChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLectures = [...lectures];
    updatedLectures[index][name] = value;
    setLectures(updatedLectures);
  };

  const handleFaqsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = [...faqs];
    updatedFaqs[index][name] = value;
    setFaqs(updatedFaqs);
  };

  const handleRemoveLecture = (index) => {
    const ok = confirm("Are you sure?");
    if (ok) {
      const updatedLectures = [...lectures];
      updatedLectures.splice(index, 1);
      setLectures(updatedLectures);
    }
  };

  const handleRemoveFAQs = (index) => {
    const ok = confirm("Are your sure?");
    if (ok) {
      const updatedFAQs = [...faqs];
      updatedFAQs.splice(index, 1);
      setFaqs(updatedFAQs);
    }
  };

  // upload image
  const handleImage = async (e) => {
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
      // console.log('uploaded image data', data)
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
  const removeImage = async (e) => {
    setLoadingImage(true);

    try {
      const { data } = await axios.post(`${API}/remove-image`, image, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("uploaded image data", data);

      setLoadingImage(false);
    } catch (error) {
      console.log(error);
      setLoadingImage(false);
    }
  };

  const payloadData = {
    title,
    overview,
    lectures,
    faqs,
    whyUs,
    prerequisites,
    benefits,
    marketValue,
    courseFor,
    duration,
    classes,
    ...days,
    timming,
    startingFrom,
    regFee,
    courseFee,
    image,
    instructor,
    categories,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !overview ||
      !lectures ||
      !whyUs ||
      !prerequisites ||
      !benefits ||
      !marketValue ||
      !courseFor ||
      !duration ||
      !classes ||
      !timming ||
      !startingFrom ||
      !regFee ||
      !courseFee ||
      !image ||
      !instructor ||
      !categories
    ) {
      toast.error("All Fields are required**", { position: "bottom-center" });
      return;
    }

    // console.log(payloadData);
    // return

    try {
      setloading(true);

      const { data } = await axios.post(`${API}/create-course`, payloadData);

      console.log(data.error);
      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
        setloading(false);
      } else {
        toast.success("Course created successfully", {
          position: "bottom-center",
        });
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchingTeachers = async () => {
      try {
        setTeachersLoading(true);
        const { data } = await axios.get(`${API}/get-all-instructors`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setTeachers(data);

        setTeachersLoading(false);
      } catch (error) {
        setTeachersLoading(false);
        console.log(error);
        toast.error("Try Again");
      }
    };

    if (auth && auth.token) fetchingTeachers();
  }, [auth && auth.token]);

  return (
    <>
      <LMSLayout>
        <AddNewCourse />
      </LMSLayout>
    </>
  );
};

export default AddCourse;

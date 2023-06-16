import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import EditCourseForm from "../../../panel/common/EditCourseForm";
import { API } from "../../../config/API";
import PanelHeader from "../../../panel/common/PanelHeader";
import AdminLayout from "../../../panel/admin/AdminLayout";

const initDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
};

const EditCourse = () => {
  const router = useRouter();
  const { id } = router.query;

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
  const [categories, setCategories] = useState([]);
  const [loadCategories, setLoadCategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [singleLoading, setSingleLoading] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(false);

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

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await axios.get(`${API}/categories`);
      setLoadCategories(data);
    };
    fetchCats();
  }, []);

  const fetchSingleCourse = async () => {
    try {
      setSingleLoading(true);

      const { data } = await axios.get(`${API}/admin/edit/course/${id}`);
      setTitle(data?.title);

      setBenefits(data?.benefits);
      setOverview(data?.overview);
      setTitle(data?.title);

      setwhyUs(data?.whyUs);
      setPrerequisites(data?.prerequisites);
      setMarketValue(data?.marketValue);

      setBenefits(data?.benefits);
      setStartingFrom(data?.startingFrom);
      setTimming(data?.timming);
      setDuration(data?.duration);
      setClasses(data?.classes);
      setCourseFor(data?.courseFor);
      setRegFee(data?.regFee);
      setcourseFee(data?.courseFee);
      setImage(data?.image);
      setInstructor(data?.instructor);

      setDays({
        ...days,
        monday: data?.monday,
        tuesday: data?.tuesday,
        wednesday: data?.wednesday,
        thursday: data?.thursday,
        friday: data?.friday,
      });
      let arr = [];

      data?.categories.map((c) => arr.push(c.name));
      setCategories(arr);
      setLectures(data?.lectures);
      setFaqs(data?.faqs);
      setSingleLoading(false);
    } catch (error) {
      setSingleLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && auth && auth.token) {
      fetchSingleCourse();
    }
  }, [id && auth && auth.token]);

  const handleAddLecture = (e) => {
    e.preventDefault();
    setLectures([...lectures, { title: "", details: "" }]);
  };

  const handleLectureChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLectures = [...lectures];
    updatedLectures[index][name] = value;
    setLectures(updatedLectures);
  };

  const handleAddFaqs = (e) => {
    e.preventDefault();
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleFaqsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = [...faqs];
    updatedFaqs[index][name] = value;
    setFaqs(updatedFaqs);
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
  const removeImage = async (public_id) => {
    setLoadingImage(true);

    try {
      const { data } = await axios.post(
        `${API}/delete-image/${id}`,
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
        fetchSingleCourse();
        setLoadingImage(false);
      }
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
    categories,
    instructor,
  };

  const submitHandler = async (e) => {
    // console.log({ course: payloadData });
    e.preventDefault();
    if (
      !title ||
      !overview ||
      !lectures ||
      !faqs ||
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
      !instructor
    ) {
      toast.error("All Fields are required**", { position: "bottom-center" });
      return;
    }

    try {
      setloading(true);

      const { data } = await axios.post(
        `${API}/edit-course/${id}`,
        payloadData
      );

      console.log(data.error);
      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
        setloading(false);
      } else {
        toast.success("Edit", {
          position: "bottom-center",
        });
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  return (
    <>
      <PanelHeader />
      <AdminLayout>
        <EditCourseForm
          title={title}
          lectures={lectures}
          faqs={faqs}
          overview={overview}
          whyUs={whyUs}
          prerequisites={prerequisites}
          benefits={benefits}
          marketValue={marketValue}
          courseFor={courseFor}
          duration={duration}
          classes={classes}
          timming={timming}
          startingFrom={startingFrom}
          regFee={regFee}
          courseFee={courseFee}
          days={days}
          instructor={instructor}
          teachers={teachers}
          setInstructor={setInstructor}
          image={image}
          setTitle={setTitle}
          setOverview={setOverview}
          setwhyUs={setwhyUs}
          setPrerequisites={setPrerequisites}
          setBenefits={setBenefits}
          setMarketValue={setMarketValue}
          setCourseFor={setCourseFor}
          setDuration={setDuration}
          setClasses={setClasses}
          setTimming={setTimming}
          setStartingFrom={setStartingFrom}
          setRegFee={setRegFee}
          setcourseFee={setcourseFee}
          setDays={setDays}
          setImage={setImage}
          handleAddLecture={handleAddLecture}
          handleAddFaqs={handleAddFaqs}
          handleFaqsChange={handleFaqsChange}
          handleLectureChange={handleLectureChange}
          handleImage={handleImage}
          removeImage={removeImage}
          // courseId={id}
          submitHandler={submitHandler}
          loading={loading}
          loadingImage={loadingImage}
          singleLoading={singleLoading}
          loadCategories={loadCategories}
          categories={categories}
          setCategories={setCategories}
        />
      </AdminLayout>
    </>
  );
};

export default EditCourse;

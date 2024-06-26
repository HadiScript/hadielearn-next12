import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/auth";
import { API } from "../../../config/API";
import EditCourseForm from "../../../panel/common/EditCourseForm";
import CMSLayout from "../../../panel/newCMS/layouts";
import Btn from "../../../components/ui/Btn";

const initDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
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
  const [courseFee, setcourseFee] = useState(0);
  const [days, setDays] = useState(initDays);
  const [image, setImage] = useState();
  const [loadingImage, setLoadingImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadCategories, setLoadCategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [singleLoading, setSingleLoading] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(false);
  const [preImage, setPreImage] = useState();

  const [seoTitle, setseoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const handleSeoTitle = (e) => {
    setseoTitle(e.target.value);
  };
  const handleMeta = (e) => {
    setMetaDescription(e.target.value);
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
      setPreImage(data?.image);

      setInstructor(data?.instructor);

      setDays({
        ...days,
        monday: data?.monday,
        tuesday: data?.tuesday,
        wednesday: data?.wednesday,
        thursday: data?.thursday,
        friday: data?.friday,
        saturday: data?.saturday,
      });
      let arr = [];

      data?.categories.map((c) => arr.push(c.name));
      setCategories(arr);
      setLectures(data?.lectures);
      setFaqs(data?.faqs);

      setMetaDescription(data?.metaDescription);
      setseoTitle(data?.seoTitle);

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

  const handleRemoveLecture = (index) => {
    const updatedLectures = [...lectures];
    updatedLectures.splice(index, 1);
    setLectures(updatedLectures);
  };

  const handleRemoveFAQs = (index) => {
    const updatedFAQs = [...faqs];
    updatedFAQs.splice(index, 1);
    setFaqs(updatedFAQs);
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

  const submitHandler = async (e) => {
    // console.log({ course: payloadData });
    e.preventDefault();

    if (
      !title ||
      !overview ||
      // !lectures ||
      // !faqs ||
      !whyUs ||
      !prerequisites ||
      !benefits ||
      !marketValue ||
      !courseFor ||
      !duration ||
      !classes ||
      !timming ||
      !startingFrom ||
      // !regFee ||
      // !courseFee ||

      !instructor ||
      !seoTitle ||
      !metaDescription
    ) {
      toast.error("All Fields are required**", { position: "bottom-center" });
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("overview", overview);
    formData.append("whyUs", whyUs);
    formData.append("prerequisites", prerequisites); // Assuming `image` is the File object from an input type="file"
    formData.append("benefits", benefits);
    formData.append("marketValue", marketValue);
    formData.append("courseFor", courseFor);
    formData.append("duration", duration);
    formData.append("classes", classes);
    formData.append("timming", timming);
    formData.append("startingFrom", startingFrom);
    formData.append("regFee", regFee);
    formData.append("courseFee", courseFee);
    formData.append("instructor", instructor);
    formData.append("metaDescription", metaDescription);
    formData.append("seoTitle", seoTitle);

    formData.append("monday", days.monday ? true : false);
    formData.append("tuesday", days.tuesday ? true : false);
    formData.append("wednesday", days.wednesday ? true : false);
    formData.append("thursday", days.thursday ? true : false);
    formData.append("friday", days.friday ? true : false);
    formData.append("saturday", days.saturday ? true : false);

    lectures.forEach((obj, index) => {
      formData.append(`lectures[${index}][title]`, obj.title);
      formData.append(`lectures[${index}][details]`, obj.details);
    });

    faqs.forEach((obj, index) => {
      formData.append(`faqs[${index}][question]`, obj.question);
      formData.append(`faqs[${index}][answer]`, obj.answer);
    });

    if (preImage) {
      formData.append("image", preImage); // Assuming `image` is the File object from an input type="file"
    } else if (image) {
      formData.append("image", image);
    }

    categories.forEach((category) => {
      formData.append("categories", category);
    });

    // console.log(JSON.stringify(formData));
    // console.log(formData);

    try {
      setloading(true);

      const { data } = await axios.post(`${API}/edit-course/${id}`, formData);

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
      <CMSLayout>
        <EditCourseForm
          seoTitle={seoTitle}
          metaDescription={metaDescription}
          handleSeoTitle={handleSeoTitle}
          handleMeta={handleMeta}
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
          handleAddLecture={handleAddLecture}
          handleAddFaqs={handleAddFaqs}
          handleFaqsChange={handleFaqsChange}
          handleLectureChange={handleLectureChange}
          // courseId={id}
          setImage={setImage}
          preImage={preImage}
          setPreImage={setPreImage}
          submitHandler={submitHandler}
          loading={loading}
          loadingImage={loadingImage}
          singleLoading={singleLoading}
          loadCategories={loadCategories}
          categories={categories}
          setCategories={setCategories}
          handleRemoveLecture={handleRemoveLecture}
          handleRemoveFAQs={handleRemoveFAQs}
        />
      </CMSLayout>
    </>
  );
};

export default EditCourse;

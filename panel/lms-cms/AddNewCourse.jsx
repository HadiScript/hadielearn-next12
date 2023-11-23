import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BiPlus } from "react-icons/bi";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import { Card, Select } from "antd";
import Btn from "../../components/ui/Btn";
import { API } from "../../config/API";
import { AuthContext } from "../../context/auth";

// import '../../'

const initDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

const AddNewCourse = () => {
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
  const [image, setImage] = useState();

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
    const updatedLectures = [...lectures];
    updatedLectures.splice(index, 1);
    setLectures(updatedLectures);
  };

  const handleRemoveFAQs = (index) => {
    const updatedFAQs = [...faqs];
    updatedFAQs.splice(index, 1);
    setFaqs(updatedFAQs);
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
      !categories ||
      !faqs
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
    formData.append("image", image);
    formData.append("instructor", instructor);

    formData.append("monday", days.monday);
    formData.append("tuesday", days.tuesday);
    formData.append("wednesday", days.wednesday);
    formData.append("thursday", days.thursday);
    formData.append("friday", days.friday);
    formData.append("saturday", days.saturday);

    // let stringifyFaqs = JSON.stringify(faqs);
    // formData.append("faqs", JSON.stringify(faqs));

    lectures.forEach((obj, index) => {
      formData.append(`lectures[${index}][title]`, obj.title);
      formData.append(`lectures[${index}][details]`, obj.details);
    });

    faqs.forEach((obj, index) => {
      formData.append(`faqs[${index}][answer]`, obj.answer);
      formData.append(`faqs[${index}][question]`, obj.question);
    });

    categories.forEach((category) => {
      formData.append("categories", category);
    });

    // console.log(JSON.stringify(formData));

    try {
      setloading(true);

      const { data } = await axios.post(`${API}/create-course`, formData);

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
    <Card>
      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Course Title</h5>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="title"
          placeholder="Course Title - ... Mastery Course "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Course Image</h5>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          accept="images/*"
          // hidden
          className="form-control"
          id="exampleFormControlInput1"
        />
      </div>
      {loadingImage && "loading..."}
      {image && (
        <div className="form-group py-2">
          <img width="auto" height={300} src={URL.createObjectURL(image)} onClick={() => setImage()} />
          <br />
          <small>Just click on image to remove.</small>
        </div>
      )}

      {/* {image && image?.url && <img width="auto" height={300} src={image?.url} />} */}
      <hr />

      {/* overview */}
      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Overview</h5>
        <Editor placeholder="Overview of the coruse" value={overview} onChange={(e) => setOverview(e)} />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Why us</h5>
        <Editor placeholder="" value={whyUs} onChange={(e) => setwhyUs(e)} />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Eligibility</h5>
        <Editor
          type="text"
          id="exampleFormControlInput1"
          name="prerequisites"
          placeholder="Prerequisites of the course"
          value={prerequisites}
          onChange={(e) => setPrerequisites(e)}
        />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Benefits</h5>
        <Editor type="text" id="exampleFormControlInput1" name="benefits" placeholder="Benefits of the course" value={benefits} onChange={(e) => setBenefits(e)} />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Scope</h5>

        <Editor
          type="text"
          // className="form-control"
          id="exampleFormControlInput1"
          name="marketValue"
          value={marketValue}
          onChange={(e) => setMarketValue(e)}
        />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Who this course is for:</h5>
        <textarea
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="courseFor"
          placeholder="Who this course is for:"
          value={courseFor}
          onChange={(e) => setCourseFor(e.target.value)}
        />
      </div>

      <div className="row py-3">
        <div className="col-md-6">
          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1"> Durations</h5>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="duration"
              placeholder="Duration - 3 months"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1"> Classes</h5>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              name="classes"
              placeholder="Classes - 36 "
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-md-6">
          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1"> Timing</h5>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="timming"
              placeholder="Batch timing - 4 PM to 5:30 PM"
              value={timming}
              onChange={(e) => setTimming(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1"> Starting From</h5>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="startingFrom"
              placeholder="Starting From - June 1st, 2023 "
              value={startingFrom}
              onChange={(e) => setStartingFrom(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row pt-10">
        <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Conducting days <span className="text-danger">*</span>{" "}
        </label>
        <div className="col-lg-6 col-md-6">
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="monday"
              checked={days.monday}
              onChange={() =>
                setDays((prev) => ({
                  ...prev,
                  ["monday"]: !days.monday,
                }))
              }
            />
            <label class="form-check-label" for="flexCheckDefault">
              Monday
            </label>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="tuesday"
              checked={days.tuesday}
              onChange={() =>
                setDays((prev) => ({
                  ...prev,
                  ["tuesday"]: !days.tuesday,
                }))
              }
            />
            <label class="form-check-label" for="flexCheckDefault">
              Tuesday
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="wednesday"
              checked={days.wednesday}
              onChange={() =>
                setDays((prev) => ({
                  ...prev,
                  ["wednesday"]: !days.wednesday,
                }))
              }
            />
            <label class="form-check-label" for="flexCheckDefault">
              Wednesday
            </label>
          </div>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="thursday"
              checked={days.thursday}
              onChange={() =>
                setDays((prev) => ({
                  ...prev,
                  ["thursday"]: !days.thursday,
                }))
              }
            />
            <label class="form-check-label" for="flexCheckDefault">
              Thursday
            </label>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="friday"
              checked={days.friday}
              onChange={() =>
                setDays((prev) => ({
                  ...prev,
                  ["friday"]: !days.friday,
                }))
              }
            />
            <label class="form-check-label" for="flexCheckDefault">
              Friday
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="saturday"
              checked={days.saturday}
              onChange={() =>
                setDays((prev) => ({
                  ...prev,
                  ["saturday"]: !days.saturday,
                }))
              }
            />
            <label class="form-check-label" for="flexCheckDefault">
              Saturday
            </label>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-md-6">
          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1"> Course Fee</h5>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              name="courseFee"
              placeholder="Course Fee - 0"
              value={courseFee}
              onChange={(e) => setcourseFee(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <h5 for="exampleFormControlInput1"> Registeration Fee</h5>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              name="classes"
              placeholder="Registeration Fee - 5000 "
              value={regFee}
              onChange={(e) => setRegFee(e.target.value)}
            />
          </div>
        </div>
      </div>

      {teachersLoading && "loading..."}
      <div className="form-group py-2">
        <select value={instructor} onChange={(e) => setInstructor(e.target.value)} className="form-control" name="status">
          <option>* Select Instructor</option>
          {teachers?.map((x, index) => (
            <option key={index} value={x._id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Categories</h5>
        <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select" onChange={(v) => setCategories(v)}>
          {loadCategories.map((item) => (
            <Select.Option key={item.name}>{item.name}</Select.Option>
          ))}
        </Select>
      </div>

      {/* lectures */}
      <div className="row py-5">
        <h5> Outlines</h5>

        {lectures.map((lecture, index) => (
          <React.Fragment key={index}>
            <div className="col-12">
              <div className="form-group py-2">
                <label for="exampleFormControlInput1"> Heading</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="title"
                  placeholder="Lecture Title"
                  value={lecture.title}
                  onChange={(e) => handleLectureChange(index, e)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group py-2">
                <label for="exampleFormControlSelect1">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="details"
                  placeholder="Lecture Details"
                  value={lecture.details}
                  onChange={(e) => handleLectureChange(index, e)}
                />
              </div>

              <span className="p-1 mx-3 rounded d-flex justify-content-start text-danger " onClick={() => handleRemoveLecture(index)}>
                Remove
              </span>
            </div>
            <hr />
          </React.Fragment>
        ))}

        <div className="d-flex justify-content-end">
          <button onClick={handleAddLecture} className="p-1 rounded d-flex justify-content-center align-items-center">
            Add <BiPlus />
          </button>
        </div>
      </div>
      {/* ends */}

      {/* FAQS */}
      <div className="row py-5">
        <h5>FAQs</h5>

        {faqs.map((lecture, index) => (
          <React.Fragment key={index}>
            <div className="col-12">
              <div className="form-group py-2">
                <label for="exampleFormControlInput1"> Question</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="question"
                  placeholder="Question"
                  value={faqs.question}
                  onChange={(e) => handleFaqsChange(index, e)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group py-2">
                <label for="exampleFormControlSelect1">Answer</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="answer"
                  placeholder="Answer"
                  value={lecture.answer}
                  onChange={(e) => handleFaqsChange(index, e)}
                />
              </div>
            </div>
            <span className="p-1 mx-3 rounded d-flex justify-content-start text-danger " onClick={() => handleRemoveFAQs(index)}>
              Remove
            </span>

            <hr />
          </React.Fragment>
        ))}

        <div className="d-flex justify-content-end">
          <button onClick={handleAddFaqs} className="p-1 rounded d-flex justify-content-center align-items-center">
            Add <BiPlus />
          </button>
        </div>
      </div>
      {/* ends */}

      <Btn loading={loading} className="z-btn" onClick={submitHandler}>
        Submit
      </Btn>
    </Card>
  );
};

export default AddNewCourse;

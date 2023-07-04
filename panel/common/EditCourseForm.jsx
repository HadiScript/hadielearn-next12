import React, { useMemo } from "react";
// import Editor from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { BiPlus } from "react-icons/bi";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Card, Select } from "antd";
import Btn from "../../components/ui/Btn";

const EditCourseForm = ({
  title,
  lectures,
  faqs,
  overview,
  whyUs,
  setwhyUs,
  prerequisites,
  benefits,
  marketValue,
  courseFor,
  duration,
  classes,
  timming,
  startingFrom,
  regFee,
  courseFee,
  days,
  image,
  setTitle,
  setOverview,
  setPrerequisites,
  setBenefits,
  setMarketValue,
  setCourseFor,
  setDuration,
  setClasses,
  setTimming,
  setStartingFrom,
  setRegFee,
  setcourseFee,
  setDays,
  handleAddLecture,
  handleLectureChange,
  handleImage,
  removeImage,
  submitHandler,
  loading,
  loadingImage,
  singleLoading,
  handleAddFaqs,
  handleFaqsChange,
  loadCategories,
  categories,
  setCategories,
  instructor,
  setInstructor,
  teachers,
  handleRemoveLecture,
  handleRemoveFAQs,
}) => {
  const Editor = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <Card>
      {/* {JSON.stringify(singleData)} */}
      {singleLoading && <p>loading...</p>}
      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1"> Course Title</h5>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="title"
          placeholder="Course Title - ... Mastery Course "
          value={title}
          // readOnly
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1"> Course Image</h5>
        <input
          onChange={handleImage}
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
          <span
            className="text-danger"
            onClick={() => removeImage(image?.public_id)}
          >
            {" "}
            delete image{" "}
          </span>
          <br />
        </>
      )}
      {image && image?.url && (
        <img width="auto" height={300} src={image?.url} />
      )}
      <hr />

      {/* overview */}
      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Overview</h5>
        <Editor
          // className="form-control"
          name="overview"
          placeholder="Overview of the coruse"
          value={overview}
          onChange={(e) => setOverview(e)}
        />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Why us</h5>
        <Editor
          name="whyUs"
          placeholder="Why us"
          value={whyUs}
          onChange={(e) => setwhyUs(e)}
        />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Prerequisites</h5>
        <Editor
          type="text"
          // className="form-control"
          id="exampleFormControlInput1"
          name="prerequisites"
          placeholder="Prerequisites of the course"
          value={prerequisites}
          onChange={(e) => setPrerequisites(e)}
        />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Benefits</h5>

        <Editor
          name="benefits"
          placeholder="Benefits of the course"
          value={benefits}
          onChange={(e) => setBenefits(e)}
        />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Market Value</h5>

        <Editor
          name="marketValue"
          placeholder="Market Value of the course"
          value={marketValue}
          onChange={(e) => setMarketValue(e)}
        />
      </div>

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Who this course is for:</h5>
        <textarea
          // controls={controls}
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

      <div className="form-group py-2">
        <h5 for="exampleFormControlInput1">Categories</h5>
        {/* {JSON.stringify(loadCategories)} */}
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          onChange={(v) => setCategories(v)}
          value={[...categories]}
        >
          {loadCategories.map((item) => (
            <Select.Option key={item?.name}>{item?.name}</Select.Option>
          ))}
        </Select>
      </div>

      <div className="form-group py-2">
        <select
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          className="form-control"
          name="status"
        >
          <option>* Select Instructor</option>
          {teachers?.map((x, index) => (
            <option key={index} value={x._id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>

      {/* lectures */}
      {/* {JSON.stringify(lectures)} */}
      <div className="row py-5">
        <h5>Outlines</h5>
        {lectures.map((lecture, index) => (
          <React.Fragment key={index}>
            {/* {JSON.stringify(lecture)} */}
            <div className="card " style={{ backgroundColor: "#f0f0f0" }}>
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
              </div>
              <span
                className="p-1 mx-3 rounded d-flex justify-content-start text-danger "
                onClick={() => handleRemoveLecture(index)}
              >
                Remove
              </span>
            </div>
            <hr />
          </React.Fragment>
        ))}

        <div className="d-flex justify-content-end">
          <button
            onClick={handleAddLecture}
            className="p-1 rounded d-flex justify-content-center align-items-center"
          >
            Add <BiPlus />
          </button>
        </div>
      </div>
      {/* ends */}

      {/* faqs */}

      <div className="row py-5">
        <h5>Outlines</h5>
        {faqs.map((x, index) => (
          <React.Fragment key={index}>
            {/* className="card " style={{ backgroundColor: "#f0f0f0" }} */}
            <div className="card " style={{ backgroundColor: "#f0f0f0" }}>
              <div className="col-12">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="question"
                    placeholder="Question"
                    value={x.question}
                    onChange={(e) => handleFaqsChange(index, e)}
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
                    name="answer"
                    placeholder="Answer"
                    value={x.answer}
                    onChange={(e) => handleFaqsChange(index, e)}
                  />
                </div>
              </div>
              <span
                className="p-1 mx-3 rounded d-flex justify-content-start text-danger "
                onClick={() => handleRemoveFAQs(index)}
              >
                Remove
              </span>
            </div>
            <hr />
          </React.Fragment>
        ))}

        <div className="d-flex justify-content-end">
          <button
            onClick={handleAddFaqs}
            className="p-1 rounded d-flex justify-content-center align-items-center"
          >
            Add <BiPlus />
          </button>
        </div>
      </div>
      {/* ends */}

      <Btn loading={loading} onClick={submitHandler}>
        Submit
      </Btn>
    </Card>
  );
};
export default EditCourseForm;

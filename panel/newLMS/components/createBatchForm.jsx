import React, { useState } from "react";
import { API } from "../../../config/API";
import axios from "axios";
import useCourses from "../hooks/useCourses";
import { Button, Card } from "antd";
import { toast } from "react-hot-toast";

const initVals = {
  title: "",

  duration: "",
  limit: 0,
  classes: 0,
  timming: "",
  startDate: "",
  endDate: "",

  courseDetails: "",
};

const initDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

const CreateBatchForm = () => {
  const [formData, setFormData] = useState(initVals);
  const [days, setDays] = useState(initDays);
  const [loading, setLoading] = useState(false);
  const { courses } = useCourses();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const payloadData = {
    ...formData,
    ...days,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/lms/create-batch`, payloadData);
      console.log(data);
      if (data.ok) {
        setLoading(false);
        toast.success("Batch Created :)");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1"> Batch Title</h5>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="title"
            placeholder="Batch Title "
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Durations</h5>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="duration"
            placeholder="Batch Duration "
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Enollment Limits</h5>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            name="limit"
            placeholder="Batch Limit "
            value={formData.limit}
            onChange={handleChange}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Classes</h5>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            name="classes"
            placeholder="Batch Classes "
            value={formData.classes}
            onChange={handleChange}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Timing</h5>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="timming"
            placeholder="Batch Timing "
            value={formData.timming}
            onChange={handleChange}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Starting Date</h5>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput1"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">End Date</h5>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput1"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
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
                value="friday"
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

        <div className="form-group py-2">
          <h5>Coruse</h5>
          <select
            value={formData.courseDetails}
            onChange={handleChange}
            className="form-control"
            name="courseDetails"
          >
            <option>* Select Instructor</option>
            {courses.courses?.map((x, index) => (
              <option key={index} value={x._id}>
                {x.title}
              </option>
            ))}
          </select>
        </div>

        {/* Rest of the form fields */}

        <Button
          loading={loading}
          className="my-3"
          style={{ backgroundColor: "#0f3f5d", color: "white" }}
          onClick={handleSubmit}
        >
          Create Batch
        </Button>
      </form>
    </Card>
  );
};
export default CreateBatchForm;

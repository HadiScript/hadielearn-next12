import React, { useEffect, useState } from "react";
import LMSLayout from "../../../panel/newLMS/layouts";
import { useRouter } from "next/router";
import useSingleBatchId from "../../../panel/newLMS/hooks/useSingleBatchId";
import { toast } from "react-hot-toast";
import { API } from "../../../config/API";
import useCourses from "../../../panel/newLMS/hooks/useCourses";
import EditBatchForm from "../../../panel/newLMS/components/editBtachForm";
import axios from "axios";

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

const EditBatch = () => {
  const router = useRouter();
  const { id } = router?.query;

  //   hooks
  const { batch, loading } = useSingleBatchId({ id });
  const { courses } = useCourses({ want: "nothing" });

  const [formData, setFormData] = useState(initVals);
  const [Days, setDays] = useState(initDays);
  const [submitLoading, SetSubmitLoading] = useState(false);

  useEffect(() => {
    if (batch) {
      setFormData({
        ...formData,
        title: batch.title,
        duration: batch.duration,
        limit: batch.limit,
        classes: batch.classes,
        timming: batch.timming,
        startDate: batch.startDate,
        endDate: batch.endDate,
        courseDetails: batch.courseDetails?._id,
      });

      setDays({
        ...Days,
        monday: batch.monday,
        tuesday: batch.tuesday,
        wednesday: batch.wednesday,
        thursday: batch.thursday,
        friday: batch.friday,
        saturday: batch.saturday,
      });
    }
  }, [batch]);

  //   edit form data
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
    ...Days,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      SetSubmitLoading(true);
      const { data } = await axios.put(`${API}/lms/update-batch/${id}`, payloadData);

      if (data.ok) {
        SetSubmitLoading(false);
        toast.success("Batch Created :)");
      }
    } catch (error) {
      console.log(error);
      SetSubmitLoading(false);
    }
  };

  return (
    <LMSLayout>
      {/* {JSON.stringify(formData)}
      {JSON.stringify(Days)} */}
      {batch && (
        <EditBatchForm
          submitLoading={submitLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          setDays={setDays}
          days={Days}
          formData={formData}
          courses={courses}
          loading={loading}
        />
      )}
    </LMSLayout>
  );
};

export default EditBatch;

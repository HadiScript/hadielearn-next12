import React, { useContext, useEffect, useState } from "react";
import EditProfileLayout from "../../panel/profiling/EditProfileLayout";
import EnrollmentInfoForm from "../../panel/profiling/EnrollmentInfoForm";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import { AuthContext } from "../../context/auth";
import dayjs from "dayjs";

const _enrollmendInfo = {
  phoneNumber: "",
  whatsAppphoneNumber: "",
  dateOfBirth: "",
  gender: "",

  idCard: "",
  address: "",
  city: "",

  parentName: "",
  parentOccupations: "",
  parentPhoneNumber: "",

  interest: "",
  wantToAchieve: "",
};

const enrollmentInfoComponennt = () => {
  const [auth] = useContext(AuthContext);

  const [enrollmentInfo, setEnrollmentInfo] = useState(_enrollmendInfo);
  const [loading, setLoading] = useState(false);

  const changeEnrollmentInfo = (e) => {
    const { name, value } = e.target;

    setEnrollmentInfo({ ...enrollmentInfo, [name]: value });
  };

  const gettingMyEnrollmentInfo = async () => {
    try {
      const { data } = await axios.get(`${API}/my-enrollment-info`);
      console.log({ data });
      if (data.ok) {
        for (let key in data.enrollmentInfo) {
          setEnrollmentInfo({ ...data.enrollmentInfo, dateOfBirth: dayjs(data.enrollmentInfo?.dateOfBirth) });
          // console.log(key === "dateOfBirth" ? "yes" : "no");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      gettingMyEnrollmentInfo();
    }
  }, [auth && auth?.token]);

  const submit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/update-enrollment-info`, { enrollmentInfo });
      if (data.ok) {
        toast.success("Updated", { position: "bottom-center" });
        gettingMyEnrollmentInfo();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditProfileLayout>
      <EnrollmentInfoForm submit={submit} loading={loading} enrollmentInfo={enrollmentInfo} changeEnrollmentInfo={changeEnrollmentInfo} setEnrollmentInfo={setEnrollmentInfo} />
    </EditProfileLayout>
  );
};

export default enrollmentInfoComponennt;

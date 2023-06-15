import React, { useEffect, useState } from "react";
import SEOHead from "../../components/functions/SEOHead";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import Step2 from "../../form/Step2";
import Step1 from "../../form/Step1";
import Step0 from "../../form/Step0";
import MultiStepProgressBar from "../../form/MultiStepProgressBar";
import Step3 from "../../form/Step3";
import Step4 from "../../form/Step4";

const INITIAL_USER = {
  firstName: "",
  lastName: "",

  address: "",
  city: "",

  parentName: "",
  parentOccupations: "",

  interest: "",
  wantToAchieve: "",
};

const EnrollmentsForm = () => {
  const router = useRouter();
  const { enroll_to } = router.query;

  //   states
  const [currentStep, setCurrentStep] = useState(0);

  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [course, setCourse] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [enrollTo, setEnrollTo] = useState("");
  const [userReq, setUserReq] = useState(INITIAL_USER);
  const [loading, setLoading] = useState(false);
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = useState("");
  const [whatsAppphoneNumber, setWhatsAppPhoneNumber] = useState("");
  const [idCard, setIdCard] = useState("");

  //   singleData States
  const [singleData, setSingleData] = useState({});
  const [ok, setOk] = useState(false);
  const [singleDataLoading, setSingleDataLoading] = useState(false);

  useEffect(() => {
    setEnrollTo(enroll_to);
  }, [enroll_to]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserReq((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    setGender(event.target.value);
  };

  let selectedEnrolled;
  if (enrollTo && enrollTo === "workshop") {
    selectedEnrolled = workshop_data.find((x) => x.key === workshop);
  }

  const data =
    singleData && ok
      ? {
          ...singleData,
          email,
          whatsAppphoneNumber,
          course,
          enrollTo,
          workshop,
          meetingId: selectedEnrolled && selectedEnrolled.meetingId,
          passcodeId: selectedEnrolled && selectedEnrolled.pascodeId,
          link: selectedEnrolled && selectedEnrolled.zoomLink,
          authorName: selectedEnrolled && selectedEnrolled.userName,
          heading: selectedEnrolled && selectedEnrolled.title,
          meetingTiming: selectedEnrolled && selectedEnrolled.meetingTiming,
        }
      : {
          ...userReq,
          gender,
          email,
          dateOfBirth,
          phoneNumber,
          whatsAppphoneNumber,
          parentPhoneNumber,
          idCard,
          course,
          education,
          enrollTo,
          workshop,
          meetingId: selectedEnrolled && selectedEnrolled.meetingId,
          passcodeId: selectedEnrolled && selectedEnrolled.pascodeId,
          link: selectedEnrolled && selectedEnrolled.zoomLink,
          authorName: selectedEnrolled && selectedEnrolled.userName,
          heading: selectedEnrolled && selectedEnrolled.title,
          meetingTiming: selectedEnrolled && selectedEnrolled.meetingTiming,
        };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(data, "here is");
    // return;
    try {
      setLoading(true);
      const payload = { ...data };

      const response = await axios.post(
        "https://hadielearning.com/api/enroll-stu",
        // "http://localhost:5000/api/enroll-stu",
        payload
      );

      setUserReq(INITIAL_USER);
      setLoading(false);
      router("/thanks");
    } catch (err) {
      let {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const previousButton = () => {
    if (currentStep !== 0) {
      return (
        <button className="z-btn mx-2" onClick={handlePrev}>
          Previous
        </button>
      );
    }
    return null;
  };

  const nextButton = () => {
    if (currentStep < 4) {
      return (
        <button className="z-btn " onClick={handleNext}>
          Next
        </button>
      );
    }
    return null;
  };

  const submitButton = () => {
    if (currentStep === 4 || currentStep === 0) {
      return (
        <button className="z-btn" type="submit" onClick={handleSubmit}>
          Submit {loading && <p>...loading...</p>}
        </button>
      );
    }
    return null;
  };

  const fetchingSingleData = async (req, res) => {
    try {
      setSingleDataLoading(true);
      const { data } = await axios.get(
        `https://hadielearning.com/api/user/${email}`
      );
      console.log("single data", data.user, data.finded);
      setSingleData(data.user);
      setOk(data.finded);

      setSingleDataLoading(false);
    } catch (error) {
      setSingleDataLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchingSingleData();
    }
  }, [email]);

  return (
    <>
      <SEOHead
        title={"Enrollment Application - Hadi E-learning"}
        desc={""}
        conLink={"https://hadielearning.com/enroll/program"}
      />

      <div id="enrollScreen" className="container-fluid ">
        <div className="row">
          <div className="col-lg-4 col-md-4 bg-danger" id="forImage" />
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12" id="rightCol">
            <div className="form " onSubmit={handleSubmit}>
              <div
                className="row d-flex justify-content-center align-items-center"
                style={{ height: "90vh" }}
              >
                <div className="col-md-8  col-sm-12 " id="startForm">
                  <Step0
                    setEmail={setEmail}
                    email={email}
                    handleChange={handleChange}
                    currentStep={currentStep}
                    nextButton={nextButton}
                    submit={submitButton}
                    singleData={singleData}
                    singleDataLoading={singleDataLoading}
                    ok={ok}
                    enrollTo={enrollTo}
                    course={course}
                    setCourse={setCourse}
                    workshop={workshop}
                    setWorkshop={setWorkshop}
                    _enroll_to={enroll_to}
                    whatsAppphoneNumber={whatsAppphoneNumber}
                    setWhatsAppPhoneNumber={setWhatsAppPhoneNumber}
                  />

                  {/* <CardText /> */}
                  <Step1
                    currentStep={currentStep}
                    handleChange={handleChange}
                    nextButton={nextButton}
                    email={userReq.email}
                    lastName={userReq.lastName}
                    firstName={userReq.firstName}
                    phoneNumber={userReq.phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    dateOfBirth={dateOfBirth}
                    setdateOfBirth={setdateOfBirth}
                    gender={gender}
                    handleCheckboxChange={handleCheckboxChange}
                    previousButton={previousButton}
                    MultiStepProgressBar={MultiStepProgressBar}
                    whatsAppphoneNumber={whatsAppphoneNumber}
                    setWhatsAppPhoneNumber={setWhatsAppPhoneNumber}
                  />
                  <Step2
                    currentStep={currentStep}
                    handleChange={handleChange}
                    nextButton={nextButton}
                    previousButton={previousButton}
                    city={userReq.city}
                    address={userReq.address}
                    idCard={idCard}
                    setIdCard={setIdCard}
                    MultiStepProgressBar={MultiStepProgressBar}
                  />

                  <Step3
                    MultiStepProgressBar={MultiStepProgressBar}
                    currentStep={currentStep}
                    handleChange={handleChange}
                    nextButton={nextButton}
                    previousButton={previousButton}
                    parentName={userReq.parentName}
                    parentPhoneNumber={userReq.parentPhoneNumber}
                    setParentPhoneNumber={setParentPhoneNumber}
                    parentOccupations={userReq.parentOccupations}
                  />

                  <Step4
                    MultiStepProgressBar={MultiStepProgressBar}
                    currentStep={currentStep}
                    handleChange={handleChange}
                    submit={submitButton}
                    previousButton={previousButton}
                    education={education}
                    enrollTo={enrollTo}
                    course={course}
                    setCourse={setCourse}
                    workshop={workshop}
                    setWorkshop={setWorkshop}
                    _enroll_to={enroll_to}
                    // workshopData={workshop_data}
                    interest={userReq.interest}
                    wantToAchieve={userReq.wantToAchieve}
                    setEducation={setEducation}
                    // setEnrollTo={setEnrollTo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollmentsForm;

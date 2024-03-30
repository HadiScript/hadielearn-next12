import React from "react";
import SEOHead from "../components/functions/SEOHead";
import PagesNavbar from "../components/partials/PageNavbar";
import Footer from "../components/partials/Footer";

const termsAndConditions = () => {
  return (
    <>
      <SEOHead
        title={"Terms and Conditions For Hadi E-learning"}
        desc={""}
        conLink={"https://hadielearning.com/terms-and-conditions"}
      />
      <PagesNavbar page="contactPage" />

      {/* start */}
      <div className="container pt-90">
        <div className="about__content">
          <h1>Terms and Conditions For Hadi E-learning</h1>


          <ul className="list-unstyled mb-90">
            <li className="mb-2">Hadi E-Learning reserves the right to grant or deny admission to its courses.</li>
            <li className="mb-2">The admissions are processed on a first-come-first-served basis. No further enrollments will be taken once the seats fill up for a particular course.</li>
            <li className="mb-2">Participants are required to undertake due diligence regarding the course selection. Once registered, participants cannot switch courses when classes commence.</li>
            <li className="mb-2">If course slots remain unfilled, Hadi E-learning reserves the right to cancel/postpone the course's commencement. In case of course cancellation, registered students will receive a full refund of their fees within 15 to 30 working days after the decision.</li>
            <li className="mb-2">Refunds are only given if Hadi E-Learning plans on cancelling the course.</li>
            <li className="mb-2">Hadi E-Learning reserves the right not to award a certificate if the course criteria are not satisfactorily met.</li>
            <li className="mb-2">Hadi E-Learning reserves the right to change instructors at the start or midway through the course due to unforeseen circumstances.</li>
            <li className="mb-2">At the end of the course, you will be awarded an E-Certificate, granted that you meet the eligibility criteria. This will be an electronic/soft copy of the certificate.</li>
            <li className="mb-2">At least 80% attendance is required to receive a certificate of completion. Attendance will be marked during the first ten minutes of every class.</li>
            <li className="mb-2">The name that you submit in the Registration Form will be printed on your certificate.</li>
            <li className="mb-2">Hadi E-Learning may cancel or reschedule a class as per trainer’s availability or in the event of unavoidable circumstances.</li>
            <li className="mb-2">All prices, products, and offers on this website are subject to change without notice.</li>
            <li className="mb-2">Hadi E-Learning reserves the right to change prices for all our services and offers. These changes are performed due to course termination, errors in advertisements, and other extenuating circumstances.</li>
            <li className="mb-2">Hadi E-Learning reserves the right to align our offerings with government policies, ensuring compliance and adherence to prevailing regulations.</li>
          </ul>

        </div>
      </div>
      {/* ends */}
      <Footer />
    </>
  );
};

export default termsAndConditions;

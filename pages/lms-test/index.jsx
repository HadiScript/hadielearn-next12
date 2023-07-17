import React from "react";
import LMSLayout from "../../panel/newLMS/layouts";
import Stats from "../../panel/newAdmin/components/admin-stats";
import PaymentsEnrolledStudents from "../../panel/newAdmin/components/payments-enrolledStudents";
import BatchDetails from "../../panel/newAdmin/components/batch-details";

const LMS = () => {
  return (
    <LMSLayout>
      <Stats />
      <div className="my-3">
        <PaymentsEnrolledStudents />
      </div>
      <div className="mb-3">
        <BatchDetails />
      </div>
    </LMSLayout>
  );
};

export default LMS;

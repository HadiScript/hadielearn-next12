import React from "react";
import AdminLayouts from "../../panel/newAdmin/layouts";
import Stats from "../../panel/newAdmin/components/admin-stats";
import PaymentsEnrolledStudents from "../../panel/newAdmin/components/payments-enrolledStudents";
import BatchDetails from "../../panel/newAdmin/components/batch-details";

const Admin = () => {
  return (
    <AdminLayouts>
      <Stats />
      <div className="my-3">
        <PaymentsEnrolledStudents />
      </div>
      <div className="mb-3">
        <BatchDetails />
      </div>
    </AdminLayouts>
  );
};

export default Admin;

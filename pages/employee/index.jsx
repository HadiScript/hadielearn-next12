import React from "react";
import PanelHeader from "../../panel/common/PanelHeader";
import EmployeeLayout from "../../panel/employee/EmployeeLayout";

const EmployeeDashboard = () => {
  return (
    <>
      <PanelHeader />

      <EmployeeLayout>Employee Dashboard</EmployeeLayout>
    </>
  );
};

export default EmployeeDashboard;

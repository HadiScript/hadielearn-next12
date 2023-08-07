import React from "react";
import HooksLayout from "../../../panel/newStudent/layouts/components/HooksLayout";
import NewLayout from "../../../panel/newStudent/layouts/NewLayout";
import { useRouter } from "next/router";

const StudentSingleBatchDashboard = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <NewLayout batchID={id}>
      <h2>from hooks layout - {id}</h2>
    </NewLayout>
  );
};

export default StudentSingleBatchDashboard;

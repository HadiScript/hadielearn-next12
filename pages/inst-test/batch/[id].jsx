import { useRouter } from "next/router";
import React from "react";
import BatchLayout from "../../../panel/newInstructor/layouts";

const InstSingleBatch = () => {
  const router = useRouter();
  const { id } = router.query;
  return <BatchLayout BatchId={id}>InstSingleBatch - {id}</BatchLayout>;
};

export default InstSingleBatch;

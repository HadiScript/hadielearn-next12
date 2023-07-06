import React from "react";
import LMSLayout from "../../../panel/newLMS/layouts";
import useCompletedBatches from "../../../panel/newLMS/hooks/useCompletedBatches";
import { Card } from "antd";
import { BsFolder2Open } from "react-icons/bs";
import Link from "next/link";
import ActiveBatchModels from "../../../panel/newLMS/modals/activeBatchModal";
import { useState } from "react";

const CompletedBatches = () => {
  const { batches, loading } = useCompletedBatches();
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

  return (
    <LMSLayout>
      <Card>
        <div className="table-responsive">
          <h4 className="mb-3">Completed Batches</h4>
          <table
            class="table table-striped  text-dark"
            style={{ backgroundColor: "", borderRadius: "10px" }}
          >
            <thead>
              <tr>
                <th scope="col">{loading ? "loading..." : "#"}</th>
                <th scope="col">Batch</th>
                <th scope="col">Assign Course</th>
                <th scope="col"> Assigned Students </th>
                <th scope="col"> Instructors </th>
                <th scope="col"> From </th>
                <th scope="col"> To </th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {batches.length === 0 ? (
                <h5 className="text-dark p-4">No Any Batch</h5>
              ) : (
                batches &&
                batches?.map((x, index) => (
                  <tr>
                    <th className="text-dark" scope="row ">
                      {++index}
                    </th>
                    <td className="text-dark">{x.title}</td>
                    <td className="text-dark">
                      <Link href={`/lms/course/${x.courseDetails?._id}`}>
                        <a>{x.courseDetails?.title}</a>
                      </Link>
                    </td>
                    <td className="text-dark">{x.enrolledStudents?.length}</td>
                    <td className="text-dark">{x.teachers?.length}</td>
                    <td className="text-dark">
                      {x.startDate.substring(0, 10)}
                    </td>
                    <td className="text-dark">{x.endDate.substring(0, 10)}</td>
                    <td className="text-dark">
                      <BsFolder2Open
                        role="button"
                        onClick={() => {
                          setCurrent(x);
                          setOpen(true);
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <ActiveBatchModels
        current={current}
        setCurrent={setCurrent}
        open={open}
        setOpen={setOpen}
        // openStudentModal={openStudentModal}
        // setOpenStudentModal={setOpenStudentModal}
        // openInstructorModels={openInstructorModels}
        // setOpenInstructorModels={setOpenInstructorModels}
        from={'completed-batches'}
      />
    </LMSLayout>
  );
};

export default CompletedBatches;

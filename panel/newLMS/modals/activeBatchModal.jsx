import { Button, Descriptions, Divider, List, Modal, Space, Tag } from "antd";
import React from "react";
import axios from "axios";

import AddInstructorModal from "./addInstructorModal";
import { API } from "../../../config/API";
import AddStuModal from "./addStudentsModal";
import { toast } from "react-hot-toast";

const ActiveBatchModels = ({
  setOpen,
  open,
  current,
  openStudentModal,
  setOpenStudentModal,
  setCurrent,
  openInstructorModels,
  setOpenInstructorModels,
  from = "active-batches",
}) => {
  const UnAssigned = async (sID, bID) => {
    try {
      let ok = confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.put(
          `${API}/lms/remove/${sID}/${bID}/student`
        );
        if (data.ok) {
          toast.success("Student UnAssigned");
          setCurrent({
            ...current,
            enrolledStudents: current.enrolledStudents.filter(
              (x) => x._id !== sID
            ),
          });
        } else if (data.error) {
          toast.error("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UnAssignedTeachers = async (sID, bID) => {
    try {
      let ok = confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.put(`${API}/lms/remove/${bID}/teacher`, {
          teacherId: sID,
        });
        if (data.ok) {
          toast.success("Instructor UnAssigned", { position: "bottom-center" });
          setCurrent({
            ...current,
            teachers: current.teachers.filter((x) => x._id !== sID),
          });
        } else if (data.error) {
          toast.error("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title={`${current.title}`}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1300}
      >
        <Descriptions
          title={`${current.courseDetails?.title}`}
          bordered
          column={{
            xxl: 4,
            xl: 3,
            lg: 3,
            md: 3,
            sm: 2,
            xs: 1,
          }}
        >
          <Descriptions.Item label="Conducting Days">
            {current.monday && <Tag>Monday</Tag>}
            {current.tuesday && <Tag>Tuesday</Tag>}
            {current.wednesday && <Tag>Wednesday</Tag>}
            {current.thursday && <Tag>Thursday</Tag>}
            {current.friday && <Tag>Friday</Tag>}
            {current.saturday && <Tag>Saturday</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Dates">
            {current.startDate?.substring(0, 10)} to{" "}
            {current.endDate?.substring(0, 10)}{" "}
          </Descriptions.Item>
          <Descriptions.Item label="timing">
            {current.timming}
          </Descriptions.Item>
          <Descriptions.Item label="Durations">
            {current.duration}
          </Descriptions.Item>
          <Descriptions.Item label="Enrollment Limits">
            {current.limit}
          </Descriptions.Item>
          <Descriptions.Item label="Completed">
            {current.completed ? "Yes" : "No"}
          </Descriptions.Item>
          {current.completed === false && (
            <Descriptions.Item label="Settings">
              <Space wrap>
                <Button
                  type="primary"
                  onClick={() => setOpenStudentModal(true)}
                >
                  Add Students
                </Button>
                <Button
                  type="dashed"
                  role="button"
                  onClick={() => setOpenInstructorModels(true)}
                >
                  Assign Instructor to this batch
                </Button>
              </Space>
            </Descriptions.Item>
          )}
        </Descriptions>
        <Divider orientation="left">Enrolled Students</Divider>
        <List
          size="small"
          bordered
          dataSource={current?.enrolledStudents}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Tag
                  role="button"
                  color={!current.completed ? "red" : "gray"}
                  onClick={() =>
                    !current.completed ? UnAssigned(item._id, current._id) : ""
                  }
                >
                  Un Assign
                </Tag>,
              ]}
            >
              <List.Item.Meta title={item.name} description={item._id} />
            </List.Item>
          )}
        />

        <Divider orientation="left">Assigned Teachers</Divider>
        <List
          size="small"
          bordered
          dataSource={current?.teachers}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Tag
                  role="button"
                  color="red"
                  onClick={() => UnAssignedTeachers(item._id, current._id)}
                >
                  Un Assign
                </Tag>,
              ]}
            >
              <List.Item.Meta title={item.name} description={item._id} />
            </List.Item>
          )}
        />
      </Modal>

      {!current.completed && (
        <AddStuModal
          current={current}
          openStudentModal={openStudentModal}
          setOpenStudentModal={setOpenStudentModal}
        />
      )}

      {!current.completed && (
        <AddInstructorModal
          setCurrent={setCurrent}
          current={current}
          openInstructorModels={openInstructorModels}
          setOpenInstructorModels={setOpenInstructorModels}
        />
      )}
    </>
  );
};

export default ActiveBatchModels;

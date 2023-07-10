import React, { useContext } from "react";
import InstHeader from "../../panel/newInstructor/components/InstHeader";
import { AuthContext } from "../../context/auth";
import { List } from "antd";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Link from "next/link";

const InstructorAssignedBatches = () => {
  const [auth] = useContext(AuthContext);
  return (
    <>
      <InstHeader page="contactPage" />
      <div className="container mt-100 ">
        <h4>Welcome {auth?.user?.name},</h4>
        <h5>Your all Assigned Batches</h5>
        <List
          className="card p-3"
          itemLayout="horizontal"
          dataSource={auth?.user?.assignedBatches}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link href={`/inst-test/batch/description/${item._id}`}>
                    {item.title}
                  </Link>
                }
                description={item._id}
              />
              <Link href={`/inst-test/batch/description/${item._id}`}>
                <BsBoxArrowUpRight role="button" size={18} />
              </Link>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default InstructorAssignedBatches;

import React, { useContext } from "react";
import InstHeader from "../../panel/newInstructor/components/InstHeader";
import { AuthContext } from "../../context/auth";
import { List } from "antd";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import Redirecting from "../../panel/common/Redrecting";

const InstructorAssignedBatches = () => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // first of getting current instructor
  const gettingCurrentInstructor = async () => {
    try {
      const { data } = await axios.get(`${API}/current-teacher`);
      if (data.ok) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again ");
      setLoading(false);
      router.push("/");
    }
  };

  useEffect(() => {
    if (auth && auth.token) gettingCurrentInstructor();
  }, [auth && auth.token]);

  return (
    <>
      <InstHeader page="contactPage" />
      {loading ? (
        <Redirecting />
      ) : (
        <div className="container mt-100 ">
          <h4>Welcome {auth?.user?.name},</h4>
          <h5 className="mb-5">Your all Assigned Batches</h5>
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
      )}
    </>
  );
};

export default InstructorAssignedBatches;

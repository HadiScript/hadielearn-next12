import React from "react";
import { CardieBg } from "./firstCol";
import { FaEdit } from "react-icons/fa";
import { Button, Card } from "antd";
import { useRouter } from "next/router";
import ExpLists from "./ExpLists";
import EduList from "./EduList";
import CertLists from "./CertList";
import ProjectList from "./ProjectList";

const SecondCol = ({ profile, loading }) => {
  const router = useRouter();
  return (
    <>
      {loading ? (
        "loading..."
      ) : profile === null ? (
        <div class="col-lg-12" style={{ paddingTop: "0px" }}>
          <Card className="text-center" title="Please update your profile">
            <Button onClick={() => router.push("/my-profile/general")} style={{ ...CardieBg, color: "white" }} icon={<FaEdit />}>
              Create Profile
            </Button>
          </Card>
        </div>
      ) : (
        <div class="col-lg-8" style={{ paddingTop: "0px" }}>
          <Card
            title={
              <div className="d-flex justify-content-between align-items-center">
                <span>About</span>
                <Button onClick={() => router.push("/my-profile/general")} style={{ ...CardieBg, color: "white" }} icon={<FaEdit />}>
                  Edit
                </Button>
              </div>
            }
            className="mt-10"
          >
            <p>{profile?.bio}</p>
          </Card>
          <Card
            className="mt-10"
            title={
              <div className="d-flex justify-content-between align-items-center">
                <span>Skills</span>
                <Button onClick={() => router.push("/my-profile/skills")} style={{ ...CardieBg, color: "white" }} icon={<FaEdit />}>
                  Edit
                </Button>
              </div>
            }
          >
            <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
              {profile?.skills?.map((x, index) => (
                <Button key={index}>{x}</Button>
              ))}
            </div>
          </Card>

          <ExpLists from="main-page" expData={profile?.experience} />
          <EduList from="main-page" eduList={profile?.education} />
          <CertLists from="main-page" certData={profile?.certificates} />
          <ProjectList from="main-page" projectData={profile?.portfolio} />
        </div>
      )}
    </>
  );
};

export default SecondCol;

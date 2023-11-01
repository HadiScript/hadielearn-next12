import React from "react";
import { CardieBg } from "./firstCol";
import { EditFilled } from "@ant-design/icons";
import { Avatar, Button, Card, List } from "antd";
import { FaAndroid, FaAngular, FaFacebook, FaInstagram, FaLinkedin, FaNodeJs, FaReact } from "react-icons/fa";
import { useRouter } from "next/router";
import ExpLists from "./ExpLists";
import EduList from "./EduList";
import CertLists from "./CertList";
import ProjectList from "./ProjectList";

const data = [
  {
    title: "Full Stack Developer",
    at: "Turing",
    type: "full time",
    from: "Feb 2023",
    to: "Present",
    skills: ["ReactJs", "NodeJS", "Html/css", "Agile Development", "Mean Stack"],
  },
  {
    title: "Frontend Developer",
    at: "Pure Logics",
    type: "full time",
    from: "Feb 2021",
    to: "Feb 2023",
    skills: ["ReactJs", "NodeJS", "Html/css", "Agile Development", "Mean Stack"],
  },
  {
    title: "Blockchain Developer",
    at: "10Pearls",
    type: "full time",
    from: "Feb 2020",
    to: "Feb 2021",
    skills: ["ReactJs", "NodeJS", "Html/css", "Agile Development", "Mean Stack"],
  },
];

const SecondCol = ({ profile, loading }) => {
  const router = useRouter();
  return (
    <>
      {loading ? (
        "loading..."
      ) : profile === null ? (
        <div class="col-lg-12" style={{ paddingTop: "0px" }}>
          <Card className="text-center" title="Please update your profile">
            <Button onClick={() => router.push("/my-profile/general")} style={{ ...CardieBg, color: "white" }} icon={<EditFilled />}>
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
                <Button onClick={() => router.push("/my-profile/general")} style={{ ...CardieBg, color: "white" }} icon={<EditFilled />}>
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
                <Button onClick={() => router.push("/my-profile/skills")} style={{ ...CardieBg, color: "white" }} icon={<EditFilled />}>
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

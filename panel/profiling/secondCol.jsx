import React from "react";
import { CardieBg } from "./firstCol";
import { EditFilled } from "@ant-design/icons";
import { Avatar, Button, Card, List } from "antd";
import {
  FaAndroid,
  FaAngular,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { useRouter } from "next/router";

const data = [
  {
    title: "Full Stack Developer",
    at: "Turing",
    type: "full time",
    from: "Feb 2023",
    to: "Present",
    skills: [
      "ReactJs",
      "NodeJS",
      "Html/css",
      "Agile Development",
      "Mean Stack",
    ],
  },
  {
    title: "Frontend Developer",
    at: "Pure Logics",
    type: "full time",
    from: "Feb 2021",
    to: "Feb 2023",
    skills: [
      "ReactJs",
      "NodeJS",
      "Html/css",
      "Agile Development",
      "Mean Stack",
    ],
  },
  {
    title: "Blockchain Developer",
    at: "10Pearls",
    type: "full time",
    from: "Feb 2020",
    to: "Feb 2021",
    skills: [
      "ReactJs",
      "NodeJS",
      "Html/css",
      "Agile Development",
      "Mean Stack",
    ],
  },
];

const SecondCol = ({ profile }) => {
  const router = useRouter();
  return (
    <>
      {profile === null ? (
        <div class="col-lg-8" style={{ paddingTop: "0px" }}>
          <Card className="text-center" title="Please update your profile">
            <Button
              onClick={() => router.push("/my-profile/general")}
              style={{ ...CardieBg, color: "white" }}
              icon={<EditFilled />}
            >
              Edit Profile
            </Button>
          </Card>
        </div>
      ) : (
        <div class="col-lg-8" style={{ paddingTop: "0px" }}>
          <Card
            title={
              <div className="d-flex justify-content-between align-items-center">
                <span>About</span>
                <Button
                  style={{ ...CardieBg, color: "white" }}
                  icon={<EditFilled />}
                >
                  Edit
                </Button>
              </div>
            }
            className="mt-10"
          >
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
            </p>
          </Card>
          <Card
            className="mt-10"
            title={
              <div className="d-flex justify-content-between align-items-center">
                <span>Skills</span>
                <Button
                  style={{ ...CardieBg, color: "white" }}
                  icon={<EditFilled />}
                >
                  Edit
                </Button>
              </div>
            }
          >
            <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
              <Button icon={<FaReact />}>ReactJs</Button>
              <Button icon={<FaNodeJs />}>NodeJs</Button>
              <Button icon={<FaAndroid />}>Android</Button>
              <Button icon={<FaAngular />}>Angular Js</Button>
              <Button icon={<FaAngular />}>Angular Js</Button>
              <Button icon={<FaAngular />}>Angular Js</Button>
            </div>
          </Card>

          <Card
            title={
              <div className="d-flex justify-content-between align-items-center">
                <span>Experience</span>
                <Button
                  style={{ ...CardieBg, color: "white" }}
                  icon={<EditFilled />}
                >
                  Edit
                </Button>
              </div>
            }
            className="mt-10"
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`http://localhost:3000/assets/images/primary.svg`}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={
                      <div>
                        <b>
                          {item.at} | {item.type}
                        </b>
                        <br />
                        <>
                          {item.from} - {item.to}
                        </>
                        <br />
                        <b>
                          {" "}
                          Skills:{" "}
                          {item.skills.map((x) => (
                            <>{x} - </>
                          ))}{" "}
                        </b>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card
            title={
              <div className="d-flex justify-content-between align-items-center">
                <span>Certificates</span>
                <Button
                  style={{ ...CardieBg, color: "white" }}
                  icon={<EditFilled />}
                >
                  Edit
                </Button>
              </div>
            }
            className="mt-10"
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`http://localhost:3000/assets/images/primary.svg`}
                      />
                    }
                    title={
                      <a href="https://ant.design">
                        {item.title} - Mastery Course
                      </a>
                    }
                    description={
                      <div>
                        <b>
                          {item.from} - {item.to}
                        </b>
                        <br />
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      )}
    </>
  );
};

export default SecondCol;

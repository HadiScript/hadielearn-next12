import { Avatar, Button, Card, List, Tag } from "antd";
import React from "react";
import TopHeader from "../components/partials/TopHeader";
import PagesNavbar from "../components/partials/PageNavbar";
import {
  FaAndroid,
  FaAngular,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { BsPen, BsPersonDash, BsYoutube } from "react-icons/bs";
import { BiDownload, BiEdit } from "react-icons/bi";
import Footer from "../components/partials/Footer";
import { EditFilled } from "@ant-design/icons";

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

const CardieBg = {
  backgroundImage: `linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)`,
};

const Profile = () => {
  return (
    <>
      <TopHeader />
      <div
        class="container rounded bg-white mb-5"
        style={{ paddingTop: "100px" }}
      >
        <div class="row">
          {/* first col  */}
          <div class="col-lg-3 border-right ">
            <Card style={CardieBg}>
              <div class="d-flex flex-column align-items-center text-center p-3 pt-5">
                <img
                  class="rounded-circle mt-5"
                  width="150px"
                  src="https://res.cloudinary.com/ddwj52jk1/image/upload/v1686835722/sv3gvpbid5b6sshmi2hs.jpg"
                />
                <span class="text-light ">
                  <b>Hadi Raza</b>
                </span>
                <span class="text-light">
                  MERN Stack Developer - Working on Solidity with Truffle and
                  Hardhat
                </span>
              </div>
              <hr />
              <div className="d-flex flex-wrap justify-content-center">
                {[1, 2, 2, 3, 4, 5].map((x) => (
                  <Tag className="my-1" color="green">
                    ReactJs
                  </Tag>
                ))}
              </div>

              <hr />
              <span className="d-flex justify-content-center align-items-center gap-3">
                <FaInstagram size={25} color="white" />
                <FaLinkedin size={25} color="white" />
                <FaFacebook size={25} color="white" />
                <BsYoutube size={25} color="white" />
              </span>
            </Card>
          </div>

          {/* middle col */}
          <div class="col-lg-5" style={{ paddingTop: "0px" }}>
            {/* <div className="d-flex justify-content-end align-items-center gap-2 ">
              <Button style={{ ...CardieBg, color: "white" }} icon={<BsPen />}>
                Edit Profile
              </Button>
              <Button
                style={{ ...CardieBg, color: "white" }}
                icon={<BiDownload />}
              >
                Resume
              </Button>
            </div> */}
            <Card
              title={
                <div className="d-flex justify-content-between align-items-center">
                  <span>About</span>
                  <Button
                    style={{ ...CardieBg, color: "white" }}
                    icon={<EditFilled />}
                  >
                    Edit Profile
                  </Button>
                </div>
              }
              className="mt-10"
            >
              <p>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before final copy is available.
              </p>
            </Card>
            <Card className="mt-10">
              <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
                <Button icon={<FaReact />}>ReactJs</Button>
                <Button icon={<FaNodeJs />}>NodeJs</Button>
                <Button icon={<FaAndroid />}>Android</Button>
                <Button icon={<FaAngular />}>Angular Js</Button>
                <Button icon={<FaAngular />}>Angular Js</Button>
                <Button icon={<FaAngular />}>Angular Js</Button>
              </div>
            </Card>

            <Card title="Experience" className="mt-10">
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

            <Card title="Certificates">
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

          {/* third col */}
          <div class="col-lg-4 mt-5">
            <h4 class="text-right">Relavent Courses</h4>
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x) => (
              <Card className="mb-3">
                <div class="d-flex justify-content-start align-items-start gap-2">
                  <img
                    src="https://res.cloudinary.com/ddwj52jk1/image/upload/v1692952482/vibih3xymoebbjdgxpjy.jpg"
                    width={80}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid rgba(15, 63, 93, 1)",
                    }}
                  />
                  <span class="d-flex flex-column justify-content-start align-items-start ">
                    <h6>Shopify and wordpress mastery course</h6>
                    <Tag color="rgba(15, 63, 93, 1)">Enroll</Tag>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

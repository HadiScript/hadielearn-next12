import { Button, Card, Tag } from "antd";
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

const CardieBg = {
  backgroundImage: `linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)`,
};

const ButtonBg = {
  backgroundColor: "rgba(15, 63, 93, 1)",
};

const Profile = () => {
  console.log("here is ");
  return <h1>wokring on it</h1>;
  return (
    <>
      <TopHeader />
      <div
        class="container rounded bg-white mb-5"
        style={{ paddingTop: "100px" }}
      >
        <div class="row">
          {/* first col  */}
          <div class="col-lg-3 border-right">
            <Card style={CardieBg}>
              <div class="d-flex flex-column align-items-center text-center p-3 pt-5">
                <img
                  class="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
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
              <span>
                {[1, 2, 2, 3, 4, 5].map((x) => (
                  <Tag className="my-1" color="green">
                    ReactJs
                  </Tag>
                ))}
              </span>

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
          <div class="col-lg-5 border-right">
            <div className="d-flex justify-content-end align-items-center gap-2 ">
              <Button style={{ ...CardieBg, color: "white" }} icon={<BsPen />}>
                Edit Profile
              </Button>
              <Button
                style={{ ...CardieBg, color: "white" }}
                icon={<BiDownload />}
              >
                Resume
              </Button>
            </div>
            <Card title={"About"} className="mt-10">
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
          </div>

          {/* third col */}
          <div class="col-lg-4">
            <h4 class="text-right">Relavent Courses</h4>
            {[1, 1, 1, 1, 1, 1].map((x) => (
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
    </>
  );
};

export default Profile;

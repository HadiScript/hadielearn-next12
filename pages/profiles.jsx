import React from "react";
import TopHeader from "../components/partials/TopHeader";
import { Button, Card, Col, Row, Tag } from "antd";
import Footer from "../components/partials/Footer";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

const CardieBg = {
  backgroundImage: `linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)`,
};

const Profiles = () => {
  const router = useRouter();
  return <>working on it :)</>;
  return (
    <>
      <img src="/assets/image/bg-gird1.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} />
      <TopHeader />

      <div className="position-relative">
        <div className="container d-flex flex-column justify-content-center align-items-center mt-150">
          {/* <Fade bottom cascade> */}
          <div className="page__title-content">
            <h1 className="pragrams-h1 text-center" style={{ fontSize: "40px", color: "#0f3f5d" }}>
              Programs to level up your digital skills
            </h1>
          </div>
          <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
            <em>
              We have got all your digital skill training needs covered with our extensive offered program list. All you have to do is to explore our program list, choose the
              program of your choice, and take your first step toward financial independence.
            </em>
          </p>
          {/* </Fade> */}
        </div>

        {/* <Fade bottom cascade> */}
        <div className="container">
          <Row className="justify-content-center align-items-center">
            <Col md="5" xs="12" className="mb-2">
              <form action="">
                <label className="sr-only" for="inlineFormInputGroupUsername">
                  Username
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div
                      style={{
                        backgroundColor: "#0f3f5d",
                        border: "none",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                        color: "white",
                        height: "40px",
                      }}
                      className="input-group-text"
                    >
                      <FaSearch color="white" />
                    </div>
                  </div>
                  <input
                    style={{ border: "1px solid #0f3f5d" }}
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroupUsername"
                    placeholder="Search course here"
                    // value={searchQuery}
                    // onChange={handleSearchChange}
                  />
                </div>
              </form>
            </Col>
          </Row>
        </div>
        {/* </Fade> */}
      </div>

      <div class="container">
        <div class="container rounded mb-5" style={{ paddingTop: "150px" }}>
          <div class="row">
            {/* first col  */}
            {[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x) => (
              <div class="col-lg-3 border-right mb-30 ">
                <Card className="profiles-card" onClick={() => router.push("/profile")} role="button" style={{ border: "1px solid rgba(15, 63, 93, 1)" }}>
                  <div class="d-flex flex-column align-items-center text-center p-3 pt-5">
                    <img class="rounded-circle mt-5" width="150px" src="https://res.cloudinary.com/ddwj52jk1/image/upload/v1686835722/sv3gvpbid5b6sshmi2hs.jpg" />
                    <span class="text-dark ">
                      <b>Hadi Raza</b>
                    </span>
                    <span class="text-muted">MERN Stack Developer - Working on Solidity with Truffle and Hardhat</span>
                  </div>
                  {/* <hr />
                  <div className="d-flex flex-wrap justify-content-center">
                    {[1, 2, 2, 3, 4, 5].map((x) => (
                      <Tag className="my-1" color="green">
                        ReactJs
                      </Tag>
                    ))}
                  </div> */}

                  {/* <hr /> */}
                  {/* <span className="d-flex justify-content-center align-items-center gap-3">
                  <FaInstagram size={25} color="white" />
                  <FaLinkedin size={25} color="white" />
                  <FaFacebook size={25} color="white" />
                  <BsYoutube size={25} color="white" />
                </span> */}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profiles;

import React, { useEffect, useState } from "react";
import TopHeader from "../components/partials/TopHeader";
import { Card, Col, Row, Tag } from "antd";
import Footer from "../components/partials/Footer";
import { FaSearch, FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";
import { API } from "../config/API";
import toast from "react-hot-toast";
import SEOHead from "../components/functions/SEOHead";
import { BsShieldCheck } from "react-icons/bs";
import { toImageUrl } from "../utils/ImageURL";

const Profiles = ({ profiles, error }) => {
  // const router = useRouter();
  // const [profileList, setProfileList] = useState(profiles);
  // if (error) {
  //   return toast.error(error);
  // }

  // const [searchQuery, setSearchQuery] = useState("");

  // const gettingSearchedProfiles = async () => {
  //   try {
  //     const { data } = await axios.get(`${API}/profiles?term=${searchQuery}`);
  //     setProfileList(data.profiles);
  //   } catch (error) {
  //     console.error("Failed to fetch profiles:", error);
  //     toast.error("Failed, try again.");
  //   }
  // };

  // useEffect(() => {
  //   gettingSearchedProfiles();
  // }, [searchQuery]);
  return <>Working on it;</>;
  return (
    <>
      <SEOHead title={"Hadi Elearning Profiles"} desc={`Hadi Elearning `} conLink={`https://hadielearning.com/profiles`} />

      <img src="/assets/image/bg-gird1.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} />
      <TopHeader />

      {/* {JSON.stringify(profileList)} */}

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
              <form>
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
                    style={{ border: "1px solid #0f3f5d", outline: "none" }}
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroupUsername"
                    placeholder="Search user by name and skills"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </div>

      <div className="container">
        <div className="container rounded mb-5 " style={{ paddingTop: "80px" }}>
          <div className="row">
            {/* first col  */}
            {profileList?.map((x, index) => (
              <div className="col-lg-3 border-right mb-30 " key={index}>
                <Card className="profiles-card" onClick={() => router.push(`/profile/${x?._id}`)} role="button" style={{ border: "1px solid rgba(15, 63, 93, 1)" }}>
                  <div className="d-flex flex-column align-items-center text-center p-3 pt-5">
                    {x?.user?.image?.url ? (
                      <img className="rounded-circle mt-5" height={150} width={150} src={toImageUrl(x?.user?.image?.url)} />
                    ) : (
                      <FaUser size={150} color="gray" />
                    )}

                    <span className="d-flex align-items-center gap-2 text-dark mt-2">
                      <b>{x?.user?.name} </b> {x?.user?.role === "instructor" && <BsShieldCheck color="blue" />}
                    </span>
                    <span className="text-muted">{x?.bio.slice(0, 80)}...</span>
                    <span className="text-muted mt-3">
                      {x?.skills?.slice(0, 3).map((x, index) => (
                        <Tag key={index}>{x}</Tag>
                      ))}
                    </span>
                  </div>
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

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(`${API}/profiles`);
    return {
      props: {
        profiles: data.profiles,
      },
    };
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    return {
      props: {
        profiles: [],
        error: "Failed to fetch profiles.",
      },
    };
  }
}
export default Profiles;

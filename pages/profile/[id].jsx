import { Button, Card, List, Tag } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FaBehance, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaUser, FaYoutube } from "react-icons/fa";
import TopHeader from "../../components/partials/TopHeader";
import Footer from "../../components/partials/Footer";
import { useRouter } from "next/router";
import axios from "axios";
import { API } from "../../config/API";
import moment from "moment";
import SEOHead from "../../components/functions/SEOHead";

import { toImageUrl } from "../../utils/ImageURL";
import { BsShieldCheck } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { AuthContext } from "../../context/auth";
import useCourses from "../../panel/newLMS/hooks/useCourses";
import Link from "next/link";

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

const CardieBg = {
  backgroundImage: `linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)`,
};
const PublicProfileDetails = ({ profile, error }) => {
  const router = useRouter();
  const { id } = router.query;

  const { courses } = useCourses({ want: "shorts" });

  return (
    <>
      <SEOHead title={profile?.user?.name?.toUpperCase()} desc={`Hadi Elearning | ${profile?.bio}`} conLink={`https://hadielearning.com/profile/${id}`} />
      <TopHeader />

      <div className="container rounded bg-white mb-5" style={{ paddingTop: "100px" }}>
        <div className="row">
          {/* first col */}
          <div className="col-lg-3 border-right ">
            <Card className="CardieBg">
              <div className="d-flex flex-column align-items-center text-center p-2 pt-5">
                {profile?.user?.image?.url ? (
                  <img className="rounded-circle mt-5" height={150} width={150} src={toImageUrl(profile?.user?.image?.url)} />
                ) : (
                  <FaUser size={150} color="gray" />
                )}
                <span className="text-light mt-2">
                  <b>
                    {profile?.user?.name} {profile?.user?.role === "instructor" && <BsShieldCheck />}{" "}
                  </b>
                </span>
                {/* <span className="text-light">{profile?.bio?.slice(0, 80)}...</span> */}
                <span className="text-light">{profile?.status}</span>
                {profile?.location && (
                  <span className="d-flex align-items-center gap-1 text-light">
                    {profile?.location} <MdLocationOn />
                  </span>
                )}
              </div>
              {profile.skills.length > 0 && (
                <>
                  <hr />
                  <div className="d-flex flex-wrap justify-content-center">
                    {profile?.skills.slice(0, 3).map((x) => (
                      <Tag className="my-1" color="green">
                        {x}
                      </Tag>
                    ))}
                  </div>
                </>
              )}

              {profile.social && (
                <>
                  <hr />
                  <span className="d-flex justify-content-center align-items-center gap-3">
                    {profile?.social?.instagram && (
                      <a href={profile?.social?.instagram} target="_blank">
                        <FaInstagram size={25} color="white" />
                      </a>
                    )}
                    {profile?.social?.facebook && (
                      <a href={profile?.social?.facebook} target="_blank">
                        <FaFacebook size={25} color="white" />
                      </a>
                    )}
                    {profile?.social?.linkedin && (
                      <a href={profile?.social?.linkedin} target="_blank">
                        <FaLinkedin size={25} color="white" />
                      </a>
                    )}
                    {profile?.social?.behance && (
                      <a href={profile?.social?.behance} target="_blank">
                        <FaBehance size={25} color="white" />
                      </a>
                    )}
                    {profile?.social?.github && (
                      <a href={profile?.social?.github} target="_blank">
                        <FaGithub size={25} color="white" />
                      </a>
                    )}
                    {profile?.social?.twitter && (
                      <a href={profile?.social?.twitter} target="_blank">
                        <FaTwitter size={25} color="white" />
                      </a>
                    )}
                    {profile?.social?.youtube && (
                      <a href={profile?.social?.youtube} target="_blank">
                        <FaYoutube size={25} color="white" />
                      </a>
                    )}
                  </span>
                </>
              )}
            </Card>
          </div>

          {/* second col */}
          <div id="color" className="col-lg-5" style={{ paddingTop: "0px" }}>
            <Card title="Bio" className="mt-10">
              <p>{profile?.bio}</p>
            </Card>

            {profile?.skills.length > 0 && (
              <Card className="mt-10" title="Skills">
                <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
                  {profile?.skills?.map((x, index) => (
                    <Button key={index}>{x}</Button>
                  ))}
                </div>
              </Card>
            )}

            {profile?.experience.length > 0 && (
              <Card title="Experience" className="mt-10">
                <List
                  itemLayout="horizontal"
                  dataSource={profile?.experience}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        // avatar={<Avatar src={`http://localhost:3000/assets/images/primary.svg`} />}
                        title={<a>{item?.title}</a>}
                        description={
                          <div>
                            <b>
                              {item?.company} | {item?.typeOfJob}
                            </b>
                            <br />
                            <>
                              {moment(item.from).format("MMM Do YY")} - {item?.current ? "Present" : moment(item.to).format("MMM Do YY")}
                            </>
                            <br />
                            <b>{item?.skills}</b>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )}

            {profile?.education.length > 0 && (
              <Card title="Education" className="mt-10">
                <List
                  itemLayout="horizontal"
                  dataSource={profile?.education}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        // avatar={<Avatar src={`http://localhost:3000/assets/images/primary.svg`} />}
                        title={<a>{item?.school}</a>}
                        description={
                          <div>
                            <b>{item?.degree}</b>
                            <br />
                            <>
                              {moment(item.from).format("MMM Do YY")} - {item?.current ? "Present" : moment(item.to).format("MMM Do YY")}
                            </>
                            <br />
                            <spa>{item?.description}</spa>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )}

            {profile?.portfolio.length > 0 && (
              <Card title="Portfolio" className="mt-10">
                <List
                  itemLayout="horizontal"
                  dataSource={profile?.portfolio}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        // avatar={<Avatar src={`http://localhost:3000/assets/images/primary.svg`} />}
                        title={<a>{item?.title}</a>}
                        description={
                          <div>
                            {item?.link && (
                              <a href={item?.link} target="_blank">
                                <b>{item?.link}</b>
                              </a>
                            )}
                            <br />
                            <>
                              {moment(item.from).format("MMM Do YY")} - {item?.current ? "Present" : moment(item.to).format("MMM Do YY")}
                            </>
                            <br />
                            <spa>{item?.description}</spa>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )}

            {profile?.certificates.length > 0 && (
              <Card title="Certificates" className="mt-10">
                <List
                  itemLayout="horizontal"
                  dataSource={profile?.certificates}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        // avatar={<Avatar src={`http://localhost:3000/assets/images/primary.svg`} />}
                        title={<a>{item.title}</a>}
                        description={
                          <div>
                            <b>{item?.platform}</b>
                            <br />
                            <>
                              {moment(item.from).format("MMM Do YY")} - {item?.current ? "Present" : moment(item.to).format("MMM Do YY")}
                            </>
                            <br />
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )}
          </div>

          {/* third col */}
          <div className="col-lg-4 mt-5">
            <h4 className="text-right">Relavent Courses</h4>
            {courses?.map((x) => (
              <Card className="mb-3">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <img
                    src={x?.image?.url}
                    width={80}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid rgba(15, 63, 93, 1)",
                    }}
                  />
                  <span className="d-flex flex-column justify-content-start align-items-start ">
                    <Link href={`/program/${x?.slug}`}>
                      <h6 role="button">{x?.title}</h6>
                    </Link>
                    <Tag color="rgba(15, 63, 93, 1)">Enroll</Tag>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4" />
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const { data } = await axios.get(`${API}/profile/${params.id}`);
    return {
      props: {
        profile: data.profile,
      },
    };
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    return {
      props: {
        profile: {},
        error: "Failed to fetch profiles.",
      },
    };
  }
}

export default PublicProfileDetails;

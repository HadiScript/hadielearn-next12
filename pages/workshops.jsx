import React, { useState } from "react";
import Tops from "../components/functions/Tops";
import Footer from "../components/partials/Footer";
import LeftSideBar from "../components/workshops/LeftSideBar";
import axios from "axios";
import Link from "next/link";
import { CgArrowLongRight } from "react-icons/cg";
import { API } from "../config/API";
import ModalVideo from "react-modal-video";
import { FiPlay } from "react-icons/fi";
import { tempData } from "../data/tempData";
import { toImageUrl } from "../utils/ImageURL";

const VideoPopup = ({ videoId, isVideoOpen, setIsVideoOpen }) => {
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isVideoOpen}
        videoId={videoId}
        onClose={() => setIsVideoOpen(false)}
      />
    </>
  );
};

const Workshops = ({ workshops }) => {
  const [workshop_data, setWorkshop_data] = useState(workshops);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  let video_icon = true;

  return (
    <>
      <Tops
        headTitle={
          "Join our workshops to get the most out of web based learning"
        }
        headDesc={
          "Register for one of our workshops and unlock your potential to conquer the digital world with the power of one of the best online education platforms, Hadi e-learning."
        }
        conLink={"https://hadielearning.com/workshops"}
        breadTitle={"Workshops"}
        breadSubTtile={"All Workshops"}
        image={"/assets/images/bread.jpg"}
      />

      {/* <VideoPopup
        videoId="yJg-Y5byMMw"
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
      /> */}

      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__wrapper mr-50">
                <div className="section__title section__title-3 ">
                  <h2>Free Workshops</h2>
                </div>
                <p>
                  Join one of our workshops to explore various digital niches
                  and endless career options you can pursue for a prosperous
                  future.
                </p>
                <br />
                <br />

                {/* starting here */}
                {/* {JSON.stringify(tempData)} */}
                <div className="blog__item-2 mb-50 fix">
                  <div className={`blog__thumb-2  w-img fix p-relative`}>
                    <Link href={`/workshop-detail/${tempData.slug} `}>
                      <img
                        src={"assets/images/check/workshop2.webp"}
                        alt="workshop_image"
                      />
                    </Link>
                  </div>

                  <div className="blog__content-2">
                    <div className="blog__meta-2 mb-15 d-sm-flex align-items-center">
                      <div className="d-flex align-items-center  pr-20 mr-20">
                        <Link href={`/workshop-detail/${tempData.slug} `}>
                          <img
                            className="pr-10"
                            src={
                              "https://res.cloudinary.com/ddwj52jk1/image/upload/v1686918809/uhhte1owvvoelnilnnhg.jpg"
                            }
                            alt=""
                            height={80}
                          />
                        </Link>
                        <div>
                          <span
                            style={{ fontWeight: "bold", fontSize: "18px" }}
                          >
                            {tempData.instructor?.name}
                          </span>
                          <br />
                          <small style={{ fontSize: "14px" }}>
                            {tempData.instructor?.exp}
                          </small>
                          <br />
                          <small style={{ fontSize: "14px" }}>
                            {tempData.meetingTiming}
                          </small>
                        </div>
                      </div>
                    </div>
                    <br />

                    <h3>
                      <Link href={`/workshop-detail/${tempData.slug} `}>
                        {tempData.title}
                      </Link>
                    </h3>

                    <p>
                      <div
                      // dangerouslySetInnerHTML={{
                      //   __html: tempData.content.substring(0, 150) + "...",
                      // }}
                      >
                        {tempData.content?.substring(0, 150) + "..."}
                      </div>
                    </p>
                    <div className="blog__btn d-sm-flex justify-content-between">
                      <div className="blog__btn">
                        <Link href={`/workshop-detail/${tempData.slug} `}>
                          <span className="link-btn-2">
                            Read More
                            <i>
                              <CgArrowLongRight />
                            </i>
                            <i>
                              <CgArrowLongRight />
                            </i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {workshop_data.map((x, index) => (
                  <div key={index} className="blog__item-2 mb-50 fix">
                    <div className={`blog__thumb-2  w-img fix p-relative`}>
                      <Link href={`/workshop-detail/${x.slug} `}>
                        {x.image.url.includes("uploads") ? (
                          <img
                            src={toImageUrl(x.image?.url)}
                            alt="workshop_image"
                          />
                        ) : (
                          <img src={x.image?.url} alt="workshop_image" />
                        )}
                      </Link>

                      {/* <div className="blog__play p-absolute">
                        <button
                          onClick={() => setIsVideoOpen(true)}
                          data-fancybox
                        >
                          <i>
                            <FiPlay color="#082d44" />
                          </i>
                        </button>
                      </div> */}
                    </div>

                    <div className="blog__content-2">
                      <div className="blog__meta-2 mb-15 d-sm-flex align-items-center">
                        <div className="d-flex align-items-center  pr-20 mr-20">
                          <Link href={`/workshop-detail/${x.slug} `}>
                            <img
                              className="pr-10"
                              src={x.instructor?.image?.url}
                              alt=""
                              height={80}
                            />
                          </Link>
                          <div>
                            <span
                              style={{ fontWeight: "bold", fontSize: "18px" }}
                            >
                              {x.instructor?.name}
                            </span>
                            <br />
                            <small style={{ fontSize: "14px" }}>
                              {x.instructor?.exp}
                            </small>
                            <br />
                            <small style={{ fontSize: "14px" }}>
                              {x.meetingTiming}
                            </small>
                          </div>
                        </div>
                      </div>
                      <br />

                      <h3>
                        <Link href={`/workshop-detail/${x.slug} `}>
                          {x.title}
                        </Link>
                      </h3>

                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: x.content.substring(0, 150) + "...",
                          }}
                        />
                      </p>
                      <div className="blog__btn d-sm-flex justify-content-between">
                        <div className="blog__btn">
                          <Link href={`/workshop-detail/${x.slug} `}>
                            <span className="link-btn-2">
                              Read More
                              <i>
                                <CgArrowLongRight />
                              </i>
                              <i>
                                <CgArrowLongRight />
                              </i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <LeftSideBar />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/all-workshops`);
  return {
    props: {
      workshops: data.allworkshops,
    },
  };
}

// export async function getServerSideProps() {
//   const { data } = await axios.get(`/workshops`);
//   return {
//     props: {
//       workshops: data.allworkshops,
//     },
//   };
// }

export default Workshops;

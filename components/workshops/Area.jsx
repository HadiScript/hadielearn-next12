import React from "react";

import { workshop_data } from "../../data/workshop_data";
import Item from "./Item";
import LeftSideBar from "./LeftSideBar";

const Area = () => {
  return (
    <>
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__wrapper mr-50">
                {/* <h2 style={{ fontSize: "50px" }}>Free Workshops</h2> */}
                <div className="section__title section__title-3 ">
                  <h2>Free Workshops</h2>
                </div>
                <p>Join one of our workshops to explore various digital niches and endless career options you can pursue for a prosperous future.</p>
                <br />
                <br />
                {workshop_data.map((x, index) => (
                  <Item
                    key={index}
                    image={x.image}
                    title={x.title}
                    heading={x.heading1}
                    content={x.content1}
                    outlines={x.outline}
                    slug={x.slug}
                    user_image={x.userImage}
                    name={x.userName}
                    userExp={x.userExp}
                    outlineLine={x.outlineLine}
                    dateAndTime={x.dateAndTime}
                    conclusion={x.conclusion}
                    breadcrumb={x.breadcrumb}
                  />
                ))}
              </div>
            </div>

            <LeftSideBar />
          </div>
        </div>
      </section>
    </>
  );
};

export default Area;

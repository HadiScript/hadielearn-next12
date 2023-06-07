import React from "react";

const LeftSideBar = () => {
  return (
    <>
      <div className="col-xl-4 col-lg-4">
        <div className="blog__sidebar">
          <div className="sidebar__widget mb-50 ">
            <div className="sidebar__widget-title mb-50">
              <h4>Popular Tags</h4>
            </div>
            <div className="sidebar__widget-content">
              <div className="tags">
                <p to="#">DigitalSkillsWorkshop</p>
                <p to="#">TechTraining</p>
                <p to="#">DigitalLiteracy</p>
                <p to="#">TechForAll</p>
                <p to="#">DigitalEmpowerment</p>
                <p to="#">DigitalInclusion</p>
                <p to="#">DigitalTransformation</p>
                <p to="#">TechSkillsForAll</p>
                <p to="#">FutureOfWork</p>
                <p to="#">BridgingTheDigitalDivide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;

import React from "react";
import dynamic from "next/dynamic";

const primary = " #0f3f5d";
const secondary = "#18594d";

const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
});

const SingleCount = ({ counter, title, color }) => {
  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div className="counter__item text-center mb-30">
          <h2 style={{ color: `${color === "primary" ? primary : secondary}` }} className={`counter `}>
            <CountUp end={counter} duration={8} /> +
          </h2>
          <span style={{ color: `${color === "primary" ? primary : secondary}` }}>{title}</span>
        </div>
      </div>
    </>
  );
};

const Stats = () => {
  return (
    <>
      <section className="counter__area pt-140 pb-20">
        <div className="container">
          <div className="row">
            <SingleCount counter={1000} title="Live classes" color="primary" />
            <SingleCount counter={20000} title="Enrolled Students" color="secondary" />
            <SingleCount counter={3000} title="Students on waitlist" color="primary" />
            <SingleCount counter={15000} title="Queries answered" color="secondary" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;

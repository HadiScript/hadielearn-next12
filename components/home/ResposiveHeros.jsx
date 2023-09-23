import React from "react";
// import "./heros.css";
import TopHeader from "../partials/TopHeader";
import Hero from "./Hero";
import PagesNavbar from "../partials/PageNavbar";
import MobHero from "./MobHero";

const ResponsiveHeros = () => {
  return (
    <>
      <div id="mobile">
        <PagesNavbar />
        <MobHero />
      </div>
      <div id="web">
        <img
          src="/assets/image/bg-gird1.jpg"
          alt="background"
          className="position-absolute "
          style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }}
        />
        <TopHeader />
        <Hero />
      </div>
    </>
  );
};

export default ResponsiveHeros;

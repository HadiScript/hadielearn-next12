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
        <TopHeader />
        <Hero />
      </div>
    </>
  );
};

export default ResponsiveHeros;

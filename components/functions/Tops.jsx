import React from "react";
import SEOHead from "./SEOHead";
import Breadcrumbs from "../partials/Breadcrumbs";
import PagesNavbar from "../partials/PageNavbar";

const Tops = ({ headTitle, headDesc, conLink, image, breadTitle, breadSubTtile }) => {
  return (
    <>
      <SEOHead title={headTitle} desc={headDesc} conLink={conLink} />
      <PagesNavbar />
      <Breadcrumbs title={breadTitle} subtitle={breadSubTtile} image={image} />
    </>
  );
};

export default Tops;

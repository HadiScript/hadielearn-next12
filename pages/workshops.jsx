import React from "react";
import Tops from "../components/functions/Tops";
import Area from "../components/workshops/Area";
import Footer from "../components/partials/Footer";

const Workshops = () => {
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
      <Area />
      <Footer />
    </>
  );
};

export default Workshops;

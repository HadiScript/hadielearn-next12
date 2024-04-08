import React, { useState } from "react";
import Tops from "../components/functions/Tops";
import CTA from "../components/partials/CTA";
import Footer from "../components/partials/Footer";
import FAQs from "./faqs";
import FreeHowItWorks from "../components/ui/FreeHowItWorks";
import AdvHowItWorks from "../components/ui/AdvHowItWorks";

const howItWorks = () => {

  const [which, setWhich] = useState('adv')
  const active = { backgroundColor: "#0f3f5d", color: "white" }

  return (
    <>
      <Tops
        headTitle={
          "How our best online learning platform, Hadi e-learning works"
        }
        headDesc={
          "Go through these simple steps and enroll now in the most suitable course to make your mark in this digital world with the best online learning platform, hadi e-learning."
        }
        conLink={"https://hadielearning.com/how-it-works"}
        breadTitle={"How it works?"}
        breadSubTtile={"How to join us?"}
        image={"/assets/images/bread-work.jpg"}
      />

      {/* start */}

      <div className="container pt-90">
        <div className="d-flex justify-content-center align-items-center" role="button">
          <div className="rounded-3 d-flex justify-content-between align-items-center gap-3" >
            <div className="py-2 px-3 rounded-3" style={which === 'free' ? active : {}} onClick={() => setWhich('free')}>Free Courses</div>
            <div className="py-2 px-3 rounded-3" style={which === 'adv' ? active : {}} onClick={() => setWhich('adv')}>Advance Courses</div>
          </div>
        </div>


        {which === 'free' && <FreeHowItWorks />}
        {which === 'adv' && <AdvHowItWorks />}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src="/assets/images/flow/stars.png" />
          <div>
            <h2 className="star-heading">
              Brighten up your future with our specially designed programs
            </h2>
          </div>
        </div>

        <CTA />
        {/* <Price /> */}

        {/* faqs */}
        <FAQs list={3} component={false} />
      </div>
      {/* ends */}

      <Footer />
    </>
  );
};

export default howItWorks;

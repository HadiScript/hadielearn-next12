import React from "react";
// import "./bar.css";

import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = (props) => {
  var stepPercentage = 0;

  if (props.currentStep === 1) {
    stepPercentage = 0;
  } else if (props.currentStep === 2) {
    stepPercentage = 34;
  } else if (props.currentStep === 3) {
    stepPercentage = 68;
  } else if (props.currentStep === 4) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage} filledBackground="linear-gradient(to right, #0f3f5d4f, #0f3f5d)">
      <Step>
        {({ accomplished, index }) => (
          <div
            style={{
              backgroundColor: "#0f3f5d",
              color: "white",
              padding: "5px 6px",
              borderRadius: "50%",
              fontSize: "12px",
            }}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            style={{
              backgroundColor: "#0f3f5d",
              color: "white",
              padding: "5px 6px",
              borderRadius: "50%",
              fontSize: "12px",
            }}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            style={{
              backgroundColor: "#0f3f5d",
              color: "white",
              padding: "5px 6px",
              borderRadius: "50%",
              fontSize: "12px",
            }}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            style={{
              backgroundColor: "#0f3f5d",
              color: "white",
              padding: "5px 6px",
              borderRadius: "50%",
              fontSize: "12px",
            }}
          >
            {index + 1}
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;

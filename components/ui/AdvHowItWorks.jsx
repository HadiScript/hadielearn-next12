import { Fade } from "react-reveal"

const AdvHowItWorks = () => {
  return (
    <div className="boxes">
      <Fade bottom cascade>
        <div id="leftBox">
          <h1>01</h1>
          <div className="left-box-content">
            <h2>Browse through our available program list</h2>
          </div>
          <div className="left-box-image">
            <img src="/assets/images/flow/adv/step1.png" />
          </div>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="rightBox">
          <div className="right-box-image">
            <img src="/assets/images/flow/adv/step2.png" />
          </div>

          <div className="right-box-content">
            <h2>
              Chat with our student coordinator to gain insights into your options
            </h2>
          </div>
          <h1>02</h1>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="leftBox2">
          <h1>03</h1>
          <div className="left-box-content2">
            <h2>Select the program that aligns best with your preferences and goals </h2>
          </div>
          <div className="left-box-image2">
            <img src="/assets/images/flow/adv/step3.png" />
          </div>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="rightBox">
          <div className="right-box-image2">
            <img src="/assets/images/flow/adv/step4.png" />
          </div>

          <div className="right-box-content">
            <h2>
              Learn about the course outline, outcomes, and schedules
            </h2>
          </div>

          <h1>04</h1>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="leftBox3">
          <h1>05</h1>
          <div className="left-box-content3">
            <h2>Complete the registration form</h2>
          </div>
          <div className="left-box-image3">
            <img src="/assets/images/flow/adv/step5.png" />
          </div>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="rightBox-pass">
          <div className="right-box-pass-image2">
            <img src="/assets/images/flow/adv/step6.png" />
          </div>

          <div className="right-box-content-pass">
            <div className="">
              <h2 className="text-start">Make the payment for your selected course</h2>

            </div>
          </div>

          <h1>6</h1>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="leftBox3-fail">
          <h1>7</h1>
          <div className="left-box-content3-fail">
            <a href="#leftBox2-fail">
              <h2> Congratulations! You're now enrolled in the Program</h2>

            </a>
          </div>
          <div className="left-box-image3-fail">
            <img src="/assets/images/flow/adv/step7.png" />
          </div>
        </div>
      </Fade>


    </div>

  )
}

export default AdvHowItWorks
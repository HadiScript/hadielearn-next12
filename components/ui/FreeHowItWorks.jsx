import { Fade } from "react-reveal"



const FreeHowItWorks = () => {
  return (
    <div className="boxes">
      <Fade bottom cascade>
        <div id="leftBox">
          <h1>01</h1>
          <div className="left-box-content">
            <h2>Explore our available program list</h2>
          </div>
          <div className="left-box-image">
            <img src="/assets/images/flow/1st.png" />
          </div>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="rightBox">
          <div className="right-box-image">
            <img src="/assets/images/flow/2nd.png" />
          </div>

          <div className="right-box-content">
            <h2>
              Chat with our student coordinator to learn more about your
              options
            </h2>
          </div>
          <h1>02</h1>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="leftBox2">
          <h1>03</h1>
          <div className="left-box-content2">
            <h2>Choose the program that suits you the best </h2>
          </div>
          <div className="left-box-image2">
            <img src="/assets/images/flow/3rd.png" />
          </div>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="rightBox">
          <div className="right-box-image2">
            <img src="/assets/images/flow/4th.png" />
          </div>

          <div className="right-box-content">
            <h2>
              Fill out the registration form and get the link to the
              relevant entry test.
            </h2>
          </div>

          <h1>04</h1>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="leftBox3">
          <h1>05</h1>
          <div className="left-box-content3">
            <h2>Take the Test</h2>
          </div>
          <div className="left-box-image3">
            <img src="/assets/images/flow/5th.png" />
          </div>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="rightBox-pass">
          <div className="right-box-pass-image2">
            <img src="/assets/images/new_flow/Pass.png" />
          </div>

          <div className="right-box-content-pass">
            <div className="">
              <h2 className="text-start">Pass</h2>
              <h5>
                You will be added to the waitlist and will be entertained on
                a First come first serve basis.
              </h5>
            </div>
          </div>

          <h1>5.1</h1>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="leftBox3-fail">
          <h1>5.2</h1>
          <div className="left-box-content3-fail">
            <a href="#leftBox2-fail">
              <h2>Fail</h2>
              <h5 style={{ maxWidth: "300px" }}>
                Don't worry! Get back to step 5 and reattempt.
              </h5>
            </a>
          </div>
          <div className="left-box-image3-fail">
            <img src="/assets/images/new_flow/Fail.png" />
          </div>
        </div>
      </Fade>

      <Fade bottom cascade>
        <div id="rightBox3">
          <div className="right-box-image3">
            <img src="/assets/images/flow/6th.png" />
          </div>

          <div className="right-box-content3">
            <h2>Learn about the course outline, outcomes, and schedules</h2>
          </div>
          <h1>06</h1>
        </div>
      </Fade>
    </div>

  )
}

export default FreeHowItWorks
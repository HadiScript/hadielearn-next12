import React from "react";
import Tops from "../components/functions/Tops";
import SEOHead from "../components/functions/SEOHead";
import PagesNavbar from "../components/partials/PageNavbar";
import Footer from "../components/partials/Footer";

const privacyAndPolicy = () => {
  return (
    <>
      <SEOHead
        title={"Privacy & Policy - Hadi E-learning"}
        desc={""}
        conLink={"https://hadielearning.com/privacy-and-policy"}
      />
      <PagesNavbar page="contactPage" />
      <div className="container pt-90">
        <div className="about__content">
          <div className="section__title section__title-3 mb-25">
            <h2>Privacy Policy for Hadi E Learning</h2>
          </div>
          <p>
            At Hadi E Learning, accessible from{" "}
            <a href="http://hadielearning.com/">http://hadielearning.com/</a>,
            one of our main priorities is the privacy of our visitors. This
            Privacy Policy document contains types of information that is
            collected and recorded by Hadi E Learning and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </p>
          <p>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in Hadi E Learning. This policy is
            not applicable to any information collected offline or via channels
            other than this website.
          </p>
          <h4>Consent</h4>
          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
          <h4>Information we collect</h4>
          <p>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information
            about you such as your name, email address, phone number, the
            contents of the message and/or attachments you may send us, and any
            other information you may choose to provide.
          </p>
          <p>
            When you register for an Account, we may ask for your contact
            information, including items such as name, company name, address,
            email address, and telephone number.
          </p>

          <h3>How we use your information</h3>
          <p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Provide, operate, and maintain our website
              </li>
              <li className="list-group-item">
                Improve, personalize, and expand our website
              </li>
              <li className="list-group-item">
                Understand and analyze how you use our website
              </li>
              <li className="list-group-item">
                Develop new products, services, features, and functionality
              </li>
              <li className="list-group-item">
                Communicate with you, either directly or through one of our
                partners, including for customer service, to provide you with
                updates and other information relating to the website, and for
                marketing and promotional purposes
              </li>
            </ul>
          </p>
          <h4>Log Files</h4>
          <p>
            Hadi E Learning follows a standard procedure of using log files.
            These files log visitors when they visit websites. All hosting
            companies do this and a part of hosting services' analytics. The
            information collected by log files include internet protocol (IP)
            addresses, browser type, Internet Service Provider (ISP), date and
            time stamp, referring/exit pages, and possibly the number of clicks.
            These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users' movement on the
            website, and gathering demographic information.
          </p>
          <h4>Advertising Partners Privacy Policies</h4>
          <p>
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on Hadi E Learning,
            which are sent directly to users' browser. They automatically
            receive your IP address when this occurs. These technologies are
            used to measure the effectiveness of their advertising campaigns
            and/or to personalize the advertising content that you see on
            websites that you visit.
          </p>
          <h3>Third Party Privacy Policies</h3>
          <p>
            Hadi E Learning's Privacy Policy does not apply to other advertisers
            or websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options. You can choose to disable cookies
            through your individual browser options. To know more detailed
            information about cookie management with specific web browsers, it
            can be found at the browsers' respective websites.{" "}
            <a href="https://oag.ca.gov/privacy/ccpa" target="#" rel="nofollow">
              CCPA Privacy Rights
            </a>{" "}
            (Do Not Sell My Personal Information) Under the CCPA, among other
            rights, California consumers have the right to: Request that a
            business that collects a consumer's personal data disclose the
            categories and specific pieces of personal data that a business has
            collected about consumers. Request that a business delete any
            personal data about the consumer that a business has collected.
            Request that a business that sells a consumer's personal data, not
            sell the consumer's personal data.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default privacyAndPolicy;

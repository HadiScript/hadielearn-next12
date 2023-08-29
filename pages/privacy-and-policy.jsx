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
            <h2>Privacy Policy for Hadi E Learning Site</h2>
          </div>
          <p>
            Welcome to Hadi E Learning ("us," "we," or "our"). We are committed
            to protecting your personal information and your right to privacy.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website
            www.hadielearning.com (the "Site"). Please read this Privacy Policy
            carefully. If you do not agree with the terms of this Privacy
            Policy, please do not access the Site.
          </p>
          <p>
            We reserve the right to make changes to this Privacy Policy at any
            time and for any reason. We will alert you about any changes by
            updating the "Effective Date" at the top of this Privacy Policy. You
            are encouraged to review this Privacy Policy periodically to stay
            informed of updates. By continuing to use the Site after such
            changes are made, you acknowledge your acceptance of the revised
            Privacy Policy.
          </p>
          <h4>Information We Collect</h4>
          <p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Contact information, such as your name, email address, and phone
                number.
              </li>
              <li className="list-group-item">
                Demographic information, such as your age, gender, and location.
              </li>
              <li className="list-group-item">
                User-generated content, including comments, posts, and messages.
              </li>
              <li className="list-group-item">
                Payment information, if you make a purchase through the Site.
              </li>
              <li className="list-group-item">
                Usage information, such as your browsing history, IP address,
                and device information.
              </li>
            </ul>
          </p>
          <h4>How We Use Your Information</h4>
          <p>We may use the information we collect to:</p>
          <p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Provide, operate, and maintain the Site.
              </li>
              <li className="list-group-item">
                Improve, personalize, and expand our Site's content and
                functionality.
              </li>
              <li className="list-group-item">
                Respond to your comments, questions, and requests.
              </li>
              <li className="list-group-item">
                Send you newsletters, updates, and promotional materials.
              </li>
              <li className="list-group-item">
                Process transactions and send transaction notifications.
              </li>
              <li className="list-group-item">
                Monitor and analyze usage patterns and trends.
              </li>
            </ul>
          </p>
          <h4>Disclosure of Your Information</h4>
          <p>We may share your information with:</p>
          <p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Third-party service providers to help us operate the Site and
                provide services to you.
              </li>
              <li className="list-group-item">
                Business partners and affiliates for marketing and promotional
                purposes.
              </li>
              <li className="list-group-item">
                Law enforcement or government authorities when required by law
                or in response to legal requests.
              </li>
            </ul>
          </p>
          <h4>Data Security</h4>
          <p>
            We implement reasonable measures to protect your information from
            unauthorized access, alteration, disclosure, or destruction.
            However, no data transmission or storage system can be guaranteed to
            be 100% secure. You are responsible for safeguarding your account
            information and choosing a strong password.
          </p>
          <h4>Your Choices</h4>
          <p>
            You can manage your communication preferences by unsubscribing from
            our newsletters or adjusting your account settings. You may also
            request to access, correct, or delete your personal information by
            contacting us at{" "}
            <a href="mailto:contact@hadielearning.com" target="#">
              contact@hadielearning.com
            </a>
            .
          </p>
          <h4>Children's Privacy</h4>
          <p>
            The Site is not intended for individuals under the age of [13/16],
            and we do not knowingly collect personal information from minors
            without parental consent. If you believe we have collected
            information from a minor, please contact us immediately.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have questions or concerns about this Privacy Policy, please
            contact us at:
          </p>
          <br />
          <b>Hadi E Learning</b>
          <br />
          <a href="mailto:contact@hadielearning.com" target="#">
            Email: info@hadielearning.com
          </a>
          <br />
          <br />
          <b>
            By using our Site, you consent to our Privacy Policy and agree to
            its terms.
          </b>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default privacyAndPolicy;

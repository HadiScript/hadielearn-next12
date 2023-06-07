import React from "react";
import SEOHead from "../components/functions/SEOHead";
import PagesNavbar from "../components/partials/PageNavbar";
import Footer from "../components/partials/Footer";

const dmcaPolicy = () => {
  return (
    <>
      <SEOHead
        title={"DMCA Policy For Hadi E-learning"}
        desc={""}
        conLink={"https://hadielearning.com/dmca-policy"}
      />
      <PagesNavbar page="contactPage" />
      <div className="container pt-90">
        <div className="about__content">
          <h1>DMCA Policy For Hadi E-learning</h1>
          <p>
            The Digital Millennium Copyright Act (“DMCA”) is designed to protect
            content creators from having their work stolen and published by
            other people on the internet.
          </p>
          <p>
            The law specifically targets websites where owners do not know who
            contributed each item of content or that the website is a platform
            for uploading and publishing content.
          </p>
          <p>
            We have the policy to respond to any infringement notice and take
            appropriate action.
          </p>

          <p>
            This Digital Millennium Copyright Act policy applies to the{" "}
            <a href="https://hadielearning.com/" style={{ fontWeight: "bold" }}>
              {" "}
              https://hadielearning.com/{" "}
            </a>{" "}
            website (“Website” or “Service”) and any of its related products and
            services (collectively, “Services”) and outlines how this Website
            operator (“Operator”, “we”, “us” or “our”) addresses copyright
            infringement notifications and how you (“you” or “your”) may submit
            a copyright infringement complaint.
          </p>

          <p>
            Protection of intellectual property is of utmost importance to us
            and we ask our users and their authorized agents to do the same. It
            is our policy to expeditiously respond to clear notifications of
            alleged copyright infringement that comply with the United States
            Digital Millennium Copyright Act (“DMCA”) of 1998, the text of which
            can be found at the U.S{" "}
            <a href="https://www.copyright.gov/" rel="nofollow">
              Copyright Office
            </a>
            .{" "}
          </p>

          <h2>What to consider before submitting a copyright complaint</h2>
          <p>
            Please note that if you are unsure whether the material you are
            reporting is in fact infringing, you may wish to contact an attorney
            before filing a notification with us.
          </p>
          <p>
            The DMCA requires you to provide your personal information in the
            copyright infringement notification. If you are concerned about the{" "}
            <a href="https://hadielearning.com/privacy-and-policy">privacy</a>{" "}
            of your personal information.
          </p>

          <h2>Notifications of infringement</h2>
          <p>
            If you are a copyright owner or an agent thereof, and you believe
            that any material available on our Services infringes your
            copyrights, then you may submit a written copyright infringement
            notification (“Notification”) using the contact details below
            pursuant to the DMCA. All such Notifications must comply with the
            DMCA requirements.
          </p>
          <p>
            Filing a DMCA complaint is the start of a pre-defined legal process.
            Your complaint will be reviewed for accuracy, validity, and
            completeness. If your complaint has satisfied these requirements,
            our response may include the removal or restriction of access to
            allegedly infringing material.
          </p>
          <p>
            If we remove or restrict access to materials or terminate an account
            in response to a Notification of alleged infringement, we will make
            a good faith effort to contact the affected user with information
            concerning the removal or restriction of access.
          </p>
          <p>
            Not with standing anything to the contrary contained in any portion
            of this Policy, the Operator reserves the right to take no action
            upon receipt of a DMCA copyright infringement notification if it
            fails to comply with all the requirements of the DMCA for such
            notifications.
          </p>
          <p>
            The process described in this Policy does not limit our ability to
            pursue any other remedies we may have to address suspected
            infringement.
          </p>
          <h2>Changes and amendments</h2>
          <p>
            We reserve the right to modify this Policy or its terms related to
            the Website and Services at any time at our discretion. When we do,
            we will post a notification on the main page of the Website, send
            you an email to notify you. We may also provide notice to you in
            other ways at our discretion, such as through the contact
            information you have provided.
          </p>
          <p>
            An updated version of this Policy will be effective immediately upon
            the posting of the revised Policy unless otherwise specified. Your
            continued use of the Website and Services after the effective date
            of the revised Policy (or such other act specified at that time)
            will constitute your consent to those changes.
          </p>
          <h2>Reporting copyright infringement</h2>
          <p>
            If you would like to notify us of the infringing material or
            activity, we encourage you to contact us via email address given
            below.
          </p>
          <p>
            <strong>Email: info@hadielearning.com</strong>
          </p>
          <p>
            <strong>
              Note: Please allow 1-2 business days for an email response.
            </strong>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default dmcaPolicy;

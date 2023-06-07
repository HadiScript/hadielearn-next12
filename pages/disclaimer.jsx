import React from "react";
import SEOHead from "../components/functions/SEOHead";
import PagesNavbar from "../components/partials/PageNavbar";
import Footer from "../components/partials/Footer";

const Disclaimer = () => {
  return (
    <>
      <SEOHead
        title={"Disclaimer - Hadi E-learning"}
        desc={""}
        conLink={"https://hadielearning.com/disclaimer"}
      />
      <PagesNavbar page="contactPage" />

      <div className="container pt-90">
        <div className="about__content">
          <div className="section__title section__title-3 mb-25">
            <h2>Disclaimer for Hadi E-Learning</h2>
          </div>
          <p>
            If you require any more information or have any questions about our
            site's disclaimer, please feel free to contact us by email at
            info@hadielearning.com.
          </p>
          <p>
            All the information on this website -{" "}
            <a href=" http://hadielearning.com/ ">http://hadielearning.com/ </a>{" "}
            - is published in good faith and for general information purpose
            only. Hadi E Learning does not make any warranties about the
            completeness, reliability and accuracy of this information. Any
            action you take upon the information you find on this website (Hadi
            E Learning), is strictly at your own risk. Hadi E Learning will not
            be liable for any losses and/or damages in connection with the use
            of our website.
          </p>
          <p>
            From our website, you can visit other websites by following
            hyperlinks to such external sites. While we strive to provide only
            quality links to useful and ethical websites, we have no control
            over the content and nature of these sites. These links to other
            websites do not imply a recommendation for all the content found on
            these sites. Site owners and content may change without notice and
            may occur before we have the opportunity to remove a link which may
            have gone 'bad'.
          </p>
          <p>
            Please be also aware that when you leave our website, other sites
            may have different privacy policies and terms which are beyond our
            control. Please be sure to check the Privacy Policies of these sites
            as well as their{" "}
            <a href="https://hadielearning.com/terms-and-conditions">
              Terms of Service
            </a>{" "}
            before engaging in any business or uploading any information.
          </p>
          <h4>Consent</h4>
          <p>
            By using our website, you hereby consent to our disclaimer and agree
            to its terms.
          </p>
          <h4>Update</h4>
          <p>
            Should we update, amend or make any changes to this document, those
            changes will be prominently posted here.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Disclaimer;

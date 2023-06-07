import React, { useState } from "react";
import SEOHead from "../components/functions/SEOHead";
import PagesNavbar from "../components/partials/PageNavbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import Footer from "../components/partials/Footer";

const init_vals = {
  name: "",
  email: "",
  message: "",
};

const contactUs = () => {
  const [info, setInfo] = useState(init_vals);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(
        "https://hadielearning.com/api/contact",
        info
      );
      toast.success(response.data.message, { position: "bottom-center" });

      setInfo(init_vals);
      setLoading(false);
    } catch (err) {
      let {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title={"Contact Us - Hadi E-learning"}
        desc={""}
        conLink={"https://hadielearning.com/contact-us"}
      />
      <PagesNavbar page="contactPage" />

      <section className="contact__area">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-xl-12">
              <div className="contact__map">
                <iframe
                  title="contact"
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Faisal plaza, civic center, Lahore, Punjab&amp;t=h&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
                <div
                  className="contact__wrapper d-md-flex justify-content-between wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="contact__info mr-100">
                    <h2>Get in touch</h2>
                    <ul>
                      <li>
                        <h4>Address</h4>
                        <p>
                          Hadi E-Learning, Civic Center, Faisal Town Lahore.
                        </p>
                      </li>
                      <li>
                        <h4>call us</h4>
                        <p>
                          <a href="tel:03-1111-93339">03-1111-93339</a>
                        </p>
                      </li>
                      <li>
                        <h4>Email Address</h4>
                        <p>
                          <a href="mailto:info@hadielearning.com">
                            info@hadielearning.com
                          </a>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="contact__form">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        name="name"
                        value={info.name}
                        onChange={handleChange}
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        name="email"
                        value={info.email}
                        onChange={handleChange}
                      />
                      <textarea
                        required
                        placeholder="Your Message"
                        name="message"
                        value={info.message}
                        onChange={handleChange}
                      ></textarea>
                      <button type="submit" className="z-btn">
                        Send Message {loading && "..loading.."}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default contactUs;

import Link from "next/link";
import React from "react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  return (
    <footer>
      <div className="footer__area pt-50" style={{ background: "#8080801c" }}>
        <div className="footer__top pb-45">
          <div className="container">
            <div className="row">
              {/* first col */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 pr-0">
                <div className="footer__widget mb-45 wow fadeInUp" data-wow-delay=".2s">
                  <div className="footer__widget-title mb-30">
                    <div id="big" className="logo text-center">
                      <a href="#">
                        <img src="/assets/images/footer_logo.png" alt="footer" style={{ height: "250px", width: "60%" }} />
                      </a>
                    </div>
                    <div id="small" className="logo ">
                      <a href="#">
                        <img src="/assets/images/header.svg" alt="footer" style={{ height: "80px" }} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* ends */}

              {/* seconds col */}
              <div className="col-xl-2 offset-xl-1 col-lg-2 offset-lg-1 col-md-4 col-sm-6">
                <div className="footer__widget footer__widget-3 mb-45 wow fadeInUp" data-wow-delay=".4s">
                  <div className="footer__widget-title">
                    <h3>MENU</h3>
                  </div>
                  <div className="footer__widget-content">
                    <div className="footer__links">
                      <ul>
                        <li>
                          <Link href="/about-us">About</Link>
                        </li>
                        <li>
                          <Link href="/programs">Programs</Link>
                        </li>
                        <li>
                          <Link href="/workshops">Workshops</Link>
                        </li>
                        <li>
                          <Link href="/how-it-works">How it works ?</Link>
                        </li>
                        <li>
                          <Link href="/contact-us">Contact</Link>
                        </li>
                        <li>
                          <Link href="/blogs">Blogs</Link>
                        </li>
                        <li>
                          <Link href="/faqs">FAQs</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* third col */}
              <div className="col-xl-2 offset-xl-1 col-lg-2 offset-lg-1 col-md-4 col-sm-6">
                <div className="footer__widget mb-45 wow fadeInUp" data-wow-delay=".6s">
                  <div className="footer__widget-title">
                    <h3>Terms</h3>
                  </div>
                  <div className="footer__widget-content">
                    <div className="footer__links">
                      <ul>
                        <li>
                          <Link href="/privacy-and-policy">Privacy & Policy</Link>
                        </li>
                        <li>
                          <Link href="/disclaimer">Disclaimer</Link>
                        </li>
                        <li>
                          <Link href="/dmca-policy">DMCA</Link>
                        </li>
                        <li>
                          <Link href="/terms-and-conditions">Terms And Conditions</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* fouth col */}
              <div className="col-xl-3  col-lg-3 col-md-4 col-sm-6">
                <div className="footer__widget footer__widget-3 mb-10  ml-70 wow fadeInUp" data-wow-delay=".8s">
                  <div className="footer__widget-title">
                    <h3>Contact</h3>
                  </div>
                  <div className="footer__widget-content">
                    <div className="footer__info mb-35">
                      <ul>
                        <li>
                          <div className="icon theme-color ">
                            <i>
                              {" "}
                              <FaEnvelope />{" "}
                            </i>
                          </div>
                          <div className="text theme-color ">
                            <span>
                              <a href="mailto:info@hadielearning.com">info@hadielearning.com</a>
                            </span>
                          </div>
                        </li>

                        <li>
                          <div className="icon theme-color">
                            <i>
                              <FaPhoneAlt />
                            </i>
                          </div>
                          <div className="text theme-color">
                            <span>
                              <a href="tel:03-1111-93339">03-1111-93339</a>
                            </span>
                          </div>
                        </li>

                        <li>
                          <div className="icon theme-color">
                            <i>
                              <CiLocationOn />
                            </i>
                          </div>
                          <div className="text theme-color">
                            <span>Hadi E-Learning, Civic Center, Faisal Town Lahore.</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="footer__social theme-social">
                      <ul>
                        <li>
                          <a href="https://www.facebook.com/Hadielearningofficial " target="_">
                            <i>
                              <FaFacebookF />
                            </i>
                            <i>
                              <FaFacebookF />
                            </i>
                          </a>
                        </li>
                        <li>
                          <a href="https://instagram.com/hadielearningofficial" target="_">
                            <i>
                              <FaInstagram />{" "}
                            </i>
                            <i>
                              <FaInstagram />{" "}
                            </i>
                          </a>
                        </li>

                        <li>
                          <a href="https://www.linkedin.com/company/hadi-e-learning/ " target="_">
                            <i>
                              <FaLinkedin />
                            </i>
                            <i>
                              <FaLinkedin />
                            </i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__copyright-3">
          <div className="container">
            <div className="footer__copyright-inner">
              <div className="row align-items-center">
                <div className="col-xl-12">
                  <div className="footer__copyright-text text-center">
                    <p>
                      Copyright © <Link href={"/auth/login"}>Hadi E-learning</Link> | Developed by{" "}
                      <a href="https://cycarts.com" target="#">
                        Cycarts
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

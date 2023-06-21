"use client";

import React from "react";
import SEOHead from "../components/functions/SEOHead";
import Footer from "../components/partials/Footer";
import PagesNavbar from "../components/partials/PageNavbar";
import { faqs_data } from "../data/faqs";
import Link from "next/link";

const FAQs = ({ list = 5, component = true }) => {
  return (
    <>
      <Head>
        <title>FAQs - Hadi E-learning</title>
        <link rel="canonical" href="https://hadielearning.com/faqs" />

        <meta name="robots" content="INDEX, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="author" content="Hadi" />
      </Head>

      <PagesNavbar page="contactPage" />

      <div className="container">
        <section className={`faq__area pb-50 pt-${component ? 120 : 20}`}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-8 ">
              <div className="mb-4">
                <h2>Frequently Asked Questions</h2>
              </div>

              <div className="faq__accordion p-relative">
                <div className="accordion" id="accordionExample">
                  {/* frist */}

                  <div className="card accordion-item">
                    <div className="card-header accordion-header" id="acc_0">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse_0"
                          aria-expanded="true"
                          aria-controls="collapse_0"
                        >
                          {faqs_data[0]?.question}
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapse_0"
                      className="collapse show"
                      aria-labelledby="acc_0"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body accordion-body">
                        <p>{faqs_data[0]?.answer}</p>
                      </div>
                    </div>
                  </div>

                  {faqs_data.slice(1, list).map((x, index) => (
                    <>
                      {index !== 0 && (
                        <div className="card">
                          <div className="card-header" id={`acc_${index}`}>
                            <h5 className="mb-0">
                              <button
                                className="btn btn-link collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse_${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse_${index}`}
                              >
                                {x.question}
                              </button>
                            </h5>
                          </div>

                          <div
                            id={`collapse_${index}`}
                            className="collapse"
                            aria-labelledby={`acc_${index}`}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="card-body accordion-body">
                              <p>{x.answer}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ))}

                  <div className="card">
                    <div className="card-header" id={`acc_99`}>
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse_99`}
                          aria-expanded="true"
                          aria-controls={`collapse_99`}
                        >
                          What are the benefits of joining Hadi E-Learning?
                        </button>
                      </h5>
                    </div>

                    <div
                      id={`collapse_99`}
                      className="collapse"
                      aria-labelledby={`acc_99`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body accordion-body">
                        <p>
                          <ul>
                            <li>Quality IT training at a subsidized cost.</li>
                            <li>A variety of courses to choose from.</li>
                            <li>
                              Qualified instructors with field experience.
                            </li>
                            <li>
                              One-on-one coordination with the instructor.
                            </li>
                            <li>Interactive live classes.</li>
                            <li>Flexibility</li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/*  */}

      {component && <Footer />}
    </>
  );
};

export default FAQs;

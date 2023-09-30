import React from "react";

const FaqsCourseDetail = ({ details, page }) => {
  return (
    <>
      <section className="faq__area pb-50 pt-10">
        <div className="row">
          <div className="col-xl-12 col-lg-12 ">
            <div className="faq__accordion p-relative">
              <div className="accordion" id="accordionExample">
                {/* frist */}

                {page === "outline" && (
                  <>
                    <div className="accordion-cards accordion-item">
                      <div className="card-header accordion-header" id="acc_0">
                        <h5 className="mb-0">
                          <button
                            data-bs-target="#collapse_0"
                            aria-controls="collapse_0"
                            className="btn btn-link"
                            data-bs-toggle="collapse"
                            aria-expanded="true"
                          >
                            {details[0]?.title}
                          </button>
                        </h5>
                      </div>

                      <div
                        id={`collapse_0`}
                        aria-labelledby={`acc_0`}
                        className="collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="d-flex gap-1 py-1 pb-3 px-4">
                          {details[0]?.details}
                        </div>
                      </div>
                    </div>

                    {details.map((x, UperIndex) => (
                      <React.Fragment key={UperIndex}>
                        {UperIndex === 0 ? (
                          <></>
                        ) : (
                          <div className="accordion-cards">
                            <div
                              className="card-header"
                              id={`acc_${UperIndex}`}
                            >
                              <h5 className="mb-0">
                                <button
                                  data-bs-target={`#collapse_${UperIndex}`}
                                  aria-controls={`collapse_${UperIndex}`}
                                  className="btn btn-link collapsed"
                                  data-bs-toggle="collapse"
                                  aria-expanded="true"
                                >
                                  {x.title}
                                </button>
                              </h5>
                            </div>

                            <div
                              id={`collapse_${UperIndex}`}
                              aria-labelledby={`acc_${UperIndex}`}
                              className="collapse"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="d-flex gap-1 py-1 pb-3 px-4">
                                {x.details}
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}

                {page === "FAQs" && (
                  <>
                    <div className="accordion-cards accordion-item">
                      <div className="card-header accordion-header" id="acc_0">
                        <h5 className="mb-0">
                          <button
                            data-bs-target="#collapse_0"
                            aria-controls="collapse_0"
                            className="btn btn-link"
                            data-bs-toggle="collapse"
                            aria-expanded="true"
                          >
                            {details[0]?.question}
                          </button>
                        </h5>
                      </div>

                      <div
                        id={`collapse_0`}
                        aria-labelledby={`acc_0`}
                        className="collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="d-flex gap-1 py-1 pb-3 px-4">
                          <div className="">{details[0]?.answer}</div>
                        </div>
                      </div>
                    </div>

                    {details.map((x, UperIndex) => (
                      <React.Fragment key={UperIndex}>
                        {UperIndex === 0 ? (
                          <></>
                        ) : (
                          <div className="card">
                            <div
                              className="card-header"
                              id={`acc_${UperIndex}`}
                            >
                              <h5 className="mb-0">
                                <button
                                  data-bs-target={`#collapse_${UperIndex}`}
                                  aria-controls={`collapse_${UperIndex}`}
                                  className="btn btn-link collapsed"
                                  data-bs-toggle="collapse"
                                  aria-expanded="true"
                                >
                                  {x.question}
                                </button>
                              </h5>
                            </div>

                            <div
                              id={`collapse_${UperIndex}`}
                              aria-labelledby={`acc_${UperIndex}`}
                              className="collapse"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="d-flex gap-1 py-1 pb-3 px-4">
                                <div className="">{x.answer}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqsCourseDetail;

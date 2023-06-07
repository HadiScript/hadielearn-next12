import React from "react";
import { TbPointFilled } from "react-icons/tb";

const FaqsCourseDetail = ({ details }) => {
  console.log(details);
  return (
    <>
      <section className="faq__area pb-50 pt-10">
        <div className="row">
          <div className="col-xl-12 col-lg-12 ">
            <div className="faq__accordion p-relative">
              <div className="accordion" id="accordionExample">
                {/* frist */}
                <div className="card accordion-item">
                  <div className="card-header accordion-header" id="acc_0">
                    <h5 className="mb-0">
                      <button
                        data-bs-target="#collapse_0"
                        aria-controls="collapse_0"
                        className="btn btn-link"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                      >
                        {details && details[0]?.heading}
                      </button>
                    </h5>
                  </div>

                  {details && details[0]?.Lectures.map((x, index) => (
                    <div
                      key={index}
                      id={`collapse_0`}
                      aria-labelledby={`acc_0`}
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="d-flex gap-1 py-1 pb-3 px-4">
                        <div className="">
                          <TbPointFilled size={15} />
                        </div>
                        <div className="">{x}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {details && details?.map((x, UperIndex) => (
                  <React.Fragment key={UperIndex}>
                    {UperIndex === 0 ? (
                      <></>
                    ) : (
                      <div className="card">
                        <div className="card-header" id={`acc_${UperIndex}`}>
                          <h5 className="mb-0">
                            <button
                              data-bs-target={`#collapse_${UperIndex}`}
                              aria-controls={`collapse_${UperIndex}`}
                              className="btn btn-link collapsed"
                              data-bs-toggle="collapse"
                              aria-expanded="true"
                            >
                              {x.heading}
                            </button>
                          </h5>
                        </div>

                        {x.Lectures.map((x, index) => (
                          <div
                            key={index}
                            id={`collapse_${UperIndex}`}
                            aria-labelledby={`acc_${UperIndex}`}
                            className="collapse"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="d-flex gap-1 py-1 pb-3 px-4">
                              <div className="">
                                <TbPointFilled size={15} />
                              </div>
                              <div className="">{x}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqsCourseDetail;

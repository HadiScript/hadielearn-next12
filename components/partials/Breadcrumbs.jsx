import Link from "next/link";
import React from "react";

const Breadcrumbs = ({ title, subtitle, image }) => {
  return (
    <>
      <section
        className="page__title p-relative d-flex align-items-center fix"
        style={{
          background: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container p-relative">
          <div className="row">
            <div className="col-xl-12">
              <div className="page__title-content mt-100">
                <h1>{title}</h1>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {subtitle}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcrumbs;

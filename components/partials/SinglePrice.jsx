import Link from "next/link";
import React from "react";
import Btn from "../ui/Btn";

const SinglePrice = ({ title, price, active, linkTitle }) => {
  return (
    <>
      <div className="col-xl-4 col-lg-4 col-md-6 ">
        <div className={`price__item ${active && active} p-relative transition-3 text-center fix mb-30`}>
          <div className="price__inner p-relative">
            <p>{title}</p>
            <div className="price__tag mb-45">
              <h2 id="card_price">{`${price === 0 ? "Free" : price}`}</h2>
              {/* <span>PKR</span> */}
            </div>
            {/* <div className="price__features text-start mb-55">
              <ul>
                <li>
                  <span>{point1}</span>
                </li>
                <li>
                  <span>{point2}</span>
                </li>
                <li>
                  <span>{point3}</span>
                </li>
              </ul>
            </div> */}
            <Link href="/enroll/program" className="price-btn">
              <Btn>{linkTitle}</Btn>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePrice;

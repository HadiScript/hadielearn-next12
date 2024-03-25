"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { test_links } from "../../form/test_links";
import { BiLinkExternal } from "react-icons/bi";
import { Button } from "antd";
import Link from "next/link";
import { AiOutlineRollback } from "react-icons/ai";

const Thanks = () => {
  const router = useRouter();
  const { test_link } = router.query;

  const finddedTest = test_links.find((x) => x.slug === test_link);


  useEffect(() => {
    toast.success("Your application has been submitted!", { duration: 4000 });
  }, []);

  return (
    <>
      <Head>
        <title>Thank You - Hadi E-learning </title>
        <meta name="robots" content="NOINDEX, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content="Cycarts Team" />
        <link rel="canonical" href="https://hadielearning.com/" />
        <meta
          name="description"
          content="Unlock the door to a bright and prosperous future in the digital world with Hadi-learning, an online learning platform that can help you excel in your career path.
"
        />
      </Head>
      <div
        style={{
          height: "100vh",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)",
        }}
      >
        <div className="text-center">
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>Thank you for your interest :)</span>
          <br />
          <br />
          <span style={{ fontSize: "25px", fontWeight: "bold" }}>
            {/* finddedTest._id !== '65f3ff2a91ba9bb56e00d605'  */}
            {finddedTest?._id !== '65f3ff2a91ba9bb56e00d605' ? <>
              {finddedTest?.title} Quiz Link:
              <a style={{ color: "#6da1ed" }} className="mx-4" href={finddedTest?.test} target="_blank">
                Go for quiz <BiLinkExternal />
              </a>
            </> : finddedTest?.title}
          </span>
          <br />
          <br />
          <br />
          <span className="text-center">We have sent you the confirmation email</span>
          <br />
          <br />
          <span
            onClick={() => router.push("/")}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              color: "#6da1ed",
              fontWeight: "bold",
            }}
          >
            <AiOutlineRollback /> Back to home
          </span>
        </div>
      </div>
    </>
  );
};

export default Thanks;

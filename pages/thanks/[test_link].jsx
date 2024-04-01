"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { test_links } from "../../form/test_links";
import { BiLinkExternal } from "react-icons/bi";
import { Button, Divider } from "antd";
import Link from "next/link";
import { AiOutlineRollback } from "react-icons/ai";
import { SlugToTitle } from "../../utils/SlugToTitle";



const FreeThanks = ({ finddedTest }) => {
  const router = useRouter();
  return <div className="text-center">
    <span style={{ fontSize: "30px", fontWeight: "bold" }}>Thank you for your interest :)</span>
    <br />
    <br />
    <span style={{ fontSize: "25px", fontWeight: "bold" }}>

      {finddedTest?.title} Quiz Link:
      <a style={{ color: "#6da1ed" }} className="mx-4" href={finddedTest?.test} target="_blank">
        Go for quiz <BiLinkExternal />
      </a>

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
}


const AdvanceThanks = ({ finddedTest, }) => {
  const router = useRouter();
  return <div className="d-flex flex-column" style={{ maxWidth: "600px" }}>
    <span style={{ fontSize: "30px", fontWeight: "bold" }}>Thank you,</span>
    <p className="text-white my-4">You are just one step away from entering the domain of {SlugToTitle(finddedTest)}. This step is super important to get you all set for the course.</p>
    <p className="text-white">To complete your enrollment, please proceed with the payment process. Get started on your educational journey now!</p>

    {/* <b className="my-4">Account Details:</b> */}
    <Divider className="text-white">Account Details</Divider>


    <b>Allied Bank: (ABL)</b>
    <span className="text-white">Title: Premier Information Technologies (Private) Limited</span>
    <span className="text-white">A/C No: 0010110844270010</span>


    <b className="mt-4">Meezan Bank: (MBL)</b>
    <span className="text-white">Title: Premier Information Technologies (Private) Limited</span>
    <span className="text-white">A/C No: 0010110844270010</span>


    <div style={{ marginTop: "40px" }} className="d-flex flex-column">
      <small> Have any questions? Just let us know; we're here to help!</small>
      <a target="#" href="https://api.whatsapp.com/send?phone=03111193339">WhatsApp: 03111193339</a>
      <a target="#" href="mailto:info@hadielearning.com">Email: info@hadielearning.com</a>
    </div>

    <div className="d-flex justify-content-between align-items-center">
      <span
        onClick={() => router.push("/")}
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: 4,
          cursor: "pointer",
          color: "white",
          fontWeight: "bold",
          marginTop: "30px"
        }}
      >
        <AiOutlineRollback /> Back to home
      </span>

      <span
        onClick={() => router.push("/how-it-works?")}
        style={{
          cursor: "pointer",
          color: "white",
          fontWeight: "bold",
          marginTop: "30px"
        }}
      > How it works?
      </span>
    </div>
  </div>
}


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
        {finddedTest ? <FreeThanks finddedTest={finddedTest} /> : <AdvanceThanks finddedTest={test_link} />}


      </div>
    </>
  );
};

export default Thanks;

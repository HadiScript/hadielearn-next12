"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { test_links } from "../../form/test_links";
import { BiLinkExternal } from "react-icons/bi";

const Thanks = () => {
  const router = useRouter();
  const { test_link } = router.query;

  const finddedTest = test_links.find((x) => x._id === test_link);

  console.log(test_link, router.query, finddedTest, "here is ");
  setTimeout(() => {
    router.push("/");
  }, 4000);

  useEffect(() => {
    toast.success("Your aplication has been submitted !");
  }, []);

  return (
    <>
      <Head>
        <title>Thank You - Hadi E-learning </title>
        <meta name="robots" content="NOINDEX, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
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
          backgroundImage:
            "linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)",
        }}
      >
        <div className="text-center">
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Thank you for your interest :)
          </span>
          <br />
          <br />
          <span style={{ fontSize: "25px", fontWeight: "bold" }}>
            {finddedTest?.title} Quiz Link:
            <a
              style={{ color: "#6da1ed" }}
              className="mx-4"
              href={`${finddedTest?.test}`}
              target="_"
            >
              Go for quiz <BiLinkExternal />
            </a>
          </span>
          <br />
          <br />
          <br />
          <span className="text-center">
            We have sent you the confirmation email
          </span>
        </div>
      </div>
    </>
  );
};

export default Thanks;

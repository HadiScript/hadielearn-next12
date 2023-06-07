"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const Thanks = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 2000);

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
          <span className="text-center">
            We have sent you the confirmation email
          </span>
        </div>
      </div>
    </>
  );
};

export default Thanks;

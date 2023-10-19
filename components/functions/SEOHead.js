import Head from "next/head";
import React from "react";

const SEOHead = ({ title, desc, conLink }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={conLink} />

      <meta name="robots" content="INDEX, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="author" content="Hadi" />
    </Head>
  );
};

export default SEOHead;

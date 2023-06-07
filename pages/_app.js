import AllContext from "../context/AllContext";
import "../public/css/styles.scss";
import { Toaster } from "react-hot-toast";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import Head from "next/head";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="assets/favicon.svg" />
      </Head>
      <AllContext>
        <Toaster />
        <Component {...pageProps} />
      </AllContext>
    </>
  );
}

export default MyApp;

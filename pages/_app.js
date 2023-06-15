import AllContext from "../context/AllContext";
import "../public/css/styles.scss";
import { Toaster } from "react-hot-toast";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import Head from "next/head";
import { AuthProvider } from "../context/auth";
import { BlogProvider } from "../context/blogContext";
import { GallaryProvider } from "../context/gallaryContext";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AllContext>
        <AuthProvider>
          <BlogProvider>
            <GallaryProvider>
              <Head>
                <link rel="shortcut icon" href="assets/favicon.svg" />
                <link rel="stylesheet" href="assets/css/animate.min.css" />
                <link rel="stylesheet" href="assets/css/fontAwesome5Pro.css" />
                <link
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                  rel="stylesheet"
                  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                  crossOrigin="anonymous"
                ></link>
                <script
                  src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
                  integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
                  crossOrigin="anonymous"
                ></script>
                <script
                  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
                  integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
                  crossOrigin="anonymous"
                ></script>
              </Head>

              <Toaster />
              <Component {...pageProps} />
            </GallaryProvider>
          </BlogProvider>
        </AuthProvider>
      </AllContext>
    </>
  );
}

export default MyApp;

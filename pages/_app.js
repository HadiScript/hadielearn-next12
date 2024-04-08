import AllContext from "../context/AllContext";
import "../public/css/styles.scss";
import "react-phone-input-2/lib/style.css";
import { Toaster } from "react-hot-toast";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import Head from "next/head";
import { AuthProvider } from "../context/auth";
import { BlogProvider } from "../context/blogContext";
import { GallaryProvider } from "../context/gallaryContext";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Script from "next/script";
import { useEffect } from "react";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

// Configure NProgress options (optional)
NProgress.configure({ showSpinner: false });

// Bind NProgress to Router events
// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("302442199452630");
        ReactPixel.pageView();

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);

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

                {/* new tags */}

                <meta property="og:title" content="Hadi E-learning - Your Digital Hadi" />
                <meta property="og:site_name" content="Hadi E-learning" />
                <meta property="og:url" content="https://hadielearning.com/" />
                <meta
                  property="og:description"
                  content="Unlock the door to a bright and prosperous future in the digital world with Hadi-learning, an online learning platform that can help you excel in your career path."
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://hadielearning.com/assets/images/cards.webp" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@Hadi E-learning" />
                <meta name="twitter:title" content="Hadi E-learning - Your Digital Hadi" />
                <meta
                  name="twitter:description"
                  content="Unlock the door to a bright and prosperous future in the digital world with Hadi-learning, an online learning platform that can help you excel in your career path."
                />
                <meta name="twitter:image" content="https://hadielearning.com/assets/images/cards.webp" />
                <meta name="p:domain_verify" content="f8bb42a20c8dff398a924ace20af7c9f" />
                {/* <!-- Google tag (gtag.js) --> */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-XMP1680JR1"></script>

                <script
                  dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XMP1680JR1');
          `,
                  }}
                />

                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: `
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "url": "https://hadielearning.com/",
              "name": "Hadi E-learning",
              "alternateName": "An excellent online learning platform",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://hadielearning.com/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `,
                  }}
                />
                {/* ends */}

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

                {/* ads */}
                <script
                  async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098252304490801"
                  crossOrigin="anonymous"
                />

                {/* chatting start */}

                {/* chatting end */}

                {/* pixel start */}

                {/* pixel end */}
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

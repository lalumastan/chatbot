import { GoogleAdSense } from "nextjs-google-adsense";

import 'bootstrap/dist/css/bootstrap.css'

import "../styles/globals.css";

import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <><GoogleAdSense publisherId="ca-pub-1521514346848136" /><Component {...pageProps} /></>;
}

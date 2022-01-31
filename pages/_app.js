import { useState, useEffect } from "react";
import "../styles/globals.css";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/app.module.scss";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.content}>
        {loading ? <Loader /> : <Component {...pageProps} />}
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;

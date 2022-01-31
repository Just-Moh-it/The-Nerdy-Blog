import { useEffect } from "react";
import Router from "next/router";

const IndexPage = () => {
  useEffect(() => {
    Router.push("/blog");
  }, []);

  return <div>Redirecting...</div>;
};

export default IndexPage;

import React from "react";
import NotFound from "../components/NotFound/NotFound";
import styles from "../styles/notFoundPage.module.scss";

const NotFoundPage = () => {
  // Amazing 404 page
  return (
    <div className={styles.container}>
      <NotFound />
    </div>
  );
};

export default NotFoundPage;

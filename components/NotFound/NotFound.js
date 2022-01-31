import React from "react";
import styles from "./NotFound.component.scss";

const NotFound = () => {
  return (
    <article className={styles.container}>
      <h1 className={["h1", styles.heading].join(" ")}>Oops! 404</h1>
      <h3 className={["", styles.subheading].join(" ")}>
        Looks like you're lost!
      </h3>
      <p className={["", styles.content].join(" ")}>
        But don't worry, everything is still awesome here
      </p>
    </article>
  );
};

export default NotFound;

import React from "react";
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <p className={["secondaryText", styles.text].join(" ")}>
        &copy; {new Date().getFullYear()} - The Assignment Nerd. All rights
        reserved, as always
      </p>
      <p className={["secondaryText", styles.text].join(" ")}>
        Made with {"❤️"} in India
      </p>
    </footer>
  );
};

export default Footer;

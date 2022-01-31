import styles from "../styles/Header.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      {/* Logo container */}
      <Link href="/">
        <a className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src={"/static/logo.png"}
            alt="Nerd Logo"
            width={60}
            height={60}
          />
          <h1 className={styles.title}>The Assignment Nerd</h1>
        </a>
      </Link>

      {/* Nav links */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li
            className={[
              styles.navItem,
              router.pathname === "/" ? styles.active : "",
            ].join(" ")}
          >
            <Link href="/">
              <a className={styles.navLink}>Home</a>
            </Link>
          </li>
          <li
            className={[
              styles.navItem,
              router.pathname.startsWith("/pricing") ? styles.active : "",
            ].join(" ")}
          >
            <Link href="/pricing" className={styles.navLink}>
              <a className={styles.navLink}>Pricing</a>
            </Link>
          </li>
          <li
            className={[
              styles.navItem,
              router.pathname.startsWith("/work") ? styles.active : "",
            ].join(" ")}
          >
            <Link href="/work" className={styles.navLink}>
              <a className={styles.navLink}>Our Work</a>
            </Link>
          </li>
          <li
            className={[
              styles.navItem,
              router.pathname.startsWith("/about") ? styles.active : "",
            ].join(" ")}
          >
            <Link href="/about" className={styles.navLink}>
              <a className={styles.navLink}>About</a>
            </Link>
          </li>
          <li
            className={[
              styles.navItem,
              router.pathname.startsWith("/blog") ? styles.active : "",
            ].join(" ")}
          >
            <Link href="/blog" className={styles.navLink}>
              <a className={styles.navLink}>Nerdy Blog</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

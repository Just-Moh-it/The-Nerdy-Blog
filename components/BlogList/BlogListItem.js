import styles from "./BlogListItem.module.scss";
import Image from "next/image";
import Link from "next/link";

const BlogListItem = ({
  blog: { title, thumbnail, description, infoText, href, infoImage },
}) => {
  return (
    <Link href={href}>
      <section className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={thumbnail.src} alt={thumbnail.alt} />
        </div>
        <div className={styles.content}>
          <h3 className={["h3", styles.title].join(" ")}>{title}</h3>
          <div className={styles.info}>
            <div className={styles.infoImageContainer}>
              {/* <Image src={infoImage.src} alt={infoImage.alt} /> */}
            </div>
            <p className={["secondaryText", styles.infoText].join(" ")}>
              {infoText}
            </p>
          </div>
          <p className={["secondaryText", styles.description].join(" ")}>
            {description}
          </p>
        </div>
      </section>
    </Link>
  );
};

export default BlogListItem;

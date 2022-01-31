import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../styles/Loader.module.scss";

const Loader = () => {
  return (
    <>
      {/* Title Skeleton */}
      <Skeleton height={100} wrapper={Box} />
      {/* image skeleton */}
      <Skeleton height={300} wrapper={Box} />

      <Skeleton height={60} wrapper={Box} />
      {/* text skeleton */}
      <Skeleton height={20} count={10} wrapper={Box} />
    </>
  );
};

const Box = ({ children }) => {
  return <div className={styles.individualBlock}>{children}</div>;
};

export default Loader;

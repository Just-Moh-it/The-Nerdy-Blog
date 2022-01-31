import React from "react";
import styles from "./BlogListGrid.module.scss";
import Link from "next/link";
import BlogListItem from "./BlogListItem";

const BlogListGrid = ({ blogs }) => {
  return (
    <section className={styles.container}>
      {blogs.map((blog) => (
        <BlogListItem blog={blog} />
      ))}
    </section>
  );
};

export default BlogListGrid;

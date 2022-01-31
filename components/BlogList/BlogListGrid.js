import React from "react";
import styles from "./BlogListGrid.module.scss";
import Link from "next/link";
import BlogListItem from "./BlogListItem";
import { v4 as uuid } from "uuid";

const BlogListGrid = ({ blogs }) => {
  return (
    <section className={styles.container}>
      {blogs.map((blog) => (
        <BlogListItem blog={blog} key={uuid()} />
      ))}
    </section>
  );
};

export default BlogListGrid;

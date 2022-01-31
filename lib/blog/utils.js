export const getBlogInfo = ({ post, author }) => {
  return `By ${author} · ${getHumanDate(post.last_edited_time)}`;
};

export const getHumanDate = (timestamp) => {
  return new Date(timestamp).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
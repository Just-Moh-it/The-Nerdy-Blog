import { Fragment } from "react";
import Head from "next/head";
import { getDatabase, getPage, getBlocks, getUser } from "../../lib/notion";
import { databaseId } from "./index.js";
import styles from "../../styles/post.module.scss";
import Text from "../../components/utils/Text/Text";
import renderBlock from "../../components/utils/renderBlock/RenderBlock";
import { getBlogInfo } from "../../lib/blog/utils";

export default function Post({ page, blocks, author }) {
  if (!page || !blocks) {
    return <div />;
  }
  return (
    <div>
      <Head>
        <title>
          {page.properties.Name.title[0].plain_text} | The Nerdy Blog
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className={styles.container}>
        {/* Title */}
        <h1 className={["h2", styles.title].join(" ")}>
          <Text text={page.properties.Name.title} />
        </h1>
        {/* Description */}
        <h4 className={["secondaryText", styles.description].join(" ")}>
          <Text text={page.properties.Description.rich_text} />
        </h4>
        {/* Info Block */}
        <div className={styles.info}>
          <div className={styles.infoImageContainer}>
            {/* <Image src={infoImage.src} alt={infoImage.alt} /> */}
          </div>
          <p className={["secondaryText", styles.infoText].join(" ")}>
            {getBlogInfo({ post: page, author })}
          </p>
        </div>
        {/* Thumbnail */}
        <div className={styles.thumbnailContainer}>
          {/* <Image src={}></Image> */}
        </div>

        {/* Real Content */}
        <section className={styles.content}>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>

      {/* More articles to explore section */}
    </div>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      author:
        page.properties.Author.people.length > 0
          ? (await getUser(page.properties.Author.people[0].id)).name
          : "Unknown",
      blocks: blocksWithChildren,
    },
    revalidate: 100,
  };
};

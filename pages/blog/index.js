import Head from "next/head";
import Link from "next/link";
import { getDatabase, getUser } from "../../lib/notion";
import Text from "../../components/utils/Text/Text";
import styles from "../../styles/index.module.scss";
import BlogListGrid from "../../components/BlogList/BlogListGrid";
import { getBlogInfo } from '../../lib/blog/utils'

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts, authors }) {
  return (
    <div>
      <Head>
        <title>The Nerdy Blog | By Assignment Nerd</title>
      </Head>

      <main className={styles.container}>
        <h1 className={["h1", styles.heading].join(" ")}>The Nerdy Blog</h1>
        {/* Featured Post */}
        {posts[0] && (
          <Link href={`/blog/${posts[0].id}`}>
            <a>
              <article className={styles.featuredPost}>
                {/* Image Part */}
                <div className={styles.left}>
                  <div className={styles.imageContainer}>
                    {/* <Image src={}></Image> */}
                  </div>
                </div>

                {/* Content Part */}
                <div className={styles.right}>
                  <p
                    className={[styles.secondaryText, styles.postInfo].join(
                      " "
                    )}
                  >
                    {getBlogInfo({ post: posts[0], author: authors[0] })}
                  </p>
                  <h2 className={["h2", styles.title].join(" ")}>
                    <Text text={posts[0].properties.Name.title} />
                  </h2>
                  <h4
                    className={[
                      styles.secondaryText,
                      styles.postDescription,
                    ].join(" ")}
                  >
                    <Text text={posts[0].properties.Description.rich_text} />
                  </h4>
                </div>
              </article>
            </a>
          </Link>
        )}
        
        {/* Posts Grid */}
        <BlogListGrid
          blogs={posts.slice(1).map((post, idx) => ({
            title: <Text text={post.properties.Name.title} />,
            thumbnail: {
              // src: post.properties.Thumbnail.file.url,
              // alt: post.properties.Thumbnail.caption[0].plain_text,
            },
            description: <Text text={post.properties.Description.rich_text} />,
            infoImage: {
              // src: authors[idx].avatar.url,
              // alt: authors[idx].name,
            },
            infoText: getBlogInfo({ post, author: authors[idx + 1] }),
            href: `/blog/${post.id}`,
          }))}
        />
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  const authors = await Promise.all(
    database.map(async (post) =>
      post.properties.Author.people.length
        ? (
            await getUser(post.properties.Author.people[0].id)
          ).name
        : "Unknown"
    )
  );

  return {
    props: {
      posts: database,
      authors,
    },
    revalidate: 100,
  };
};

import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import MetaTags from 'components/MetaTags'
import { BlogPost, getBlogPostList } from 'utils/blog'

interface BlogProps {
  posts: BlogPost[]
}

export const Blog: NextPage<BlogProps> = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <main>
      <MetaTags
        title="CryptoStats Blog"
        description="Writing about the tooling and data in the crypto metrics ecosystem"
      />

      <h1 className="title">L2Fees Blog</h1>
      <div className="nav-links">
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>

      <ul className="posts">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a
                style={{
                  backgroundImage: post.metadata.image ? `url(${post.metadata.image})` : '',
                }}
              >
                <div className="link-title">{post.title}</div>
                <div className="link-tagline">{post.metadata.tagline}</div>
                <div className="link-date">
                  {post.date && new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .title {
          margin: 0 0 16px;
          line-height: 1.15;
          font-size: 4rem;
          font-weight: 700;
        }

        .posts {
          display: flex;
          padding: 0;
        }

        .posts li {
          list-style: none;
          margin: 8px;
        }

        .posts a {
          display: block;
          width: 400px;
          height: 200px;
          border: solid 1px black;
          border-radius: 4px;
          box-sizing: border-box;
          padding: 8px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          text-decoration: none;
          background-position: center;
          background-size: 100%;
          position: relative;
          transition: background-size 0.2s;
        }
        .posts a:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.4;
          background: #eeeeee;
          z-index: 0;
        }
        .posts a:hover {
          content: '';
          background-size: 110%;
          color: black;
        }
        .posts * {
          z-index: 1;
        }

        .link-title {
          font-weight: bold;
          font-size: 18px;
        }
        .link-date {
          color: #555;
          font-size: 14px;
        }

        .nav-links,
        .nav-links a {
          font-size: 14px;
          color: #555;
        }
        .nav-links a:hover {
          color: #999;
        }
      `}</style>
    </main>
  )
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getBlogPostList()

  return { props: { posts }, revalidate: 60 * 60 }
}

export default Blog

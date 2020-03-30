import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Link from '../components/Link';

export default function Index({ data: { site, allMdx } }) {
  const posts = allMdx.edges;

  return (
    <Layout site={site}>
      {posts.map(({ node: post }) => (
        <div key={post.id}>
          <h2>
            <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
          </h2>

          <p>{post.excerpt}</p>

          <Link to={post.frontmatter.slug}>Continue Reading</Link>
        </div>
      ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
          }
        }
      }
    }
  }
`;

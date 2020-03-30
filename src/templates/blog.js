import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Link from '../components/Link';

const Blog = ({ data: { site, allMdx }, pageContext: { pagination } }) => {
  const { page } = pagination;

  const posts = page.map((id) => allMdx.edges.find((edge) => edge.node.id === id));

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
};

export default Blog;

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx {
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

import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import Layout from '../components/Layout';

export default function Post({ data: { site, mdx }, pageContext: { next, prev } }) {
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <h1>{mdx.frontmatter.title}</h1>

      {mdx.frontmatter.banner && (
        <Img
          sizes={mdx.frontmatter.banner.childImageSharp.sizes}
          alt={site.siteMetadata.keywords.join(', ')}
        />
      )}

      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
      }
      body
    }
  }
`;

import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import styled, { createGlobalStyle } from 'styled-components';

import Navigation from './Navigation';
import Footer from './Footer';

import 'prismjs/themes/prism-tomorrow.css';

import { MDXLayoutComponents, MDXGlobalComponents } from './mdx';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #42a6e0;
    --color-secondary: #e2b628;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
    font-size: 62.5%;
  }

  body {
    position: relative;
    min-height: 100%;
    font-size: 1.8rem;
    line-height: 2.5rem;
    font-family: Roboto, sans-serif;

    background-color: #FEFEFE;
    color: #212C2B;
  }

  h1 {
    font-weight: normal;
    text-align: center;
  }

  h2 {
    font-weight: normal;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .gatsby-highlight-code-line {
    display: block;
  }

  pre[class*="language-"] {
    font-size: 16px !important;
  }

  :not(pre) > code {
    background: var(--color-primary) !important;
    color: white !important;
    font-style: italic;
  }

  @media (min-width: 1200px) {
    pre {
      margin: 0.5rem -16rem !important;
    }
  }
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem 7rem;
`;

export default ({ site, frontmatter = {}, children }) => {
  const { title, description: siteDescription, keywords: siteKeywords } = site.siteMetadata;

  const { keywords: frontmatterKeywords, description: frontmatterDescription } = frontmatter;

  const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  const description = frontmatterDescription || siteDescription;

  return (
    <>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
        link={[
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
          },
          {
            rel: 'stylesheet',
            href:
              'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/fontawesome.min.css',
          },
          {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/brands.min.css',
          },
        ]}
      >
        <html lang="en" />
      </Helmet>

      <GlobalStyle />

      <MDXProvider
        components={{
          ...MDXLayoutComponents,
          ...MDXGlobalComponents,
        }}
      >
        <Navigation />
        <Main>{children}</Main>
        <Footer />
      </MDXProvider>
    </>
  );
};

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
    }
  }
`;

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  background-color: var(--color-primary);

  position: absolute;
  height: 6rem;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 7rem;

  a {
    color: white;
    font-size: 3rem;
  }
`;

const Footer = () => (
  <Wrapper>
    <SocialIcons>
      <a href="https://github.com/drewschrauf" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github" />
      </a>
      <a href="https://twitter.com/drewschrauf" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter" />
      </a>
    </SocialIcons>
  </Wrapper>
);

export default Footer;

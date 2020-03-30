import React from 'react';
import styled from 'styled-components';

import me from '../../assets/me.jpeg';
import Link from './Link';

const Header = styled.header`
  background-color: var(--color-primary);
  border-bottom: 2px solid var(--color-secondary);

  height: 6rem;
  margin-bottom: 2rem;

  a {
    color: white;
    text-decoration: none;
    margin-bottom: 1rem;

    :hover {
      text-decoration: underline;
    }
  }
`;

const ResponsiveWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  display: flex;
  align-items: center;
`;

const FlexLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 1rem;
  margin-top: 4px;
`;

const Name = styled.span`
  display: inline-block;
  padding-bottom: 1rem;
`;

const Navigation = () => (
  <Header>
    <ResponsiveWrapper>
      <FlexLink to="/">
        <Img src={me} />
        <Name>Drew Schrauf</Name>
      </FlexLink>
    </ResponsiveWrapper>
  </Header>
);
export default Navigation;

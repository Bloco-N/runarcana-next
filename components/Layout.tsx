import React from 'react';
import styled from 'styled-components'
import Nav from './Nav';

type LayoutProps = {
  children: React.ReactNode
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
`

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Container>
      <Nav />
        {props.children}
      </Container>
    </>
  );
};

export default Layout;
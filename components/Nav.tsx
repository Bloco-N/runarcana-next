import React from 'react';
import styled from 'styled-components';

const Container = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  height: 6rem;
`

const Nav = () => {
  return (
    <Container>
      Home | About | Login
    </Container>
  );
};

export default Nav;
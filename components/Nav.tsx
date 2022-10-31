import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import useUser from '../hooks/useUser';

const Container = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  height: 6rem;
  gap: 3rem;
  padding: 4rem;
  button{
    all: unset;
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
    :hover{
      opacity: 1;
      text-shadow:
        0 0 7px var(--primary),
        0 0 10px var(--primary),
        0 0 21px var(--primary),
        0 0 42px white,
        0 0 82px white,
        0 0 92px white,
        0 0 102px white,
        0 0 151px white;
    }
  }
`

const Nav = () => {
  const router = useRouter()
  const user = useUser()
  const handleSignOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/sign-in')
  }
  return (
    <Container>
      <Link href='/'>
        home  
      </Link>
      <Link href='/about'>
        about 
      </Link>
      {user ? (
        <button onClick={handleSignOut}>
          sign-out
        </button>
      ):(
      <Link href='/sign-in'>
        sign-in  
      </Link>
      )}

    </Container>
  );
};

export default Nav;
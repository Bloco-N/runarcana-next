import Image from 'next/image';
import codexIcone from '../public/codex-icone.svg'
import codexIconeLight from '../public/codex-icone-light.svg'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import useUser from '../hooks/useUser';
import useDarkTheme from '../hooks/useDarkTheme';

const Container = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  height: 6rem;
  gap: 3rem;
  padding: 4rem;
  width: 100%;
  img{
    position: absolute;
    top: 50%;
    left: 50%;
    height: auto;
    width: 90rem;
  }
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
  const isDark = useDarkTheme()
  const router = useRouter()
  const user = useUser()
  const handleSignOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/sign-in')
  }
  return (
    <Container>
      <Image src={isDark? codexIcone : codexIconeLight} alt="codex icone"/>
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
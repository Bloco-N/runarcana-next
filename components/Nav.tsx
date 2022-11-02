import Image from 'next/image';
import codexIcon from '../public/codex-icone.svg'
import codexIconLight from '../public/codex-icone-light.svg'
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
    width: 70rem;
    animation: grow-up 1s forwards;
  }
  button{
    all: unset;
    margin-left: auto;
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
      <Image src={isDark? codexIcon : codexIconLight} alt="codex icone"/>
      <Link href='/'>
        Home  
      </Link>
      <Link href='/about'>
        About 
      </Link>
      {user ? (
        <button onClick={handleSignOut}>
          Sign-out
        </button>
      ):(
      <Link href='/sign-in'>
        Sign-in  
      </Link>
      )}
      {user ? <span>{user.username} ({user.nickname})</span>: ''}
    </Container>
  );
};

export default Nav;
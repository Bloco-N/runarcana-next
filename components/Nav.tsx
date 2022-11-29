import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import useUser from '../hooks/useUser';
import useDarkTheme from '../hooks/useDarkTheme';

const Container = styled.nav`
  display: flex;
  align-items: center;
  height: 10%;
  gap: 3rem;
  padding: 4rem;
  width: 100%;
  h3{
    user-select: none;
  }
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
      background: linear-gradient(45deg, var(--gradient-color-one) 0%, var(--gradient-color-two) 100%);
      background-size: 400%;
      -webkit-background-clip: text;
      background-clip: text;
      animation: gradient 2s ease infinite;
      color: transparent;
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
      <h3>Códice [runarcana] </h3>
      <Link href='/'>
        Home
      </Link>
      <Link href='/about'>
        Sobre
      </Link>
      {user ? (
        <button onClick={handleSignOut}>
          Sair
        </button>
      ) : (
        <>
          <Link href='/sign-in'>
            Entrar
          </Link>

          <Link href='/sign-up'>
            Crie seu Codex
          </Link>
        </>
      )}
      {user ? <span>{user.username} ({user.nickname})</span> : ''}
    </Container>
  );
};

export default Nav;
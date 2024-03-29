import React from 'react';
import styled from 'styled-components';
import useDarkTheme from '../hooks/useDarkTheme';

type ButtonProps = {
  children: React.ReactNode
}

type ContainerProps = {
  isDark:boolean
}

const Container = styled.button<ContainerProps>`
  all: unset;
  padding: 1.5rem;
  background: ${props => props.isDark ? 'rgba(0, 9, 24, 0.25)' :'rgba(245, 207, 240, 0.25)' } ;
  backdrop-filter: blur(0.2rem);
  border: 0.4rem outset ${props => props.isDark ? 'rgba(40, 52, 73, 0.7)' :'rgba(236, 111, 220, 0.25)' };
  opacity: 0.7;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;
  :hover{
    opacity: 1;
  }
`

const Button = (props:ButtonProps) => {
  const isDark = useDarkTheme()
  return (
    <Container isDark={isDark} {...props}>
      {props.children}
    </Container>
  );
};

export default Button;
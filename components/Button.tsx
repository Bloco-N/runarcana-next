import React from 'react';
import styled from 'styled-components';
import useDarkTheme from '../hooks/useDarkTheme';

type ButtonProps = {
    children: React.ReactNode
    onClick?: React.MouseEventHandler
    className?: string
}

type ContainerProps = {
    isDark: boolean
}

const Container = styled.button<ContainerProps>`
  all: unset;
  padding: 1.5rem;
  background: ${props => props.isDark ? 'rgba(88, 91, 112, 0.25)' : 'rgba(124, 127, 147, 0.25)'} ;
  backdrop-filter: blur(0.2rem);
  border: 0.2rem outset ${props => props.isDark ? 'rgba(88, 91, 112, 0.7)' : 'rgba(124, 127, 147, 0.7)'};
  border-radius: 1rem;
  opacity: 0.4;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;
  user-select: none;
  :hover{
    opacity: 1;
  }
`

const Button = (props: ButtonProps) => {
    const isDark = useDarkTheme()
    return (
        <Container isDark={isDark} {...props}>
            {props.children}
        </Container>
    );
};

export default Button;
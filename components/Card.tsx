import React from 'react';
import styled from 'styled-components';
import useDarkTheme from '../hooks/useDarkTheme';

type CardProps = {
  id?: string
  children: React.ReactNode,
  className?: string
  onClick?: React.MouseEventHandler
}

type ContainerProps = {
  isDark: boolean
}

const Container = styled.div<ContainerProps>`
  background: ${props => props.isDark ? 'rgba(88, 91, 112, 0.25)' : 'rgba(124, 127, 147, 0.25)'} ;
  backdrop-filter: blur(0.2rem);
  border: 0.2rem solid ${props => props.isDark ? 'rgba(88, 91, 112, 0.7)' : 'rgba(124, 127, 147, 0.7)'};
  padding: 5rem;
  border-radius: 1rem;
`

const Card = (props: CardProps) => {
  const isDark = useDarkTheme()
  return (
    <Container isDark={isDark} {...props}>
      {props.children}
    </Container>
  );
};

export default Card;
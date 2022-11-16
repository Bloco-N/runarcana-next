import React from 'react';
import styled from 'styled-components';
import useDarkTheme from '../hooks/useDarkTheme';

type CardProps = {
  id?: string
  children: React.ReactNode,
  className?:string
  onClick?: React.MouseEventHandler
}

type ContainerProps = {
  isDark: boolean
}

const Container = styled.div<ContainerProps>`
  background: ${props => props.isDark ? 'rgba(0, 9, 24, 0.25)' :'rgba(255, 255, 255, 0.25)' } ;
  backdrop-filter: blur(0.2rem);
  border: 0.2rem solid ${props => props.isDark ? 'rgba(40, 52, 73, 0.7)' :'rgba(255, 255, 255, 0.25)' };
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
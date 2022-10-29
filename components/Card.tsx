import React from 'react';
import styled from 'styled-components';
import useDarkTheme from '../hooks/useDarkTheme';

type CardProps = {
  children: React.ReactNode
}

type ContainerProps = {
  isDark: boolean
}

const Container = styled.div<ContainerProps>`
  background: ${props => props.isDark ? 'rgba(0, 9, 24, 0.25)' :'rgba(245, 207, 240, 0.25)' } ;
  backdrop-filter: blur(0.2rem);
  border: 0.4rem outset ${props => props.isDark ? 'rgba(40, 52, 73, 0.7)' :'rgba(236, 111, 220, 0.25)' };
  padding: 5rem;
`

const Card = (props: CardProps) => {
  const isDark = useDarkTheme()
  return (
    <Container isDark={isDark}>
      {props.children}
    </Container>
  );
};

export default Card;
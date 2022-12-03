import React, { useState } from 'react';
import styled from 'styled-components';
import useDarkTheme from '../../hooks/useDarkTheme';
import { Character } from '../../types/UserCharacterDashBoard';
import Card from '../Card';

type CharacteristicsCardProps = {
  character: Character
}

type CharacteristicItemProps = {
  children: React.ReactNode
  onClick: React.MouseEventHandler
  id?: string
}

type CharacteristicItemContainerProps = {
  isDark: boolean
}

const Container = styled.div<CharacteristicItemContainerProps>`
  background: ${props => props.isDark ? 'rgba(88, 91, 112, 0.25)' : 'rgba(124, 127, 147, 0.25)'} ;
  backdrop-filter: blur(0.2rem);
  border: 0.2rem solid ${props => props.isDark ? 'rgba(88, 91, 112, 0.7)' : 'rgba(124, 127, 147, 0.7)'};
  padding: 1rem;
  border-radius: 1rem;
  height: 5rem;
  width: 20rem;
  transition: 0.5s;
  :hover{
    cursor: pointer;
    border-color: var(--secondary);
  }
`

const CharacteristicItem = ({ children, id, onClick }: CharacteristicItemProps) => {
  const isDark = useDarkTheme()
  return (
    <Container onClick={(e) => onClick(e)} isDark={isDark} id={id}>
      {children}
    </Container>
  )
}

const CharacteristicsCard = ({ character }: CharacteristicsCardProps) => {
  const [content, setContent] = useState(0)
  const handleClickItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    setContent(Number(target.id))
  }
  return (
    <Card className='characteristics-card'>
      <h3 className='title'>características</h3>
      <div className="menu-wrapper">
        {character?.Characteristics.map((item, index) => (
          <CharacteristicItem onClick={handleClickItem} id={String(index)} key={item.name}>
            {item.name.toLowerCase()}
          </CharacteristicItem>
        ))}
      </div>
      <div className="content-wrapper">
        <h2>{character?.Characteristics[content].name.toLowerCase()}</h2>
        <ul>
          {character?.Characteristics[content].info.map(item => (
            <li key={item}>
              &gt; {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default CharacteristicsCard;
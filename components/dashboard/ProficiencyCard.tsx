import React from 'react';
import { Character } from '../../types/UserCharacterDashBoard';
import Card from '../Card';

type ProficiencyCardProps = {
  character: Character
}

const ProficiencyCard = ({ character }: ProficiencyCardProps) => {
  return (
    <Card className='proficiency-card'>
      <p>bônus de proeficiência / inspiração</p>
      <div aria-label="bônus de proeficiência" data-balloon-pos="down">
        <div className="proficiency">{character?.proficiencyBonus}</div>
      </div>
      <div aria-label="inspiração" data-balloon-pos="down">
        <input min={0} max={50} defaultValue={0} name='inspiration' className='attribute-value' type="number" />
      </div>
    </Card>
  );
};

export default ProficiencyCard;
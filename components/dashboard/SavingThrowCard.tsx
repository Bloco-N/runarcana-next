import React, { Dispatch, SetStateAction } from 'react';
import { Skills, SkillsValues } from '../../types/UserCharacterDashBoard';
import Card from '../Card';
import ThreeWaySwitch from '../ThreeWaySwitch';

type SavingThrowCardProps = {
  skills: Skills
  setSkills: Dispatch<SetStateAction<Skills>>
  skillsValues: SkillsValues
}

const SavingThrowCard = ({ skills, setSkills, skillsValues }: SavingThrowCardProps) => {
  return (
    <Card className='savingthrow-card'>
      <div>
        <p>for</p>
        <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.strengthSavingThrow as string} name='strengthSavingThrow' />
        <div className="attribute-value">{skillsValues?.strengthSavingThrow}</div>
      </div>
      <div>
        <p>des</p>
        <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.dexteritySavingThrow as string} name='dexteritySavingThrow' />
        <div className="attribute-value">{skillsValues?.dexteritySavingThrow}</div>
      </div>
      <div>
        <p>con</p>
        <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.constitutionSavingThrow as string} name='constitutionSavingThrow' />
        <div className="attribute-value">{skillsValues?.constitutionSavingThrow}</div>
      </div>
      <div>
        <p>int</p>
        <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.intelligenceSavingThrow as string} name='intelligenceSavingThrow' />
        <div className="attribute-value">{skillsValues?.intelligenceSavingThrow}</div>
      </div>
      <div>
        <p>sab</p>
        <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.wisdomSavingThrow as string} name='wisdomSavingThrow' />
        <div className="attribute-value">{skillsValues?.wisdomSavingThrow}</div>
      </div>
      <div>
        <p>car</p>
        <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.charismaSavingThrow as string} name='charismaSavingThrow' />
        <div className="attribute-value">{skillsValues?.charismaSavingThrow}</div>
      </div>
    </Card>
  );
};

export default SavingThrowCard;
import { useQuery } from '@apollo/client';
import { useRouter } from "next/router"
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import Card from '../../components/Card';
import LoadingContext from '../../contexts/LoadingContext';
import { USER_CHARACTER_DASHBOARD } from '../../gql/querys';
import LoadingContextType from '../../types/LoadingContextType';
import UserCharacterDashboard, { Attributes, Character, Skills, SkillsValues } from '../../types/UserCharacterDashBoard';
import Container from '../../styles/dashboardStyles';
import AttributesCard from '../../components/dashboard/AttributesCard';
import SkillsCard from '../../components/dashboard/SkillsCard';
import SavingThrowCard from '../../components/dashboard/SavingThrowCard';
import RegionCard from '../../components/dashboard/RegionCard';
import MoneyCard from '../../components/dashboard/MoneyCard';
import ProficiencyCard from '../../components/dashboard/ProficiencyCard';
import CharacteristicsCard from '../../components/dashboard/CharacteristicsCard';

export default function CharacterDashBoard() {
  const router = useRouter()
  const { id } = router.query
  const token = localStorage.getItem('token')
  const [, setLoading] = useContext(LoadingContext) as LoadingContextType
  const { loading, data } = useQuery<UserCharacterDashboard>(USER_CHARACTER_DASHBOARD, {
    variables: {
      "where": {
        "id": {
          "equals": Number(id)
        }
      }
    },
    context: {
      headers: {
        Authorization: "Bearer " + token
      }
    },
    fetchPolicy: "no-cache"
  })
  const [character, setCharacter] = useState<Character>();
  const [skills, setSkills] = useState<Skills>()
  const [skillsValues, setSkillsValues] = useState<SkillsValues>()
  const [attributes, setAttributes] = useState<Attributes>()
  const [modifiers, setModifiers] = useState<Attributes>({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  })

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  useEffect(() => {
    setCharacter(data?.userInfo.Characters[0])
  }, [data])

  useEffect(() => {
    if (character) {
      const { acrobatics, athletics, arcana, performance, deception, stealth, history, intimidation, insight, investigation, animalHandling, medicine, nature, perception, persuasion, sleightOfHand, religion, survival, tecnology, strengthSavingThrow, dexteritySavingThrow, constitutionSavingThrow, intelligenceSavingThrow, wisdomSavingThrow, charismaSavingThrow, strength, dexterity, constitution, intelligence, wisdom, charisma } = character
      setSkills({
        acrobatics,
        athletics,
        arcana,
        performance,
        deception,
        stealth,
        history,
        intimidation,
        insight,
        investigation,
        animalHandling,
        medicine,
        nature,
        perception,
        persuasion,
        sleightOfHand,
        religion,
        survival,
        tecnology,
        strengthSavingThrow,
        dexteritySavingThrow,
        constitutionSavingThrow,
        intelligenceSavingThrow,
        wisdomSavingThrow,
        charismaSavingThrow
      })
      setAttributes({
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma
      })
    }
  }, [character])

  return (
    <Container>
      <Card className='infos-card'>
        <p>nome: {character?.name.toLocaleLowerCase()}</p>
        <p>origem: {character?.Origin.name.toLocaleLowerCase()}</p>
        <p>passado: {character?.Past.name.toLocaleLowerCase()}</p>
        <p>classe: {character?.CharacterRunarcanaClasses[0].RunarcanaClass.name.toLocaleLowerCase()}</p>
      </Card>
      <RegionCard
        data={data as UserCharacterDashboard}
        character={character as Character}
      />
      <AttributesCard
        character={character as Character}
        modifiers={modifiers}
        attributes={attributes as Attributes}
        skillsValues={skillsValues as SkillsValues}
        setAttributes={setAttributes as Dispatch<React.SetStateAction<Attributes>>}
        setModifiers={setModifiers as Dispatch<SetStateAction<Attributes>>}
        id={id as string}
        token={token as string}
      />
      <SkillsCard
        id={id as string}
        token={token as string}
        character={character as Character}
        attributes={attributes as Attributes}
        skills={skills as Skills}
        setSkills={setSkills as Dispatch<SetStateAction<Skills>>}
        setSkillsValues={setSkillsValues as Dispatch<SetStateAction<SkillsValues>>}
        skillsValues={skillsValues as SkillsValues}
      />
      <SavingThrowCard
        skills={skills as Skills}
        setSkills={setSkills as Dispatch<SetStateAction<Skills>>}
        skillsValues={skillsValues as SkillsValues}
      />
      <MoneyCard />
      <ProficiencyCard
        character={character as Character}
      />
      <CharacteristicsCard
        character={character as Character}
      />
    </Container>
  )
}
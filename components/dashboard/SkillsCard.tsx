import { useMutation } from '@apollo/client';
import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import LoadingContext from '../../contexts/LoadingContext';
import { UPDATE_CHARACTER } from '../../gql/mutations';
import LoadingContextType from '../../types/LoadingContextType';
import { Attributes, Character, Skills, SkillsAttributesMap, SkillsValues } from '../../types/UserCharacterDashBoard';
import { modifier, proficiency } from '../../utils/attributeFunctios';
import Card from '../Card';
import ThreeWaySwitch from '../ThreeWaySwitch';

type SkillsCardProps = {
  id: string
  token: string
  character: Character
  attributes: Attributes
  skills: Skills
  setSkills: Dispatch<SetStateAction<Skills>>
  setSkillsValues: Dispatch<SetStateAction<SkillsValues>>
  skillsValues: SkillsValues
}

const SkillsCard = ({ id, token, character, attributes, skills, setSkills, setSkillsValues, skillsValues }: SkillsCardProps) => {
  const [, setLoading] = useContext(LoadingContext) as LoadingContextType
  const [mutateFunction, { loading }] = useMutation(UPDATE_CHARACTER, { errorPolicy: 'all' })

  useEffect(() => {
    if (skills) {
      mutateFunction({
        variables: {
          "where": {
            "id": Number(id)
          },
          "data": skills
        },
        context: {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      })
      if (character && attributes) {
        const aux = {} as SkillsValues
        Object.keys(skills as Skills).map(key => {
          aux[key as keyof SkillsValues] = proficiency(skills[key as keyof Skills], modifier(attributes[SkillsAttributesMap[key as keyof typeof SkillsAttributesMap] as keyof Attributes] as number), character.proficiencyBonus) as number
        })
        setSkillsValues({ ...aux })
      }
    }
  }, [skills, id, mutateFunction, setSkillsValues, token, attributes, character])

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  return (
    <Card className='skills-card'>
      <div className="skills-wrapper">
        <div className={skills?.athletics === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='athletics' value={character?.athletics as string} />
          <section>
            <p>
              atletismo
            </p>
            <p>
              (for)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.athletics}</p>
        </div>
        <div className={skills?.acrobatics === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='acrobatics' value={character?.acrobatics as string} />
          <section>
            <p>
              acrobacia
            </p>
            <p>
              (des)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.acrobatics}</p>
        </div>
        <div className={skills?.stealth === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='stealth' value={character?.stealth as string} />
          <section>
            <p>
              furtividade
            </p>
            <p>
              (des)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.stealth}</p>
        </div>
        <div className={skills?.sleightOfHand === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='sleightOfHand' value={character?.sleightOfHand as string} />
          <section>
            <p>
              prestidigitação
            </p>
            <p>
              (des)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.sleightOfHand}</p>
        </div>
        <div className={skills?.arcana === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='arcana' value={character?.arcana as string} />
          <section>
            <p>
              arcanismo
            </p>
            <p>
              (int)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.arcana}</p>
        </div>
        <div className={skills?.history === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='history' value={character?.history as string} />
          <section>
            <p>
              história
            </p>
            <p>
              (int)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.history}</p>
        </div>
        <div className={skills?.investigation === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='investigation' value={character?.investigation as string} />
          <section>
            <p>
              investigação
            </p>
            <p>
              (int)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.investigation}</p>
        </div>
        <div className={skills?.nature === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='nature' value={character?.nature as string} />
          <section>
            <p>
              natureza
            </p>
            <p>
              (int)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.nature}</p>
        </div>
        <div className={skills?.religion === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='religion' value={character?.religion as string} />
          <section>
            <p>
              religião
            </p>
            <p>
              (int)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.religion}</p>
        </div>
        <div className={skills?.tecnology === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='tecnology' value={character?.tecnology as string} />
          <section>
            <p>
              tecnologia
            </p>
            <p>
              (int)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.tecnology}</p>
        </div>
        <div className={skills?.insight === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='insight' value={character?.insight as string} />
          <section>
            <p>
              intuição
            </p>
            <p>
              (sab)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.insight}</p>
        </div>
        <div className={skills?.animalHandling === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='animalHandling' value={character?.animalHandling as string} />
          <section>
            <p>
              lidar com animais
            </p>
            <p>
              (sab)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.animalHandling}</p>
        </div>
        <div className={skills?.medicine === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='medicine' value={character?.medicine as string} />
          <section>
            <p>
              medicina
            </p>
            <p>
              (sab)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.medicine}</p>
        </div>
        <div className={skills?.perception === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='perception' value={character?.perception as string} />
          <section>
            <p>
              percepção
            </p>
            <p>
              (sab)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.perception}</p>
        </div>
        <div className={skills?.survival === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='survival' value={character?.survival as string} />
          <section>
            <p>
              sobrevivência
            </p>
            <p>
              (sab)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.survival}</p>
        </div>
        <div className={skills?.performance === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='performance' value={character?.performance as string} />
          <section>
            <p>
              atuação
            </p>
            <p>
              (car)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.performance}</p>
        </div>
        <div className={skills?.deception === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='deception' value={character?.deception as string} />
          <section>
            <p>
              enganação
            </p>
            <p>
              (car)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.deception}</p>
        </div>
        <div className={skills?.intimidation === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='intimidation' value={character?.intimidation as string} />
          <section>
            <p>
              intimidação
            </p>
            <p>
              (car)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.intimidation}</p>
        </div>
        <div className={skills?.persuasion === 'SPECIALIST' ? 'gradient' : ''}>
          <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='persuasion' value={character?.persuasion as string} />
          <section>
            <p>
              persuasão
            </p>
            <p>
              (car)
            </p>
          </section>
          <p className='skill-value'>{skillsValues?.persuasion}</p>
        </div>
      </div>
    </Card>
  );
};

export default SkillsCard;
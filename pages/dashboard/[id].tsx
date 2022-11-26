import { useQuery, useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from "next/router"
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import Card from '../../components/Card';
import LoadingContext from '../../contexts/LoadingContext';
import { USER_CHARACTER_DASHBOARD } from '../../gql/querys';
import useDarkTheme from '../../hooks/useDarkTheme';
import LoadingContextType from '../../types/LoadingContextType';
import UserCharacterDashboard, { Attributes, Character, Skills, SkillsAttributesMap, SkillsValues } from '../../types/UserCharacterDashBoard';
import demaciaImg from "../../public/maps/dark/demacia.svg"
import freljordImg from "../../public/maps/dark/freljord.svg"
import ixtalImg from "../../public/maps/dark/ixtal.svg"
import shurimaImg from "../../public/maps/dark/shurima.svg"
import restImg from "../../public/maps/dark/resto.svg"
import noxusImg from "../../public/maps/dark/noxus.svg"
import sentinaImg from "../../public/maps/dark/sentina.svg"
import targonImg from "../../public/maps/dark/targon.svg"
import yoniaImg from "../../public/maps/dark/yonia.svg"
import zaumImg from "../../public/maps/dark/zaum.svg"
import shadowImg from "../../public/maps/dark/sombras.svg"
import demaciaLightImg from "../../public/maps/light/demacia.svg"
import freljordLightImg from "../../public/maps/light/freljord.svg"
import ixtalLightImg from "../../public/maps/light/ixtal.svg"
import shurimaLightImg from "../../public/maps/light/shurima.svg"
import restLightImg from "../../public/maps/light/resto.svg"
import noxusLightImg from "../../public/maps/light/noxus.svg"
import sentinaLightImg from "../../public/maps/light/sentina.svg"
import targonLightImg from "../../public/maps/light/targon.svg"
import yoniaLightImg from "../../public/maps/light/yonia.svg"
import zaumLightImg from "../../public/maps/light/zaum.svg"
import shadowLightImg from "../../public/maps/light/sombras.svg"
import { modifier, proficiency } from '../../utils/attributeFunctios';
import ThreeWaySwitch from '../../components/ThreeWaySwitch';
import { UPDATE_CHARACTER_ATTRIBUTES, UPDATE_CHARACTER_PROFICIENCY } from '../../gql/mutations';
import Container from '../../styles/dashboardStyles';

export default function CharacterDashBoard() {
  const isDark = useDarkTheme()
  const router = useRouter()
  const { id } = router.query
  const token = localStorage.getItem('token')
  const [, setLoading] = useContext(LoadingContext) as LoadingContextType
  const { loading, data } = useQuery<UserCharacterDashboard>(USER_CHARACTER_DASHBOARD, {
    variables: {
      charId: Number(id)
    },
    context: {
      headers: {
        Authorization: "Bearer " + token
      }
    },
    fetchPolicy: "no-cache"
  })
  const [mutateFunctionProficiency, { loading: loadingProficiency }] = useMutation(UPDATE_CHARACTER_PROFICIENCY, { errorPolicy: 'all' })
  const [mutateFunctionAttributes, { loading: loadingAttributes }] = useMutation(UPDATE_CHARACTER_ATTRIBUTES, { errorPolicy: 'all' })
  const [character, setCharacter] = useState<Character>();
  const [skills, setSkills] = useState<Skills>()
  const [skillsValue, setSkillsValue] = useState<SkillsValues>()
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
    setLoading(loadingProficiency)
  }, [loadingProficiency, setLoading])

  useEffect(() => {
    setLoading(loadingAttributes)
  }, [loadingAttributes, setLoading])

  useEffect(() => {
    setCharacter(data?.userInfo.characters[0])
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

  useEffect(() => {
    const aux = {} as Attributes
    if (attributes) {
      console.log(attributes)
      Object.entries(attributes).map(([key, value]) => {
        aux[key as keyof Attributes] = modifier(value)
      })
      setModifiers({ ...aux })
      mutateFunctionAttributes({
        variables: {
          data: {
            ...attributes,
            id: Number(id)
          }
        },
        context: {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      })
    }
  }, [attributes, mutateFunctionAttributes, id, token])

  useEffect(() => {
    if (skills) {
      mutateFunctionProficiency({
        variables: {
          data: {
            ...skills,
            id: Number(id)
          }
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
        setSkillsValue({ ...aux })
      }
    }
  }, [skills, id, mutateFunctionProficiency, token, attributes, character])

  useEffect(() => {
    const img = document.getElementById(String(data?.userInfo.characters[0].Region.id) === '12' ? '9' : String(data?.userInfo.characters[0].Region.id))
    if (!img) {
      const bandopolis = document.getElementsByClassName('bandopolis-index')
      bandopolis[0].classList.remove('none')
      bandopolis[0].classList.add('block')
    } else {
      const bandopolis = document.getElementsByClassName('bandopolis-index')
      bandopolis[0].classList.remove('block')
      bandopolis[0].classList.add('none')
    }
    img?.classList.add('map-grow')
  }, [data])

  const onChangeAttribute = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const aux = attributes as Attributes
    if (Number(target.value) > 50) {
      target.value = '50'
      aux[target.name as keyof Attributes] = 50
      setAttributes({ ...aux })
    } else if (Number(target.value) < 0) {
      target.value = '0'
      aux[target.name as keyof Attributes] = 0
      setAttributes({ ...aux })
    }
    aux[target.name as keyof Attributes] = Number(target.value)
    setAttributes({ ...aux })
  }

  return (
    <Container>
      <Card className='infos-card'>
        <p>nome: {character?.name.toLocaleLowerCase()}</p>
        <p>origem: {character?.Origin.name.toLocaleLowerCase()}</p>
        <p>passado: {character?.Past.name.toLocaleLowerCase()}</p>
        <p>classe: {character?.CharacterRunarcanaClass[0].RunarcanaClass.name.toLocaleLowerCase()}</p>
      </Card>
      <Card className='region-card'>
        <div className="map-wrapper">
          <Image className='map' id="1" src={isDark ? sentinaImg : sentinaLightImg} alt='sentina' />
          <Image className='map' id="3" src={isDark ? demaciaImg : demaciaLightImg} alt='demacia' />
          <Image className='map' id="4" src={isDark ? freljordImg : freljordLightImg} alt='freljord' />
          <Image className='map' id="5" src={isDark ? shadowImg : shadowLightImg} alt='sombras' />
          <Image className='map' id="6" src={isDark ? yoniaImg : yoniaLightImg} alt='yonia' />
          <Image className='map' id="7" src={isDark ? ixtalImg : ixtalLightImg} alt='ixtal' />
          <Image className='map' id="8" src={isDark ? noxusImg : noxusLightImg} alt='noxus' />
          <Image className='map' id="9" src={isDark ? zaumImg : zaumLightImg} alt='zaum' />
          <Image className='map' id="10" src={isDark ? shurimaImg : shurimaLightImg} alt='shurima' />
          <Image className='map' id="11" src={isDark ? targonImg : targonLightImg} alt='targon' />
          <Image className='map' src={isDark ? restImg : restLightImg} alt='resto' />
          <h1 className="bandopolis-index">?</h1>
          <p className='region-name'>{character?.Region.name.toLocaleLowerCase()}</p>
        </div>
      </Card>
      <Card className='attributes-card'>
        <div className="attributes-wrapper">
          <div>
            <label htmlFor="strenght">for</label>
            <input min={0} max={50} onChange={(e) => onChangeAttribute(e)} defaultValue={attributes?.strength} name='strength' className='attribute-value' type="number" />
            <p className='modifier'>{modifiers.strength}</p>
          </div>
          <div>
            <label htmlFor="dexterity">des</label>
            <input min={0} max={50} onChange={(e) => onChangeAttribute(e)} defaultValue={attributes?.dexterity} name='dexterity' className='attribute-value' type="number" />
            <p className='modifier'>{modifiers.dexterity}</p>
          </div>
          <div>
            <label htmlFor="constitution">con</label>
            <input min={0} max={50} onChange={(e) => onChangeAttribute(e)} defaultValue={attributes?.constitution} name='constitution' className='attribute-value' type="number" />
            <p className='modifier'>{modifiers.constitution}</p>
          </div>
          <div>
            <label htmlFor="intelligence">int</label>
            <input min={0} max={50} onChange={(e) => onChangeAttribute(e)} defaultValue={attributes?.intelligence} name='intelligence' className='attribute-value' type="number" />
            <p className='modifier'>{modifiers.intelligence}</p>
          </div>
          <div>
            <label htmlFor="wisdom">sab</label>
            <input min={0} max={50} onChange={(e) => onChangeAttribute(e)} defaultValue={attributes?.wisdom} name='wisdom' className='attribute-value' type="number" />
            <p className='modifier'>{modifiers.wisdom}</p>
          </div>
          <div>
            <label htmlFor="charisma">car</label>
            <input min={0} max={50} onChange={(e) => onChangeAttribute(e)} defaultValue={attributes?.charisma} name='charisma' className='attribute-value' type="number" />
            <p className='modifier'>{modifiers.charisma}</p>
          </div>
        </div>
        <div className="passive-wrapper">
          <div>
            <div className="attribute-value">{modifiers.dexterity}</div>
            <p>iniciativa</p>
          </div>
          <div>
            <div className="attribute-value">{modifiers.dexterity}</div>
            <p>deslocamento</p>
          </div>
          <div>
            <div className="attribute-value">{skillsValue?.perception as number + 10}</div>
            <p>percepção passiva</p>
          </div>
          <div>
            <div className="attribute-value">{skillsValue?.insight as number + 10}</div>
            <p>intuição passiva</p>
          </div>
        </div>
        <div className="life-wrapper">
          <p>pontos de vida</p>
          <div className='wrapper-current' aria-label="vida atual" data-balloon-pos="down">
            <input min={0} max={50} className="current" name='current-life' defaultValue={0} type='number' />
          </div>
          <div aria-label="vida total" data-balloon-pos="down">
            <div className="life-count">
              10
            </div>
          </div>
          <div className='wrapper-extra' aria-label="vida extra" data-balloon-pos="down">
            <input min={0} max={50} className="extra" name='current-life' defaultValue={0} type='number' />
          </div>

        </div>
        <div className="ca-wrapper">
          <p>ca</p>
          <div className="ca">10</div>
          <div className="wrapper-bonus" aria-label="bônus de escudo" data-balloon-pos="down">
            <input min={0} max={10} type='number' className="shield-bonus" defaultValue={0} name='shield-bonus' />
          </div>
        </div>
      </Card>
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
            <p className='skill-value'>{skillsValue?.athletics}</p>
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
            <p className='skill-value'>{skillsValue?.acrobatics}</p>
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
            <p className='skill-value'>{skillsValue?.stealth}</p>
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
            <p className='skill-value'>{skillsValue?.sleightOfHand}</p>
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
            <p className='skill-value'>{skillsValue?.arcana}</p>
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
            <p className='skill-value'>{skillsValue?.history}</p>
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
            <p className='skill-value'>{skillsValue?.investigation}</p>
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
            <p className='skill-value'>{skillsValue?.nature}</p>
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
            <p className='skill-value'>{skillsValue?.religion}</p>
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
            <p className='skill-value'>{skillsValue?.tecnology}</p>
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
            <p className='skill-value'>{skillsValue?.insight}</p>
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
            <p className='skill-value'>{skillsValue?.animalHandling}</p>
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
            <p className='skill-value'>{skillsValue?.medicine}</p>
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
            <p className='skill-value'>{skillsValue?.perception}</p>
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
            <p className='skill-value'>{skillsValue?.survival}</p>
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
            <p className='skill-value'>{skillsValue?.performance}</p>
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
            <p className='skill-value'>{skillsValue?.deception}</p>
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
            <p className='skill-value'>{skillsValue?.intimidation}</p>
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
            <p className='skill-value'>{skillsValue?.persuasion}</p>
          </div>
        </div>
      </Card>
      <Card className='savingthrow-card'>
        <div>
          <p>for</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.strengthSavingThrow as string} name='strengthSavingThrow' />
          <div className="attribute-value">{skillsValue?.strengthSavingThrow}</div>
        </div>
        <div>
          <p>des</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.dexteritySavingThrow as string} name='dexteritySavingThrow' />
          <div className="attribute-value">{skillsValue?.dexteritySavingThrow}</div>
        </div>
        <div>
          <p>con</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.constitutionSavingThrow as string} name='constitutionSavingThrow' />
          <div className="attribute-value">{skillsValue?.constitutionSavingThrow}</div>
        </div>
        <div>
          <p>int</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.intelligenceSavingThrow as string} name='intelligenceSavingThrow' />
          <div className="attribute-value">{skillsValue?.intelligenceSavingThrow}</div>
        </div>
        <div>
          <p>sab</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.wisdomSavingThrow as string} name='wisdomSavingThrow' />
          <div className="attribute-value">{skillsValue?.wisdomSavingThrow}</div>
        </div>
        <div>
          <p>car</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.charismaSavingThrow as string} name='charismaSavingThrow' />
          <div className="attribute-value">{skillsValue?.charismaSavingThrow}</div>
        </div>
      </Card>
      <Card className='money-card'>
        <div>
          <input defaultValue={0} name='PL' className='attribute-value' type="number" />
          <p>pl</p>
        </div>
        <div>
          <input defaultValue={0} name='PO' className='attribute-value' type="number" />
          <p>po</p>
        </div>
        <div>
          <input defaultValue={0} name='PE' className='attribute-value' type="number" />
          <p>pe</p>
        </div>
        <div>
          <input defaultValue={0} name='PP' className='attribute-value' type="number" />
          <p>pp</p>
        </div>
        <div>
          <input defaultValue={0} name='PC' className='attribute-value' type="number" />
          <p>pc</p>
        </div>
      </Card>
      <Card className='proficiency-card'>
        <div aria-label="bônus de proeficiência" data-balloon-pos="down">
          <div className="proficiency">10</div>
        </div>
        <div aria-label="inspiração" data-balloon-pos="down">
          <input min={0} max={50} defaultValue={0} name='inspiration' className='attribute-value' type="number" />
        </div>
      </Card>
    </Container>
  )
}
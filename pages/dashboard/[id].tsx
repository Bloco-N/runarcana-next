import { useQuery, useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from "next/router"
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styled from "styled-components"
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

const Container = styled.div`
  width: 1450px;
  padding: 4rem;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(8, 11rem);
  gap: 1rem;
  .region-card{
    grid-row-start: 3;
    grid-row-end: 5;
    grid-column-start: 4;
    grid-column-end: 5;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    .map-wrapper{
      height: 100%;
      width: 100%;
      position: absolute;
      right: -5%;
      top: 4rem;
      .map{
        width: 100%;
        height: auto;
        position: absolute;
        opacity: 0.2;
        transition: 0.5s;
        z-index: -1;
        top: -8%;
      }
      .bandopolis-index{
        font-size: 6rem;
        position: absolute;
        top: 20%;
        right: 50%;
      }
      .region-name{
        position: relative;
        padding: 1rem;
        border-radius: 1rem;
        top: 60%;
        display: inline;
        background-color: var(--secondary);
        color: var(--primary);
      }
    }
  }
  .infos-card{
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .attributes-card{
    grid-row-start: 1;
    grid-row-end: 5;
    grid-column-start: 2;
    grid-column-end: 4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    .attributes-wrapper{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 1rem;
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 3;
      div{
        label{
          position: relative;
          top: -3rem;
        }
        .attribute-value{
          all: unset;
          appearance: none;
          -moz-appearance: textfield;
          font-family: 'Underdog', cursive;
          height: 6rem;
          width: 6rem;
          text-align: center;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          background-color: rgba(76, 76, 76, 0.25);
          backdrop-filter: blur(0.2rem);
          font-size: 3rem;
          ::-webkit-inner-spin-button{
            -webkit-appearance: none;
            margin: 0;
          }
        }
        .modifier{
          font-family: 'Underdog', cursive;
          height: 4rem;
          width: 4rem;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          background-color: rgba(76, 76, 76, 0.25);
          backdrop-filter: blur(0.2rem);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          top: -3rem;
          left: 7rem;
        }
      }
    }
    .passive-wrapper{
      display: flex;
      gap: 2rem;
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start: 1;
      grid-column-end: 4;
      div{
        display: flex;
        align-items: center;
        gap: 1rem;
        .attribute-value{
            all: unset;
            appearance: none;
            -moz-appearance: textfield;
            font-family: 'Underdog', cursive;
            height: 6rem;
            width: 6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
            background-color: rgba(76, 76, 76, 0.25);
            backdrop-filter: blur(0.2rem);
            font-size: 3rem;
        }
      }
    }
  }
  .skills-card{
    grid-row-start: 1;
    grid-row-end: 9;
    display: flex;
    flex-direction: column;
    align-items: center;
    .skills-wrapper{
      width: 100%;
      font-size:1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
      >div{
        width: 98%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: solid 0.1rem var(--secondary);
        padding: 1rem;
        border-radius: 1rem;
        .skill-value{
          font-family: 'Underdog', cursive;
        }
        >div{
          width: 2rem;
        }
        >section{
          width: 70%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .savingthrow-card{
    grid-row-start: 5;
    grid-row-end: 6;
    grid-column-start: 2;
    grid-column-end: 4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    >div{
      display: flex;
      p{
        position: relative;
        top:-1rem;
        left: -2rem;
      }
      .switch{
        position: relative;
        top: 4rem;
        left: 7rem;
        margin-left: -5rem;
        z-index: 2;
        div{
          height: 3rem;
          width: 3rem;
        }
      }
      .attribute-value{
              font-family: 'Underdog', cursive;
              height: 6rem;
              width: 6rem;
              display: flex;
              align-items: center;
              justify-content: center;
              clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
              background-color: rgba(76, 76, 76, 0.25);
              backdrop-filter: blur(0.2rem);
              font-size: 3rem;
          }
    }
  }
  .money-card{
    display: flex;
    align-items: center;
    gap: 1rem;
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      .attribute-value{
        all: unset;
        appearance: none;
        -moz-appearance: textfield;
        font-family: 'Underdog', cursive;
        height: 4rem;
        width: 4rem;
        text-align: center;
        clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        background-color: rgba(76, 76, 76, 0.25);
        backdrop-filter: blur(0.2rem);
        ::-webkit-inner-spin-button{
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }

`

export default function CharacterDashBoard(){
  const isDark = useDarkTheme()
  const router = useRouter()
  const { id } = router.query
  const token = localStorage.getItem('token')
  const [, setLoading]  = useContext(LoadingContext) as LoadingContextType
  const {loading, data} = useQuery<UserCharacterDashboard>(USER_CHARACTER_DASHBOARD, {
    variables:{
      charId: Number(id)
    },
    context:{
      headers:{
        Authorization: "Bearer " + token
      }
    },
    fetchPolicy: "no-cache" 
  })
  const [mutateFunctionProficiency, {loading:loadingProficiency}] = useMutation(UPDATE_CHARACTER_PROFICIENCY, {errorPolicy:'all'})
  const [mutateFunctionAttributes, {loading:loadingAttributes}] = useMutation(UPDATE_CHARACTER_ATTRIBUTES, {errorPolicy:'all'})
  const [character, setCharacter] = useState<Character>();
  const [skills, setSkills] = useState<Skills>()
  const [skillsValue, setSkillsValue] = useState<SkillsValues>()
  const [attributes, setAttributes] = useState<Attributes>()
  const [modifiers, setModifiers] = useState<Attributes>({
    strength:0,
    dexterity:0,
    constitution:0,
    intelligence:0,
    wisdom:0,
    charisma:0
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
    if(character){
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
    if(attributes){
      console.log(attributes)
      Object.entries(attributes).map(([key, value]) => {
        aux[key as keyof Attributes] = modifier(value)
      })
      setModifiers({...aux})
      mutateFunctionAttributes({
        variables:{
          data:{
            ...attributes,
            id: Number(id)
          }
        },
        context:{
          headers:{
            authorization: 'Bearer ' + token
          }
        }
      })
    }
  }, [attributes, mutateFunctionAttributes, id, token])

  useEffect(() =>{ 
    if(skills){
      mutateFunctionProficiency({
        variables:{
          data:{
            ...skills,
            id: Number(id)
          }
        },
        context:{
          headers:{
            authorization: 'Bearer ' + token
          }
        }
      })
      if(character && attributes){
        const aux = {} as SkillsValues
        Object.keys(skills as Skills).map(key => {
          aux[key as keyof SkillsValues] = proficiency(skills[key as keyof Skills], modifier(attributes[SkillsAttributesMap[key as keyof typeof SkillsAttributesMap] as keyof Attributes] as number), character.proficiencyBonus) as number
        })
        setSkillsValue({...aux})
      }
    }
  }, [skills, id, mutateFunctionProficiency, token, attributes, character])

  useEffect(() => {
    const img = document.getElementById(String(data?.userInfo.characters[0].Region.id) === '12' ? '9' : String(data?.userInfo.characters[0].Region.id))
    if(!img){
      const bandopolis = document.getElementsByClassName('bandopolis-index')
      bandopolis[0].classList.remove('none')
      bandopolis[0].classList.add('block')
    }else{
      const bandopolis = document.getElementsByClassName('bandopolis-index')
      bandopolis[0].classList.remove('block')
      bandopolis[0].classList.add('none')
    }
    img?.classList.add('map-grow')
  },[data])

  const onChangeAttribute = (e:ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const aux = attributes as Attributes
    if(Number(target.value) > 50) {
      target.value = '50'
      aux[target.name as keyof Attributes] = 50
      setAttributes({...aux})
    }else if(Number(target.value) < 0){
      target.value = '0'
      aux[target.name as keyof Attributes] = 0
      setAttributes({...aux})
    }
    aux[target.name as keyof Attributes] = Number(target.value)
    setAttributes({...aux})
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
          <Image className='map' id="9"src={isDark ? zaumImg : zaumLightImg} alt='zaum' />
          <Image className='map' id="10" src={isDark ? shurimaImg : shurimaLightImg} alt='shurima' />
          <Image className='map' id="11"src={isDark ? targonImg : targonLightImg} alt='targon' />
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
            <div className="attribute-value">{skillsValue?.perception as number + 10}</div>
            <p>percepção passiva</p>
          </div>
          <div>
            <div className="attribute-value">{skillsValue?.insight as number + 10}</div>
            <p>intuição passiva</p>
          </div>
          <div>
            <div className="attribute-value">{modifiers.dexterity}</div>
            <p>iniciativa</p>
          </div>
        </div>
      </Card>
      <Card className='skills-card'>
        <div className="skills-wrapper">
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='acrobatics' value={character?.acrobatics as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='arcana' value={character?.arcana as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='athletics' value={character?.athletics as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='performance' value={character?.performance as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='deception' value={character?.deception as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='stealth' value={character?.stealth as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='history' value={character?.history as string}/>  
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='intimidation' value={character?.intimidation as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='insight' value={character?.insight as string}/>  
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='investigation' value={character?.investigation as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='animalHandling' value={character?.animalHandling as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='medicine' value={character?.medicine as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='nature' value={character?.nature as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='perception' value={character?.perception as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='persuasion' value={character?.persuasion as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>}  name='sleightOfHand' value={character?.sleightOfHand as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='religion' value={character?.religion as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='survival' value={character?.survival as string}/>
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
          <div>
            <ThreeWaySwitch skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} name='tecnology' value={character?.tecnology as string}/>
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
        </div>
      </Card>
      <Card className='savingthrow-card'>
        <div>
          <p>for</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.strengthSavingThrow as string} name='strengthSavingThrow'/>
          <div className="attribute-value">{skillsValue?.strengthSavingThrow}</div>
        </div>
        <div>
          <p>des</p>
        <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.dexteritySavingThrow as string} name='dexteritySavingThrow'/>
          <div className="attribute-value">{skillsValue?.dexteritySavingThrow}</div>
        </div>
        <div>
          <p>con</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.constitutionSavingThrow as string} name='constitutionSavingThrow'/>
          <div className="attribute-value">{skillsValue?.constitutionSavingThrow}</div>
        </div>
        <div>
          <p>int</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.intelligenceSavingThrow as string} name='intelligenceSavingThrow'/>
          <div className="attribute-value">{skillsValue?.intelligenceSavingThrow}</div>
        </div>
        <div>
          <p>sab</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.wisdomSavingThrow as string} name='wisdomSavingThrow'/>
          <div className="attribute-value">{skillsValue?.wisdomSavingThrow}</div>
        </div>
        <div>
          <p>car</p>
          <ThreeWaySwitch className='switch' skills={skills as Skills} setSkills={setSkills as Dispatch<SetStateAction<Skills>>} value={skills?.charismaSavingThrow as string} name='charismaSavingThrow'/>
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
    </Container>
  )
}
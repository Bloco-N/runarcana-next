import { useMutation } from '@apollo/client';
import styled from "styled-components"
import Card from "../../components/Card"
import RegionInput from '../../components/RegionInput';
import OriginInput from '../../components/OriginInput';
import InputsWrapper from '../../components/InputsWrapper';
import { useEffect, useState } from "react";
import RunarcanaClassInput from "../../components/RunarcanaClassInput";
import PastInput from "../../components/PastInput";
import MoralInput from "../../components/MoralInput";
import CharacterNameInput from "../../components/CharacterNameInput";
import CreateCharacterSubmit from "../../types/CreateCharacterSubmit";
import CharacterSubmitContext from "../../contexts/CharacterSubmitContext";
import { CREATE_CHARACTER } from "../../gql/mutations";
import { useRouter } from 'next/router';

const Container = styled.div`
  height: 80%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  .none{
    display: none;
  }
  .block{
    display: block;
  }
  .bandopolis-index{
    font-size: 20rem;
    position: absolute;
    right: 20%;
    top: 20%;
  }
  .name-field{
    padding-top: 5rem;
  }
  .details-card{
    position: absolute;
    width: 50rem;
    top: 30%;
    left: 60%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    p{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
  span.next{
    cursor: pointer;
    position: absolute;
    bottom: 2%;
    right: 2%;
    opacity: 0.5;
    transition: 0.5s;
    :hover{
      opacity: 1;
    }
  }
  span{
    user-select: none;
  }
  span.prev{
    cursor: pointer;
    position: absolute;
    bottom: 2%;
    left: 2%;
    opacity: 0.5;
    transition: 0.5s;
    :hover{
      opacity: 1;
    }
  }
  .c-container{
    height: 100%;
    width: 80%;
    .c-selection{
      height: 30rem;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3rem;
    }
    .moral{
      width: 50%;
      margin-top: 8rem;
      display:flex;
      align-items: center ;
      flex-direction: column;
      gap: 1rem;
      input{
        text-align: center;
      }
    }
    .c-origins{
      display: grid;
      align-items: center;
      justify-content: center;
      width: 50%;
      padding: 2rem;
      grid-template-columns: repeat(3, 8rem);
      grid-template-rows: repeat(3, 8rem);
      gap: 2rem;
      height: 1rem;
    }
    button{
      border-radius: 50%;
      height: 1rem;
      width: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &.left{
        transform: rotate(180deg);
      }
    }
    select{
      all: unset;
      width: 32%;
      text-align: center;
      font-size: 1.7rem;
      padding: 1rem;
      border: 0.1rem solid var(--secondary);
      border-radius: 1rem;
      option{
        appearance: none;
        display: none;
      }
    }
    .map{
      width: 50rem;
      height: auto;
      position: absolute;
      top: 25%;
      left: 55%;
      opacity: 0.5;
      transition: 0.5s;
      z-index: -1;
    }
    .origin{
      height: 8rem;
      width: auto;
      border-radius: 2rem;
      cursor: pointer;
      opacity: 0.3;
      transition: 0.5s;
      :hover{
        opacity: 1;
        transform: scale(1.1);
      }
    }
    .selected{
      opacity: 1;
    }
    .description{
      height: 50rem;
      position: absolute;
      top: 18%;
      right: 15%;
      color: var(--secondary);
      width: 35rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      div{
        margin: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: scroll;
        p{
          text-align: left;
        }
      }
      &.pasts{
        right: 10%;
        top: 5%;
      }
      &.morals{
        top: 30%;
        height: 10rem;
      }
      h2{
        opacity: 1;
      }
      p{
        opacity: 1;
        width: 90%;
        text-align: justify;
        background-color: var(--primary);
        padding: 2rem;
        border-radius: 1rem;
      }
    }
    .cover{
      position: absolute;
      border-radius: 1rem;
      opacity: 1;
      height: 25rem;
      width: 25rem;
      top: 6%;
      right: 2%;
    }
    .class-details{
      position: absolute;
      background-color: var(--primary);
      top:45%;
      right: 4rem;
      height: 12rem;
      width: 50rem;
      padding: 2rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      &.two{
        height: 18rem;
        top: 10%;
        width: 50rem;
      }
      div{
        margin: 0;
        display: flex;
        align-items: center;
        width: 100%;
        height: 5rem;
        gap: 2rem;
        div{
          display: flex;
          flex-direction: column;
          align-items:center;
          justify-content: center
        }
        p{
          height: 10rem;
          padding: 1rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--secondary);
          color: var(--primary);
        }
      }
      p{
        opacity: 1;
        width: 100%;
      }
    }

    h1{
      margin-bottom: 1rem;
    }
    h2{
      margin-bottom: 0.5rem;
    }
    p{
      font-size: 1.6rem;
      opacity: 0.6;
      width: 50%;
    }
  }
`
export default function CreateCharacter(){
  const router = useRouter()
  const [mutateFunction] = useMutation(CREATE_CHARACTER, {errorPolicy:'all'})
  const inputs = [RegionInput, OriginInput, RunarcanaClassInput, PastInput, MoralInput, CharacterNameInput]
  const [currentInput, setCurrentInput] = useState(0)
  const [characterSubmit, setCharacterSubmit] = useState<CreateCharacterSubmit>({
    regionId:1,
    originId:1,
    pastId:1,
    runarcanaClassId:1,
    essence:'',
    expression:'',
    exaltation:'',
    name:''
  })
  const handleNext = () => {
    if(currentInput === inputs.length - 1) {
      const token = localStorage.getItem('token')
      mutateFunction({
      variables:{data:characterSubmit},
      context:{
        headers:{
          authorization: 'Bearer ' + token
        }
      }
    })
      router.push('/')
    }
    setCurrentInput(currentInput + 1)
  }
  const handlePrevious = () => {
    if(currentInput === 0) return
    setCurrentInput(currentInput - 1)
  }

  return(
    <Container>
      <Card className="grow-up c-container">
        <h1>Inserindo dados no codex</h1>
        <CharacterSubmitContext.Provider value={[characterSubmit, setCharacterSubmit]}>
          <InputsWrapper currentInput={currentInput}/>
          <span className='prev' onClick={handlePrevious}>anterior</span>
          <span className='next' onClick={handleNext}>próximo</span>
        </CharacterSubmitContext.Provider>
        
      </Card>
    </Container>
  )
}
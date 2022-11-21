import { useMutation } from '@apollo/client';
import RegionInput from '../../components/create_character/RegionInput';
import OriginInput from '../../components/create_character/OriginInput';
import InputsWrapper from '../../components/InputsWrapper';
import { useContext, useEffect, useState } from "react";
import RunarcanaClassInput from "../../components/create_character/RunarcanaClassInput";
import PastInput from "../../components/create_character/PastInput";
import MoralInput from "../../components/create_character/MoralInput";
import CharacterNameInput from "../../components/create_character/CharacterNameInput";
import CreateCharacterSubmit from "../../types/CreateCharacterSubmit";
import CharacterSubmitContext from "../../contexts/CharacterSubmitContext";
import { CREATE_CHARACTER } from "../../gql/mutations";
import { useRouter } from 'next/router';
import LoadingContext from '../../contexts/LoadingContext';
import LoadingContextType from '../../types/LoadingContextType';
import Container from '../../styles/createCharacterStyles';

export default function CreateCharacter(){
  const [, setLoading]  = useContext(LoadingContext) as LoadingContextType
  const router = useRouter()
  const [mutateFunction, {loading}] = useMutation(CREATE_CHARACTER, {errorPolicy:'all'})
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

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  return(
    <Container>
      <div className="grow-up c-container">
        <h1>Inserindo dados no codex</h1>
        <CharacterSubmitContext.Provider value={[characterSubmit, setCharacterSubmit]}>
          <InputsWrapper currentInput={currentInput}/>
          <span className='prev' onClick={handlePrevious}>anterior</span>
          <span className='next' onClick={handleNext}>próximo</span>
        </CharacterSubmitContext.Provider>
        
      </div>
    </Container>
  )
}
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import CharacterSubmitContext from '../../contexts/CharacterSubmitContext';
import CharacterSubmitContextType from '../../types/CharacterSubmitContextType';
import Input from '../Input';
import { GET_CLASS_BY_ID, GET_ORIGIN_BY_ID, GET_PAST_BY_ID, GET_REGION_BY_ID } from '../../gql/querys';
import GetRegionById from '../../types/GetRegionById';
import GetOriginById from '../../types/GetOriginById';
import GetClassById from '../../types/GetClassById';
import GetPastById from '../../types/GetPastById';

const CharacterNameInput = () => {
  const [characterSubmit, setCharacterSubmit] = useContext(CharacterSubmitContext) as CharacterSubmitContextType
  const {data:region} = useQuery<GetRegionById>(GET_REGION_BY_ID, {
   variables:{
      getRegionByIdId: characterSubmit.regionId
   },
    fetchPolicy: 'no-cache'
  })
  const {data:origin} = useQuery<GetOriginById>(GET_ORIGIN_BY_ID, {
   variables:{
    getOriginByIdId: characterSubmit.originId
   },
    fetchPolicy: 'no-cache'
  })
  const {data:runarcanaClass} = useQuery<GetClassById>(GET_CLASS_BY_ID, {
    variables:{
      getRClassByIdId: characterSubmit.runarcanaClassId
    },
     fetchPolicy: 'no-cache'
   })
  const {data:past} = useQuery<GetPastById>(GET_PAST_BY_ID, {
    variables:{
      getPastByIdId: characterSubmit.pastId
    },
     fetchPolicy: 'no-cache'
   })

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setCharacterSubmit({...characterSubmit, name: target.value})
  }

  return (
    <>
      <h2>Nome</h2>
      <p>Por fim, precisa nomear seu campeão, e então o codex compilará os dados e encontrará ele em alguma realidade de runeterra</p>
      <section className='name-field'>
        <Input onChange={onChange} placeholder='Nome'/>
      </section>
      <section className='details-card'>
        <h2>{characterSubmit.name? characterSubmit.name : '?'}</h2>
        <p>
          <span>
            É um {origin?.getOriginById.name}
          </span>
          <span>
            que veio de {region?.getRegionById.name}
          </span>
          <span>
            {past?.getPastById.name === 'Desconhecido' ? 'seu passado é ' + past.getPastById.name :'no passado era um ' + past?.getPastById.name }
          </span>
          <span>
            suas habilidades o classificam como um {runarcanaClass?.getRClassById.name}
          </span>
          <span>
            {characterSubmit.essence} / {characterSubmit.expression} / {characterSubmit.exaltation}
          </span>
        </p>
      </section>
    </>
  );
};

export default CharacterNameInput;
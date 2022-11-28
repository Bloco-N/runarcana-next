import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import CharacterSubmitContext from '../../contexts/CharacterSubmitContext';
import CharacterSubmitContextType from '../../types/CharacterSubmitContextType';
import Input from '../Input';
import { GET_CLASS_BY_ID, GET_ORIGIN_BY_ID, GET_PAST_BY_ID, GET_REGION_BY_ID } from '../../gql/querys';
import ListAllRegions from '../../types/ListAllRegions';
import ListAllOrigins from '../../types/ListAllOrigins';
import ListAllClasses from '../../types/ListAllClasses';
import ListAllPasts from '../../types/ListAllPasts';

const CharacterNameInput = () => {
  const [characterSubmit, setCharacterSubmit] = useContext(CharacterSubmitContext) as CharacterSubmitContextType
  const { data: region } = useQuery<ListAllRegions>(GET_REGION_BY_ID, {
    variables: {
      "where": {
        "id": {
          "equals": characterSubmit.regionId
        }
      }
    },
    fetchPolicy: 'no-cache'
  })
  const { data: origin } = useQuery<ListAllOrigins>(GET_ORIGIN_BY_ID, {
    variables: {
      "where": {
        "id": {
          "equals": characterSubmit.originId
        }
      }
    },
    fetchPolicy: 'no-cache'
  })
  const { data: runarcanaClass } = useQuery<ListAllClasses>(GET_CLASS_BY_ID, {
    variables: {
      "where": {
        "id": {
          "equals": characterSubmit.runarcanaClassId
        }
      }
    },
    fetchPolicy: 'no-cache'
  })
  const { data: past } = useQuery<ListAllPasts>(GET_PAST_BY_ID, {
    variables: {
      "where": {
        "id": {
          "equals": characterSubmit.runarcanaClassId
        }
      }
    },
    fetchPolicy: 'no-cache'
  })

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setCharacterSubmit({ ...characterSubmit, name: target.value })
  }

  return (
    <>
      <h2>Nome</h2>
      <p>Por fim, precisa nomear seu campeão, e então o codex compilará os dados e encontrará ele em alguma realidade de runeterra</p>
      <section className='name-field'>
        <Input onChange={onChange} placeholder='Nome' />
      </section>
      <section className='details-card'>
        <h2>{characterSubmit.name ? characterSubmit.name : '?'}</h2>
        <p>
          <span>
            É um {origin?.listAllOrigins[0].name}
          </span>
          <span>
            que veio de {region?.listAllRegions[0].name}
          </span>
          <span>
            {past?.listAllPasts[0].name === 'Desconhecido' ? 'seu passado é ' + past.listAllPasts[0].name : 'no passado era um ' + past?.listAllPasts[0].name}
          </span>
          <span>
            suas habilidades o classificam como um {runarcanaClass?.listAllRunarcanaClass[0].name}
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
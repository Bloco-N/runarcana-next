import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_ALL_PASTS } from '../../gql/querys';
import Button from '../Button';
import ListAllPasts from '../../types/ListAllPasts';
import CharacterSubmitContext from '../../contexts/CharacterSubmitContext';
import CharacterSubmitContextType from '../../types/CharacterSubmitContextType';
import LoadingContext from '../../contexts/LoadingContext';
import LoadingContextType from '../../types/LoadingContextType';

const PastInput = () => {
  const [characterSubmit, setCharacterSubmit] = useContext(CharacterSubmitContext) as CharacterSubmitContextType
  const [, setLoading] = useContext(LoadingContext) as LoadingContextType
  const { loading, error, data } = useQuery<ListAllPasts>(LIST_ALL_PASTS, {
    fetchPolicy: 'no-cache'
  })
  const leftHandle = () => {
    const select = document.querySelector('select') as HTMLSelectElement
    if (select.value === '1') {
      select.value = '22'
      setCharacterSubmit({ ...characterSubmit, pastId: Number(select.value) })
      return
    }
    select.value = String(Number(select.value) - 1)
    setCharacterSubmit({ ...characterSubmit, pastId: Number(select.value) })
  }

  const rightHandle = () => {
    const select = document.querySelector('select') as HTMLSelectElement
    if (select.value === '22') {
      select.value = '1'
      setCharacterSubmit({ ...characterSubmit, pastId: Number(select.value) })
      return
    }
    select.value = String(Number(select.value) + 1)
    setCharacterSubmit({ ...characterSubmit, pastId: Number(select.value) })
  }

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  return (
    <>
      <h2>Passado</h2>
      <p>Toda história de um campeão tem seu início. O passado irá definir como ele viveu, porque se tornou um aventureiro e qual seu lugar em runeterra. Seu combatente pode ter sido um corajoso cavaleiro ou um soldado veterano. Seu mercurial talvez tenha participado de uma guilda de ladrões ou entreteve o público como um bufão.</p>
      <section className="c-selection">
        <Button onClick={leftHandle} className="selector-button left">➤</Button>
        <select defaultValue={String(characterSubmit.pastId)} name="" id="">
          {data?.listAllPasts.map(past => (
            <option key={past.id} value={String(past.id)}>{past.name}</option>
          ))}
        </select>
        <Button className='selector-button' onClick={rightHandle}>➤</Button>
        <div className="description pasts">
          <h2>{data?.listAllPasts[Number(characterSubmit.pastId) - 1].name}</h2>
          <div>
            <p>{data?.listAllPasts[Number(characterSubmit.pastId) - 1].description}</p>
            {data?.listAllPasts[Number(characterSubmit.pastId) - 1].languages ? <p>Idioma: {data?.listAllPasts[Number(characterSubmit.pastId) - 1].languages}</p> : ''}
            {data?.listAllPasts[Number(characterSubmit.pastId) - 1].professions ? <p>Ofício: {data?.listAllPasts[Number(characterSubmit.pastId) - 1].professions}</p> : ''}
            {data?.listAllPasts[Number(characterSubmit.pastId) - 1].skills ? <p>Proeficiências: {data?.listAllPasts[Number(characterSubmit.pastId) - 1].skills}</p> : ''}
          </div>
        </div>
      </section>
    </>
  );
};

export default PastInput;
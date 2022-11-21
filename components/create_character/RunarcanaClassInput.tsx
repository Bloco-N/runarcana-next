import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Button from '../Button';
import { LIST_ALL_CLASSES } from '../../gql/querys';
import ListAllClasses from '../../types/ListAllClasses';
import CharacterSubmitContext from '../../contexts/CharacterSubmitContext';
import CharacterSubmitContextType from '../../types/CharacterSubmitContextType';
import LoadingContext from '../../contexts/LoadingContext';
import LoadingContextType from '../../types/LoadingContextType';

const RunarcanaClassInput = () => {
  const [characterSubmit, setCharacterSubmit] = useContext(CharacterSubmitContext) as CharacterSubmitContextType
  const [, setLoading]  = useContext(LoadingContext) as LoadingContextType
  const {loading, error, data} = useQuery<ListAllClasses>(LIST_ALL_CLASSES, {
    fetchPolicy: 'no-cache'
  })
  const leftHandle = () => {
    const select = document.querySelector('select') as HTMLSelectElement
    if(select.value === '1') {
      select.value = '11'
      setCharacterSubmit({...characterSubmit, runarcanaClassId: Number(select.value)})
      return
    }  
    select.value = String(Number(select.value) - 1)
    setCharacterSubmit({...characterSubmit, runarcanaClassId: Number(select.value)})
  }

  const rightHandle = () => {
    const select = document.querySelector('select') as HTMLSelectElement
    if(select.value === '11') {
      select.value = '1'
      setCharacterSubmit({...characterSubmit, runarcanaClassId: Number(select.value)})
      return
    }
    select.value = String(Number(select.value) + 1)
    setCharacterSubmit({...characterSubmit, runarcanaClassId: Number(select.value)})
  }

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  return (
    <>
      <h2>Classe</h2>
      <p>
        No meio de um combate seu campeão precisa de ferramentas para sobressair o adversário. Que tipos de habilidades e conhecimento ele adquiriu em vida para fazer isso. As Classes representam muito do lugar que ele sempre ocupou no mundo de runeterra
      </p>
      <section className="c-selection">
        <Button onClick={leftHandle} className="left">➤</Button>
        <select value={String(characterSubmit.runarcanaClassId)} autoFocus name="region">
          {data?.listAllRClasses.runarcanaClasses.map(runarcanaClass => (
            <option key={runarcanaClass.id} value={String(runarcanaClass.id)}>{runarcanaClass.name}</option>
          ))}
        </select>
        <Button onClick={rightHandle}>➤</Button>
        <div className='class-details'>
          <div className='class-details-top'>
            <p>{data?.listAllRClasses.runarcanaClasses[Number(characterSubmit.runarcanaClassId) - 1].description}</p>
          </div>
          <div>
            <div className='class-details-bottom'>
              <div>
              Salvaguardas: 
              <p>{data?.listAllRClasses.runarcanaClasses[Number(characterSubmit.runarcanaClassId) - 1].savingThrows}</p>
              </div>
              <div>
                Habilidades Primarias:
                <p>{data?.listAllRClasses.runarcanaClasses[Number(characterSubmit.runarcanaClassId) - 1].primaryAbility}</p>
              </div>
            </div>
        </div>
        </div>
      </section>  
    </>
  );
};

export default RunarcanaClassInput;
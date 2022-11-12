import React, { useContext, useState } from 'react';
import CharacterSubmitContext from '../contexts/CharacterSubmitContext';
import CharacterSubmitContextType from '../types/CharacterSubmitContextType';
import Input from './Input';

const MoralInput = () => {
  const [characterSubmit, setCharacterSubmit] = useContext(CharacterSubmitContext) as CharacterSubmitContextType
  const [detail, setDetail] = useState(0)
  const onChangeEssence = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setCharacterSubmit({...characterSubmit, essence: target.value})
  }
  const onChangeExpression = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setCharacterSubmit({...characterSubmit, expression: target.value})
  }
  const onChangeExaltation = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setCharacterSubmit({...characterSubmit, exaltation: target.value})
  }
  const moralInputs = [
    {
      name: 'Essência',
      description: 'Embora esse seja o aspecto mais próximo de “imutável” dentro da moral, essa imutabilidade é quase sempre uma ilusão, com a mesma se modificando com base nos acontecimentos em uma adaptação reativa, com cada aspecto disso sendo revisto e repensando a cada grande acontecimento.'
    },
    {
      name: 'Expressão',
      description: 'A Expressão é o aspecto do meio, embora seja suscetível a mudanças é muito mais constante, ela explica tendências de como um personagem costuma agir e quais são as formas escolhidas por essa ação normalmente.'
    },
    {
      name: 'Exaltação',
      description: 'A exaltação é bastante volátil e está relacionada com cada um dos outros dois aspectos, mas em constante mudança justamente pelas condições que se apresentam e pela forma como a Moral de um indivíduo se desenvolve.'
    }
  ]
  return (
    <>
      <h2>Moral</h2>
      <p>
      O sistema de Moral determina o comportamento dos personagens, como uma proposta inicial que é parte do conceito desse personagem, a explicação geral de como esse personagem manifesta essa proposta e quais são os pontos que fazem essa proposta ser realizada.
      </p>
      <section className="moral">
        <Input onChange={onChangeEssence} onFocus={() => setDetail(0)} placeholder='essência'/>
        <Input onChange={onChangeExpression} onFocus={() => setDetail(1)} placeholder='expressão'/>
        <Input onChange={onChangeExaltation} onFocus={() => setDetail(2)} placeholder='exaltação'/>
      </section>
      <div className="description morals">
        <h2>{moralInputs[detail].name}</h2>
        <p>
          {moralInputs[detail].description}
        </p>
      </div>
    </>
  );
};

export default MoralInput;
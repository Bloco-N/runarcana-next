import { useMutation } from '@apollo/client';
import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import LoadingContext from '../../contexts/LoadingContext';
import { UPDATE_CHARACTER } from '../../gql/mutations';
import LoadingContextType from '../../types/LoadingContextType';
import { Attributes, Character, SkillsValues } from '../../types/UserCharacterDashBoard';
import { modifier } from '../../utils/attributeFunctios';
import Card from '../Card';

type AttributesCardProps = {
  token: string
  id: string
  character: Character
  attributes: Attributes
  setAttributes: Dispatch<SetStateAction<Attributes>>
  setModifiers: Dispatch<SetStateAction<Attributes>>
  modifiers: Attributes
  skillsValues: SkillsValues
}

const AttributesCard = ({ character, modifiers, attributes, skillsValues, setAttributes, setModifiers, id, token }: AttributesCardProps) => {
  const [, setLoading] = useContext(LoadingContext) as LoadingContextType
  const [mutateFunction, { loading }] = useMutation(UPDATE_CHARACTER, { errorPolicy: 'all' })

  const handleCurrentHpChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    if (character && Number(target.value) > (character.classHpBase as number + modifiers.constitution)) {
      target.value = String(character.classHpBase as number + modifiers.constitution)
    }
    mutateFunction({
      variables: {
        "where": {
          "id": Number(id)
        },
        "data": { currentHp: Number(target.value) }
      },
      context: {
        headers: {
          authorization: 'Bearer ' + token
        }
      }
    })
  }

  const handleBonusHpChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    mutateFunction({
      variables: {
        "where": {
          "id": Number(id)
        },
        "data": { bonusHp: Number(target.value) }
      },
      context: {
        headers: {
          authorization: 'Bearer ' + token
        }
      }
    })
  }

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

  useEffect(() => {
    const aux = {} as Attributes
    if (attributes) {
      Object.entries(attributes).map(([key, value]) => {
        aux[key as keyof Attributes] = modifier(value)
      })
      setModifiers({ ...aux })
      mutateFunction({
        variables: {
          "where": {
            "id": Number(id)
          },
          "data": attributes
        },
        context: {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      })
    }
  }, [attributes, mutateFunction, setModifiers, id, token])

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  return (
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
          <div className="attribute-value">{character?.baseSpeed}</div>
          <p>deslocamento</p>
        </div>
        <div>
          <div className="attribute-value">{skillsValues?.perception as number + 10}</div>
          <p>percepção passiva</p>
        </div>
        <div>
          <div className="attribute-value">{skillsValues?.insight as number + 10}</div>
          <p>intuição passiva</p>
        </div>
      </div>
      <div className="life-wrapper">
        <p>pontos de vida</p>
        <div className='wrapper-current' aria-label="vida atual" data-balloon-pos="down">
          <input onChange={e => handleCurrentHpChange(e)} max={character?.classHpBase as number + modifiers.constitution} className="current" name='current-life' defaultValue={character?.currentHp} type='number' />
        </div>
        <div aria-label="vida total" data-balloon-pos="down">
          <div className="life-count">
            {character?.classHpBase as number + modifiers.constitution}
          </div>
        </div>
        <div className='wrapper-extra' aria-label="vida extra" data-balloon-pos="down">
          <input onChange={e => handleBonusHpChange(e)} min={0} max={50} className="extra" name='current-life' defaultValue={character?.bonusHp} type='number' />
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
  );
};

export default AttributesCard;
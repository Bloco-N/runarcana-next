import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import ListAllRegions from '../types/ListAllRegions';
import { LIST_ALL_REGIONS } from '../gql/querys';
import Image from 'next/image';
import Button from './Button';
import demaciaImg from "../public/maps/dark/demacia.svg"
import freljordImg from "../public/maps/dark/freljord.svg"
import ixtalImg from "../public/maps/dark/ixtal.svg"
import shurimaImg from "../public/maps/dark/shurima.svg"
import restImg from "../public/maps/dark/resto.svg"
import noxusImg from "../public/maps/dark/noxus.svg"
import sentinaImg from "../public/maps/dark/sentina.svg"
import targonImg from "../public/maps/dark/targon.svg"
import yoniaImg from "../public/maps/dark/yonia.svg"
import zaumImg from "../public/maps/dark/zaum.svg"
import shadowImg from "../public/maps/dark/sombras.svg"
import demaciaLightImg from "../public/maps/light/demacia.svg"
import freljordLightImg from "../public/maps/light/freljord.svg"
import ixtalLightImg from "../public/maps/light/ixtal.svg"
import shurimaLightImg from "../public/maps/light/shurima.svg"
import restLightImg from "../public/maps/light/resto.svg"
import noxusLightImg from "../public/maps/light/noxus.svg"
import sentinaLightImg from "../public/maps/light/sentina.svg"
import targonLightImg from "../public/maps/light/targon.svg"
import yoniaLightImg from "../public/maps/light/yonia.svg"
import zaumLightImg from "../public/maps/light/zaum.svg"
import shadowLightImg from "../public/maps/light/sombras.svg"
import CharacterSubmitContext from '../contexts/CharacterSubmitContext';
import CharacterSubmitContextType from '../types/CharacterSubmitContextType';
import LoadingContext from '../contexts/LoadingContext';
import LoadingContextType from '../types/LoadingContextType';
import useDarkTheme from '../hooks/useDarkTheme';

const RegionInput = () => {
  const isDark = useDarkTheme()
  const [characterSubmit, setCharacterSubmit] = useContext(CharacterSubmitContext) as CharacterSubmitContextType
  const [, setLoading]  = useContext(LoadingContext) as LoadingContextType
  const {loading, error, data} = useQuery<ListAllRegions>(LIST_ALL_REGIONS, {
    fetchPolicy: 'no-cache'
  })
  const leftHandle = () => {
    const select = document.querySelector('select') as HTMLSelectElement
    if(select.value === '1') {
      select.value = '12'
      setCharacterSubmit({...characterSubmit, regionId: Number(select.value)})
      return
    }
    select.value = String(Number(select.value) - 1)
    setCharacterSubmit({...characterSubmit, regionId: Number(select.value)})
  }

  const rightHandle = () => {
    const select = document.querySelector('select') as HTMLSelectElement
    if(select.value === '12') {
      select.value = '1'
      setCharacterSubmit({...characterSubmit, regionId: Number(select.value)})
      return
    }
    select.value = String(Number(select.value) + 1)
    setCharacterSubmit({...characterSubmit, regionId: Number(select.value)})
  }

  useEffect(() => {
    const selectedImg = document.getElementsByClassName('map-grow')
    if(selectedImg[0]) selectedImg[0].classList.remove('map-grow')
    const img = document.getElementById(String(characterSubmit.regionId) === '12' ? '9' : String(characterSubmit.regionId))
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
  },[characterSubmit])

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  return (
    <>
    <h2>Região</h2>
        <p>
        Nesse momento tente pensar sobre a região da qual seu campeão originou, você tem boa parte de ruenterra para escolher. Será um orgulhoso noxiano ou um equiulibrado yoniano? Talvez uma pequena criatura de Bandópolis. Não se perca nas possibilidades, essa informação pode influenciar muito na construção do seu campeão.
        </p>

        <section className="c-selection">
          <Button onClick={leftHandle} className="left">➤</Button>
          <select value={String(characterSubmit.regionId)} autoFocus name="Região">
            {data?.listAllRegions.regions.map(region => (
              <option key={region.id} value={String(region.id)}>{region.name}</option>
            ))}
          </select>
          <Button onClick={rightHandle}>➤</Button>
        </section>


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
        <h1 className="bandopolis-index none">?</h1>

    </>
  );
};

export default RegionInput;
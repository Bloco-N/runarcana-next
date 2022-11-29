import React, { useEffect } from 'react';
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
import Card from '../Card';
import Image from 'next/image';
import useDarkTheme from '../../hooks/useDarkTheme';
import UserCharacterDashboard, { Character } from '../../types/UserCharacterDashBoard';

type RegionCardProps = {
  data: UserCharacterDashboard
  character: Character
}

const RegionCard = ({ data, character }: RegionCardProps) => {

  useEffect(() => {
    const img = document.getElementById(String(data?.userInfo.Characters[0].Region.id) === '12' ? '9' : String(data?.userInfo.Characters[0].Region.id))
    if (!img) {
      const bandopolis = document.getElementsByClassName('bandopolis-index')
      bandopolis[0].classList.remove('none')
      bandopolis[0].classList.add('block')
    } else {
      const bandopolis = document.getElementsByClassName('bandopolis-index')
      bandopolis[0].classList.remove('block')
      bandopolis[0].classList.add('none')
    }
    img?.classList.add('map-grow')
  }, [data])

  const isDark = useDarkTheme()
  return (
    <Card className='region-card'>
      <div className="map-wrapper">
        <Image className='map' id="1" src={isDark ? sentinaImg : sentinaLightImg} alt='sentina' />
        <Image className='map' id="3" src={isDark ? demaciaImg : demaciaLightImg} alt='demacia' />
        <Image className='map' id="4" src={isDark ? freljordImg : freljordLightImg} alt='freljord' />
        <Image className='map' id="5" src={isDark ? shadowImg : shadowLightImg} alt='sombras' />
        <Image className='map' id="6" src={isDark ? yoniaImg : yoniaLightImg} alt='yonia' />
        <Image className='map' id="7" src={isDark ? ixtalImg : ixtalLightImg} alt='ixtal' />
        <Image className='map' id="8" src={isDark ? noxusImg : noxusLightImg} alt='noxus' />
        <Image className='map' id="9" src={isDark ? zaumImg : zaumLightImg} alt='zaum' />
        <Image className='map' id="10" src={isDark ? shurimaImg : shurimaLightImg} alt='shurima' />
        <Image className='map' id="11" src={isDark ? targonImg : targonLightImg} alt='targon' />
        <Image className='map' src={isDark ? restImg : restLightImg} alt='resto' />
        <h1 className="bandopolis-index">?</h1>
        <span className='region-name'>{character?.Region.name.toLocaleLowerCase()}</span>
      </div>
    </Card>
  );
};

export default RegionCard;
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import yordle from '../public/origins/yordle.png'
import vastaya from '../public/origins/vastaya.png'
import troll from '../public/origins/troll.png'
import minotaurs from '../public/origins/minotauro.png'
import halfDragon from '../public/origins/meio-dragão.png'
import human from '../public/origins/humano.png'
import construct from '../public/origins/construto.png'
import antroplantae from '../public/origins/antroplantae.png'
import runinata from '../public/origins/runinata.png'
import CharacterSubmitContext from '../contexts/CharacterSubmitContext';
import CharacterSubmitContextType from '../types/CharacterSubmitContextType';

const OriginInput = () => {
  const [characterSubmit, setCharacterSubmit] = useContext(CharacterSubmitContext) as CharacterSubmitContextType
  const sources = [
    {
      id:'1',
      name:'Antroplantae',
      src:antroplantae,
      description:'Os Antroplantae são uma origem ligada fortemente à natureza e às plantas, embora se relacionem também com as pedras e a terra. Em Runeterra a vida encontra muitas formas de se manifestar pela magia, não é estranho que formas únicas surjam muitas vezes sem fazer parte de uma origem mais ampla ou de uma espécie estruturada, são membros únicos e tão diferentes como os galhos de uma árvore.'
    },
    {
      id:'2',
      name:'Construto',
      src:construct,
      description:'Os construtos são extremamente raros em Runeterra, em uma terra abastecida de magia e com a existência dos cristais Hextec, fabricados em Piltover (as vezes até mesmo de energia quimtec, uma tecnologia zaunita fabricada dos resíduos da produção hextec), a criação de vida não é um poder exclusivo das divindades, mas sim algo que pode ser feito por pessoas inescrupulosas ou mesmo desesperadas. '
    }, 
    {
      id:'3',
      name:'Humano',
      src:human,
      description:'Os membros de origem humana estão entre os mais mais numerosos de Runeterra, as principais cidades-estados do mundo são repletas deles e normalmente controladas pelos membros dessa espécie. Com uma distribuição majoritária, eles podem ser encontrados em todos os lugares, desde Demacia até Noxus, passando por Freljord, Ionia, Águas de Sentina ou até mesmo em Shurima, que tem se reerguido da areias. Embora eles todos tenham características bem similares, algumas pequenas nuances existem por conta do local de nascimento deles. '
    }, 
    {
      id:'4',
      name:'Meio-Dragão',
      src:halfDragon,
      description: 'Meio-Dragões são seres de uma natureza desconhecida em sua profundidade. Alguns estudiosos teorizam que sejam apenas dragões que optam por permanecer na forma humana através de sua imensa magia, outros tem certeza que são híbridos, mas não há uma conclusão. Alguns cogitam que talvez eles sejam fruto da magia, outros, que talvez a magia que seja um fruto deles, seja lá qual for a realidade, o fato é que a simples visão de um dragão é algo extremamente raro, quanto mais de um Meio-Dragão, algo que apenas os mais dedicados estudiosos do arcano cogitam que possa existir.'
    }, 
    {
      id:'5',
      name:'Minotauro',
      src:minotaurs,
      description:'Os Minotauros em Runeterra estão espalhados especialmente por Valoran, com uma maior concentração nas montanhas da Grande Barreira. Divididos em tribos, a maior parte deles está sob a bandeira do Império de Noxus, mas existem tribos em territórios neutros ou sob outro comando. Ainda assim eles preferem se manter afastados das capitais concentrados em suas tribos, alguns poucos se aventuram nas "cidades grandes".'
    }, 
    {
      id:'6',
      name:'Troll',
      src:troll,
      description:'Trolls são uma espécie humanoide grotesca que habitam as terras de Freljord e Shurima. Trolls do Gelo normalmente possuem uma pele azulada enquanto os de Areia possuem uma pele mais amarelada, próxima à cor da areia mas ambas as descendências compartilham uma cultura tribal. Recentemente, os Trolls do Gelo começaram a se preparar para a guerra, reunindo-se sob a bandeira de Trundle, o Rei Troll. Também existem Trolls da Areia vivendo em Shurima e Ixtal. É desconhecido quantos desses Trolls existem, com sua mera existência sendo considerada um mito nos tempos modernos. '
    }, 
    {
      id:'7',
      name:'Vastaya',
      src:vastaya,
      description:'Os vastaya são criaturas quiméricas de Runeterra cuja linhagem é composta por sangue humano e pela magia espiritual de uma raça pré- humana. Do feroz e brutal poder de Rengar ao charme de raposa de Ahri, os vastaya podem ser consideravelmente distintos entre si, mas todos compartilham características animais e humanas. '
    }, 
    {
      id:'8',
      name: 'Yordle',
      src:yordle,
      description:'Os membros da origem Yordle estão entre as mais mágicas e misteriosas criaturas de Runeterra, criaturas espirituais que assumem uma forma bípede com no máximo 80 centímetros de altura, normalmente mamíferos, também podem se adaptar à vida marítima assumindo traços anfíbios. Sua origem é desconhecida, mas sua presença sabidamente existe por toda Runeterra desde épocas pré-históricas, aparecendo vez ou outra longe de sua cidade natal, Bandópolis. '
    }, 
    {
      id:'9',
      name:'Runinata',
      src:runinata,
      description:'Graças à Magia ou às Runas Globais, coisas inesperadas acontecem, talvez como se a natureza em si estivesse tentando dizer algo, através da criação de novas formas de vida. Entre todas as Origens de Runeterra, os Runinatas são formas de vida que surgem das mais variadas maneiras, às vezes como resultado de uma grande reverberação das energia das Runas Globais, outras por algum conjurador poderoso suficiente para criar vida, ou mesmo através de experimentos com as diversas fontes mágicas de Runeterra. Seria possível até dizer que Runinatas são criaturas criadas pelos caprichos das Runas, no entanto a realidade é um pouco diferente.'
    }
  ]
  const [hovered, setHovered] = useState('1')
  const handleHover = (e:React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement
    setHovered(target.id)
  }

  const handleClick = (e:React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement
    const selected = document.getElementsByClassName('selected')[0] as HTMLElement
    if(selected) selected.classList.remove('selected')
    target.classList.add('selected')
    setCharacterSubmit({...characterSubmit, originId: Number(target.id)})
  }

  return (
    <>
      <h2>Origem</h2>
      <p>Em runeterra existe uma vastidão origens, isso vai definir bastante da aparência e cultura de seu campeão. Se prefere ter penas, peças ou escamas, aqui é um ótimo lugar para começar a decidir.</p>
      <div className="c-origins">

        {sources.map(item => (
          <Image key={Number(item.id)} id={item.id} onMouseEnter={e => handleHover(e)} onClick={handleClick} className='origin' src={item.src} alt={item.name}/>
        ))}

        <Image src={sources[Number(hovered) - 1].src} className='cover' alt='cover' placeholder='blur'/>
        <div className='description'>
          <h2>{sources[Number(hovered) - 1].name}</h2>
          <p>
            {sources[Number(hovered) - 1].description}
          </p>
        </div>
      </div>
    </>
  );
};

export default OriginInput;
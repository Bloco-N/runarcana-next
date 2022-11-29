import styled from "styled-components"

const Container = styled.div`
  display: flex;
  padding-top: 5rem;
  padding-bottom: 15rem;
  flex-direction: column;
  align-items: center;
  h2{
    opacity: 1;
    margin-top: 3rem;
    font-weight: bold;
  }
  p{
    margin-top: 3rem;
    text-align: center;
    width: 70%;
  }
`

export default function About() {
  return (
    <Container>
      <h2>O melhor artefato para entrar no mundo de runeterra</h2>
      <p>
        O mundo de runeterra é uma terra cheia de aventuras e magia. Um lugar que a maioria dos fãs de lol gostariam de estar envolvidos. Para os amantes de rpg de mesa isso passou a ser possível após a criação do livro de rpg <a href="#">runarcana</a> (iniciativa do <a href="#">@arddhu</a>). Com esse livro a criação de personagens e a ambientação de um rpg de mesa no mundo de runeterra passaram a ser muito mais fáceis pra quem gosta de jogar um bom d&d ou semelhantes.</p>
      <p>
        Contudo, pessoas que não estão inseridas na cultura de jogar rpg de mesa podem sentir uma grande dificuldade para entender todos os pormenores na criação de uma ficha de rpg. Não só isso, até mesmo pessoas acostumadas a jogar perdem a paciência ao criar uma ficha de personagem. Lidar com vários pdfs, ter que consultar no livro o que você não lembra, falta de espaço para anotar as coisas que são relevantes durante a campanha... tudo isso gera um esforço que prejudica muito a experiência de jogar rpg de mesa, atrasa a sua campanha e a sua diversão.
      </p>

      <p>
        Eu (<a href="#">@ilwel</a>) e meu amigo <a href="#">@aldebaran</a> passamos justamente por isso. Nós dois e mais alguns amigos queríamos começar uma campanha de rpg de mesa usando o runarcana. Mas na segunda vez que tivemos que consultar o livro pra começar a criar os detalhes dos personagens nossa mente de desenvolvedor já gritava de desespero e a gente falava sobre como era chato ter que ficar perguntando a página que a lista de heranças estava e calculando o valor das perícias e tentando entender em que parte do livro ficavam as coisas que nossos personagens tinham acesso.
      </p>

      <p>
        Não demorou nem outros dez minutos e eu e ele estavamos pensando sobre como estruturar os dados do livro runarcana em um json. E ao longo desses 9 meses de desenvolvimento, eu descobri que a criação da ferramenta que buscavamos naquele dia seria mil vezes mais complexo que isso. Mapear um livro e criar um api que servisse esses dados envolveria muito web scrapping, formatação de dados, estudo de um paradigma que fizesse isso ser viável e etc. Isso sem contar a definição da identidade visual, de layout, e interação do usuário com o produto final. Eu e o aldebaran somos apenas dois desenvolvedores de código, mas a verdade é que a gente se desdobrou em inúmeras facetas pra fazer essa ferramenta existir.
      </p>

      <h2>O Códice</h2>

      <p>
        Na realidade eu não quero que você fique pensando nos detalhes técnicos que a existencia dessa ferramenta exigiram. Você provavelmente não é um desenvolvedor e isso não ia te acressentar em nada. Quero que você pense que se estivéssemos no mundo de runeterra, esse site da internet seria um artefato mágico que concede ao portador a possibilidade de viver memórias de heróis em qualquer realidade de runeterra. O que levaria gerações de estudo em mágia e muito poder acumulado se torna uma simples consulta quando você tem esse artefato em mãos.
      </p>

      <p>
        E agora você tem ele, e pode experimentar tudo o que é possível com ele. Eu sempre acreditei que programadores são os magos do mundo real e que códigos são as magias que eles utilizam para mudar a realidade. Então nesse momento, eu e aldebaran estamos disponibilizando nosso maior artefato mágico pra você utilizar. Aproveite e faça do <b>Códice[runarcana]</b> uma oportunidade de se divertir com seus amigos no mundo de runeterra.
      </p>

      <p>
        De todo coração, a equipe do runarcana.
      </p>
    </Container>
  )
}
import styled from "styled-components"

const Container = styled.div`
  width: 1450px;
  padding: 4rem;
  height: 1200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(8, 11rem);
  gap: 1rem;
  .region-card{
    grid-row-start: 5;
    grid-row-end: 7;
    grid-column-start: 4;
    grid-column-end: 5;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    .map-wrapper{
      height: 100%;
      width: 100%;
      position: absolute;
      right: -5%;
      top: 4rem;
      .map{
        width: 100%;
        height: auto;
        position: absolute;
        opacity: 0.2;
        transition: 0.5s;
        z-index: -1;
        top: -8%;
      }
      .bandopolis-index{
        font-size: 6rem;
        position: absolute;
        top: 20%;
        right: 50%;
      }
      .region-name{
        position: relative;
        padding: 1rem;
        border-radius: 1rem;
        top: 60%;
        display: inline;
      }
    }
  }
  .infos-card{
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .attributes-card{
    grid-row-start: 2;
    grid-row-end: 6;
    grid-column-start: 2;
    grid-column-end: 4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    .attributes-wrapper{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 1rem;
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 2;
      grid-column-end: 4;
      div{
        label{
          position: relative;
          top: -3rem;
        }
        .attribute-value{
          all: unset;
          appearance: none;
          -moz-appearance: textfield;
          font-family: 'Underdog', cursive;
          height: 6rem;
          width: 6rem;
          text-align: center;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          background-color: rgba(205, 214, 244, 0.25);
          backdrop-filter: blur(0.2rem);
          font-size: 3rem;
          ::-webkit-inner-spin-button{
            -webkit-appearance: none;
            margin: 0;
          }
        }
        .modifier{
          font-family: 'Underdog', cursive;
          height: 4rem;
          width: 4rem;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          background-color: rgba(205, 214, 244, 0.25);
          backdrop-filter: blur(0.2rem);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          top: -3rem;
          left: 7rem;
        }
      }
    }
    .passive-wrapper{
      display: grid;
      grid-template-columns: repeat(2   , 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 2rem;
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start: 1;
      grid-column-end: 3;
      div{
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.4rem;
        .attribute-value{
            font-family: 'Underdog', cursive;
            min-height: 5rem;
            min-width: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
            background-color: rgba(205, 214, 244, 0.25);
            backdrop-filter: blur(0.2rem);
        }
      }
    }
    .life-wrapper{
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 2;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 4.5rem;
      padding-right: 3rem;
      gap: 1rem;
      .life-count{
        font-family: 'Underdog', cursive;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        background-color: rgba(205, 214, 244, 0.25);
        backdrop-filter: blur(0.2rem);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 8rem;
        width: 8rem;
      }
      .wrapper-extra{
        height: 6rem;
        width: 6rem;
        position: relative;
        top: 5rem;
        right: 4rem;
      }
      .wrapper-current{
        height: 6rem;
        width: 6rem;
        position: relative;
        top: 5rem;
        left: 4rem;
      }
      .extra{
        all: unset;
        font-family: 'Underdog', cursive;
        appearance: none;
        -moz-appearance: textfield;
        text-align: center;
        height: 6rem;
        width: 6rem;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        background-color: rgba(205, 214, 244, 0.25);
        backdrop-filter: blur(0.2rem);
        ::-webkit-inner-spin-button{
          -webkit-appearance: none;
          margin: 0;
        }
      }
      .current{
        all: unset;
        font-family: 'Underdog', cursive;
        appearance: none;
        -moz-appearance: textfield;
        text-align: center;
        height: 6rem;
        width: 6rem;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        background-color: rgba(205, 214, 244, 0.25);
        backdrop-filter: blur(0.2rem);
        ::-webkit-inner-spin-button{
          -webkit-appearance: none;
          margin: 0;
        }
      }
      p{
        position: absolute;      
        top: 6rem;
      }
    }
    .ca-wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      grid-row-start: 2;
      grid-row-end: 4;
      padding-left: 3rem;
      .ca{
        font-size: 4rem;
        font-family: 'Underdog', cursive;
        min-height: 8rem;
        min-width: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        background-color: rgba(205, 214, 244, 0.25) ;
        backdrop-filter: blur(0.2rem);
      }
      .wrapper-bonus{
        position: relative;
        top: 3rem;
        right: 3rem;
        .shield-bonus{
          all: unset;
          appearance: none;
          -moz-appearance: textfield;
          font-family: 'Underdog', cursive;
          height: 4rem;
          width: 4rem;
          text-align: center;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          background-color: rgba(205, 214, 244, 0.25);
          backdrop-filter: blur(0.2rem);
          ::-webkit-inner-spin-button{
            -webkit-appearance: none;
            margin: 0;
          }
        }
      }
      p{
        position: relative;
        top: -3.5rem;
      }
    }
  }
  .skills-card{
    grid-row-start: 2;
    grid-row-end: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    .skills-wrapper{
      width: 100%;
      font-size:1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
      >div{
        width: 98%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: solid 0.1rem var(--secondary);
        padding: 1rem;
        border-radius: 1rem;
        font-weight: bold;
        .skill-value{
          font-family: 'Underdog', cursive;
        }
        >div{
          width: 2rem;
        }
        >section{
          width: 70%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .savingthrow-card{
    grid-row-start: 6;
    grid-row-end: 7;
    grid-column-start: 2;
    grid-column-end: 4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    >div{
      display: flex;
      p{
        position: relative;
        top:-1rem;
        left: -2rem;
      }
      .switch{
        position: relative;
        top: 4rem;
        left: 7rem;
        margin-left: -5rem;
        z-index: 2;
        div{
          height: 3rem;
          width: 3rem;
        }
      }
      .attribute-value{
              font-family: 'Underdog', cursive;
              height: 6rem;
              width: 6rem;
              display: flex;
              align-items: center;
              justify-content: center;
              clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
              background-color: rgba(205, 214, 244, 0.25);
              backdrop-filter: blur(0.2rem);
              font-size: 3rem;
          }
    }
  }
  .money-card{
    display: flex;
    align-items: center;
    gap: 1rem;
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      .attribute-value{
        all: unset;
        appearance: none;
        -moz-appearance: textfield;
        font-family: 'Underdog', cursive;
        height: 4rem;
        width: 4rem;
        text-align: center;
        clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        background-color: rgba(205, 214, 244, 0.25);
        backdrop-filter: blur(0.2rem);
        ::-webkit-inner-spin-button{
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
  .proficiency-card{
    grid-row-start: 2;
    grid-row-end: 4;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 4rem;
    p{
      position: absolute;
      top: 2rem;
    }
    .proficiency{
        font-size: 4rem;
        font-family: 'Underdog', cursive;
        height: 8rem;
        width: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        background-color: rgba(205, 214, 244, 0.25);
        backdrop-filter: blur(0.2rem);
    }
    input{
        all: unset;
        appearance: none;
        -moz-appearance: textfield;
        font-family: 'Underdog', cursive;
        height: 8rem;
        width: 8rem;
        text-align: center;
        clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        background-color: rgba(205, 214, 244, 0.25);
        backdrop-filter: blur(0.2rem);
        font-size: 4rem;
        ::-webkit-inner-spin-button{
            -webkit-appearance: none;
            margin: 0;
        }
    }
  }
  .characteristics-card{
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 7;
    grid-row-end: 10;
    display: flex;
    gap: 4rem;
    padding-top: 7rem;
    .title{
      position: absolute;
      top: 1rem;
      left: 35%;
    }
    .menu-wrapper{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 30rem;
      overflow-y: scroll;
      scroll-behavior: initial;
      padding: 1rem;
    }
    .content-wrapper{
      padding: 2rem;
      background-color: var(--secondary);
      color: var(--primary);
      border-radius: 1rem;
      width: 50%;
      ul{
        margin-top: 1rem;
        height: 24rem;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        text-transform: lowercase;
        list-style: none;
        border-radius: 1rem;
        ::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 1rem;
          border: 1rem solid transparent;
        }
        li{
          font-size: 1.5rem;
          background-color: var(--primary);
          color: var(--secondary);
          padding: 1rem;
          border-radius: 1rem;
        }
      }
    }
  }

`
export default Container
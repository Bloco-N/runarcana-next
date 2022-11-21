import styled from "styled-components";

const Container = styled.div`
  height: 80%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  .c-container{
    height: 55rem;
    width: 80%;
    .c-selection{
      height: 30rem;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3rem;
    }
    .moral{
      width: 50%;
      margin-top: 8rem;
      display:flex;
      align-items: center ;
      flex-direction: column;
      gap: 1rem;
      input{
        text-align: center;
      }
    }
    .c-origins{
      display: grid;
      align-items: center;
      justify-content: center;
      width: 50%;
      padding: 2rem;
      grid-template-columns: repeat(3, 8rem);
      grid-template-rows: repeat(3, 8rem);
      gap: 2rem;
      height: 1rem;
    }
    button{
      border-radius: 50%;
      height: 1rem;
      width: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &.left{
        transform: rotate(180deg);
      }
    }
    select{
      all: unset;
      width: 32%;
      text-align: center;
      font-size: 1.7rem;
      padding: 1rem;
      border: 0.1rem solid var(--secondary);
      border-radius: 1rem;
      option{
        appearance: none;
        display: none;
      }
    }
    .map{
      width: 50rem;
      height: auto;
      position: absolute;
      top: 25%;
      left: 55%;
      opacity: 0.5;
      transition: 0.5s;
      z-index: -1;
    }
    .bandopolis-index{
      font-size: 20rem;
      position: absolute;
      right: 20%;
      top: 30%;
    }
    .origin{
      height: 8rem;
      width: auto;
      border-radius: 2rem;
      cursor: pointer;
      opacity: 0.3;
      transition: 0.5s;
      :hover{
        opacity: 1;
        transform: scale(1.1);
      }
    }
    .selected{
      opacity: 1;
    }
    .description{
      height: 50rem;
      position: absolute;
      top: 18%;
      right: 15%;
      color: var(--secondary);
      width: 35rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      div{
        margin: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: scroll;
        p{
          text-align: left;
        }
      }
      &.pasts{
        right: 10%;
        top: 5%;
      }
      &.morals{
        top: 30%;
        height: 10rem;
      }
      h2{
        opacity: 1;
      }
      p{
        opacity: 1;
        width: 90%;
        text-align: justify;
        background-color: var(--primary);
        padding: 2rem;
        border-radius: 1rem;
      }
    }
    .cover{
      position: absolute;
      border-radius: 1rem;
      opacity: 1;
      height: 25rem;
      width: 25rem;
      top: 6%;
      right: 2%;
    }
    .class-details{
      position: absolute;

      top:20%;
      right: 15%;
      padding: 2rem;
      width: 30rem;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rem;
      .class-details-top{
        width: 30rem;
        position: relative;
        top:1rem;
        background-color: var(--primary);
        padding: 2rem;
        border-radius: 1rem;
      }
      .class-details-bottom{
        width: 30rem;
        background-color: var(--primary);
        padding: 2rem;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        p{
          margin-left: 2rem;
        }
      }
      p{
        opacity: 1;
        width: 100%;
      }
    }

    h1{
      margin-bottom: 1rem;
    }
    h2{
      margin-bottom: 0.5rem;
    }
    p{
      font-size: 1.6rem;
      opacity: 0.6;
      width: 50%;
    }
  }
  .name-field{
    padding-top: 5rem;
  }
  .details-card{
    position: absolute;
    width: 50rem;
    top: 30%;
    left: 60%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    p{
      width: 80%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
  span{
    user-select: none;
  }
  span.next{
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0.5;
    transition: 0.5s;
    :hover{
      opacity: 1;
    }
  }
  span.prev{
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0.5;
    transition: 0.5s;
    :hover{
      opacity: 1;
    }
  }

`

export default Container
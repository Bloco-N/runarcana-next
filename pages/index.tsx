import { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "../components/Button"
import Card from "../components/Card"
import useUser from "../hooks/useUser"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10rem;

  h1{
    margin-bottom: 5rem;
  }
  .c-characters{
    display: flex;
    gap: 2rem;
    margin-top: 4rem;
    div{
      height: 20rem;
      width: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  button{
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default function Home() {
  const user = useUser()

  if(user){
      return (
        <Container>
          <h1>Bem Vindo {user.username} ({user.nickname})</h1>

          <h2>Personagens</h2>
          <div className='c-characters'>
            <Card>
              <Button>+</Button>
            </Card>
          </div>


        </Container>
      )
  }

  
}

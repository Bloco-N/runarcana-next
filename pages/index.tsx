import { useEffect, useState } from "react"
import styled from "styled-components"
import useUser from "../hooks/useUser"
import User from "../types/User"

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export default function Home() {
  const user = useUser()

  if(user){
      return (
        <Container>
          <h1>Bem Vindo {user.username} ({user.nickname})</h1>
        </Container>
      )
  }

  
}

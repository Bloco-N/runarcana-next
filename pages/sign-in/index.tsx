import Link from "next/link"
import styled from "styled-components"
import Button from "../../components/Button"
import Card from "../../components/Card"
import Input from "../../components/Input"

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h2{
    text-align: center;
  }
  form{
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    button{
      width: 50%;
      text-align: center;
    }
  }
`

export default function SignIn() {
  return (
    <Container>
      <Card>
        <h2>Codex</h2>
        <form >
          <Input placeholder="Invocador" />
          <Input placeholder="Senha" type="password" />
          <Button>Entrar</Button>
          <p>Ainda não possui um id? Crie o seu <Link href='/sign-up'>aqui</Link></p>
        </form>
      </Card>
    </Container>
  )
}
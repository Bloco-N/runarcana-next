import Link from "next/link";
import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";

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

export default function SignUp() {
  return (
    <Container>
      <Card>
        <h2>Crie seu codex id</h2>
        <form >
          <Input placeholder="Invocador" />
          <Input placeholder="Apelido" />
          <Input placeholder="Senha" type="password" />
          <Button>Cadastro</Button>
          <p>Já possui um id? Acesse o codex <Link href='/sign-in'>aqui</Link></p>  
        </form>
      </Card>
    </Container>
  )
}
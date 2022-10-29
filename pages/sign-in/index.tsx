import Link from "next/link"
import styled from "styled-components"
import Button from "../../components/Button"
import Card from "../../components/Card"
import Input from "../../components/Input"
import { useForm } from "react-hook-form";
import SignInSubmit from "../../types/SignInSubmit"

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
  const { register, handleSubmit} = useForm<SignInSubmit>()
  const onSubmit = (data:SignInSubmit) => {
    console.log(data)
  }

  return (
    <Container>
      <Card>
        <h2>Codex</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('username', {required:true})} placeholder="Invocador" />
          <Input {...register('password', {required:true})} placeholder="Senha" type="password" />
          <Button>Entrar</Button>
          <p>Ainda não possui um codex?  <Link href='/sign-up'>Crie o seu aqui</Link></p>
        </form>
      </Card>
    </Container>
  )
}
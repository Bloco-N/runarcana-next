import Link from "next/link";
import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import SignUpSubmit from "../../types/SignUpSubmit";
import { useMutation } from '@apollo/client';
import { SIGN_UP } from "../../gql/mutations";
import { useEffect } from "react";
import ErrorModal from "../../components/ErrorModal";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";

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
  const router = useRouter()
  const { register, handleSubmit } = useForm<SignUpSubmit>()
  const [mutateFunction, { data, loading, error }] = useMutation(SIGN_UP, {errorPolicy:'all'})
  const onSubmit = (data:SignUpSubmit) => { mutateFunction({variables:{data}})}

  useEffect(() => {
    if(data){
      router.push('/sign-in')
    }
  }, [data, router])

  return (
    <Container>
      { error ? <ErrorModal message={error.message}/> : ''}
      { loading ? <Loading/> : ''}
      <Card>
        <h2>Crie seu codex</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('username', {required: true})} placeholder="Invocador" />
          <Input {...register('nickname', {required: true})} placeholder="Apelido" />
          <Input {...register('password', {required: true})} placeholder="Senha" type="password" />
          <Button>Cadastro</Button>
          <p>Já possui um codex?  <Link href='/sign-in'>Acesse o codex aqui</Link></p>  
        </form>
      </Card>
    </Container>
  )
}
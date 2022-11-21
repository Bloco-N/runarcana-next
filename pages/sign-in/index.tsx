import Link from "next/link"
import styled from "styled-components"
import Button from "../../components/Button"
import Card from "../../components/Card"
import Input from "../../components/Input"
import { useForm } from "react-hook-form";
import SignInSubmit from "../../types/SignInSubmit"
import SignInResponse from "../../types/SignInResponse"
import { SIGN_IN } from "../../gql/mutations"
import { useMutation } from "@apollo/client"
import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import ErrorModal from "../../components/ErrorModal"
import Loading from "../../components/Loading"
import LoadingContext from "../../contexts/LoadingContext"
import LoadingContextType from "../../types/LoadingContextType"

const Container = styled.div`
  height: 80%;
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
  const router = useRouter()
  const { register, handleSubmit} = useForm<SignInSubmit>()
  const [, setLoading]  = useContext(LoadingContext) as LoadingContextType
  const [mutateFunction, { data, loading, error }] = useMutation<SignInResponse>(SIGN_IN, {errorPolicy:'all'})
  const onSubmit = (data:SignInSubmit) => { mutateFunction({variables:{data}})}

  useEffect(() => {
    if(data){
      const { signIn:{token, user}} = data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/')
    }
  }, [data, router])

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  return (
    <Container>
      { error ? <ErrorModal message={error.message}/> : ''}
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
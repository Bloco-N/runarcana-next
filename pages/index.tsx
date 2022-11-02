import { useQuery } from '@apollo/client';
import { userInfo } from 'os';
import { useEffect, useState } from 'react';
import styled from "styled-components"
import Button from "../components/Button"
import Card from "../components/Card"
import ErrorModal from '../components/ErrorModal';
import Loading from '../components/Loading';
import { USER_CHARACTERS_HOME } from '../gql/querys';
import useUser from "../hooks/useUser"
import User from '../types/User';
import UserInfoHome from '../types/UserInfoHome';
import client from '../utils/apolloClient';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10rem;

  h1{
    font-size: 10rem;
    margin-bottom: 2rem;
  }
  h2{
    opacity: 0.7;
    font-weight: 100;
    font-size: 2.5rem;
  }
  .c-characters{
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 4rem;
    div{
      height: 20rem;
      width: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    button{
      margin-left: 4rem;
      border-radius: 50%;
      height: 2rem;
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export default function Home() {
  const user = useUser()
  const token = localStorage.getItem('token')
  const {loading, error, data} = useQuery<UserInfoHome>(USER_CHARACTERS_HOME, {
    context:{
      headers:{
        Authorization: "Bearer " + token
      }
    },
    fetchPolicy: "no-cache" 
  })

  if(user){
      return (
        <Container>
          {loading ? <Loading/> : ''}
          <h1>Bem vindo Invocador</h1>
          <h2>Personagens</h2>
            <div className='c-characters'>
              {data ? data.userInfo.characters.map(item => (
                <Card className='grow-up' key={item.id}>
                  <span>{item.name}</span>
                </Card>
              )) : ''}
              <Button>+</Button>
          </div>


        </Container>
      )
  }

  
}

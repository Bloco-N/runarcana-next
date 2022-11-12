import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from "styled-components"
import Button from "../components/Button"
import Card from "../components/Card"
import { USER_CHARACTERS_HOME } from '../gql/querys';
import useUser from "../hooks/useUser"
import UserInfoHome from '../types/UserInfoHome';
import excludeIcon from '../public/exclude-icon.svg';
import excludeLightIcon from '../public/exclude-icon-light.svg';
import useDarkTheme from '../hooks/useDarkTheme';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import LoadingContext from '../contexts/LoadingContext';
import LoadingContextType from '../types/LoadingContextType';
import ConfirmExcludeCharacterModal from '../components/ConfirmExcludeCharacterModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 100%;
  padding-left: 10rem;

  h1{
    font-size:  5rem;
    margin-bottom: 2rem;
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
      .exclude-icon{
        position: absolute;
        top: 1rem;
        right: 1rem;
        opacity: 0.5;
        transition: 0.5s;
        :hover{
          opacity: 1;
        }
      }
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
  const isDark = useDarkTheme()
  const router = useRouter()
  const user = useUser()
  const [modalOpen, setModalOpen] = useState(false)
  const [characterId, setCharacterId] = useState(1)
  const token = localStorage.getItem('token')
  const [, setLoading]  = useContext(LoadingContext) as LoadingContextType
  const {loading, data} = useQuery<UserInfoHome>(USER_CHARACTERS_HOME, {
    context:{
      headers:{
        Authorization: "Bearer " + token
      }
    },
    fetchPolicy: "no-cache" 
  })

  const handleCreateCharacter = () => {
    router.push('create-character')
  }

  const handleExlude = (e:React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    setCharacterId(Number(target.id))
    setModalOpen(true)
  }

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  if(user){
      return (
        <Container>
          <main>

          {modalOpen ? <ConfirmExcludeCharacterModal characterId={characterId} setIsOpen={setModalOpen}/> : ''}
          <h1>Bem vindo Invocador</h1>
          <h2>Personagens</h2>
            <div className='c-characters'>
              {data ? data.userInfo.characters.map(item => (
                <Card className='grow-up' key={item.id}>
                  <Image onClick={handleExlude} id={String(item.id)} className='exclude-icon' src={isDark ? excludeIcon : excludeLightIcon} alt="exclude icon" />
                  <span>{item.name}</span>
                </Card>
              )) : ''}
              <Button onClick={handleCreateCharacter}>+</Button>
          </div>
          </main>


        </Container>
      )
  }

  
}

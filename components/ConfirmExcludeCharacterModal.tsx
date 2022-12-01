import { useMutation } from "@apollo/client"
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { DELETE_CHARACTER } from "../gql/mutations";
import useDarkTheme from "../hooks/useDarkTheme";
import Button from './Button';
import Card from './Card';

type ConfirmModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  characterId: number
}

type ContainerProps = {
  isDark: boolean
}

const Container = styled.div<ContainerProps>`
  background-color: ${props => props.isDark ? '#000000b5' : '#a3a3a3b5'} ;
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-top: -5.7%;
  .content{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .buttons{
      display: flex;
      gap: 2rem;
      align-items: center;
      justify-content: center;
    }
  }
`

const ConfirmExcludeCharacterModal = (props: ConfirmModalProps) => {
  const isDark = useDarkTheme()
  const router = useRouter()
  const [mutateFunction] = useMutation(DELETE_CHARACTER, { errorPolicy: 'all' })
  const handleDelete = () => {
    const token = localStorage.getItem('token')
    mutateFunction({
      variables: {
        "where": {
          "id": props.characterId
        }
      },
      context: {
        headers: {
          authorization: 'Bearer ' + token
        }
      }
    })
    router.reload()
  }
  return (
    <Container isDark={isDark}>
      <Card className='content'>
        <h2>Deseja realmente excluir esse personagem do codex?</h2>
        <div className="buttons">
          <Button onClick={handleDelete}>Sim</Button>
          <Button onClick={() => props.setIsOpen(false)}>Não</Button>
        </div>
      </Card>
    </Container>
  );
};

export default ConfirmExcludeCharacterModal;
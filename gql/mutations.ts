import { gql } from '@apollo/client'

const SIGN_UP = gql`
  mutation Mutation($data: SignUpInputData!) {
    signUp(data: $data) {
      message
    }
  }
`

const SIGN_IN = gql`
  mutation Mutation($data: SignInInputData!) {
    signIn(data: $data) {
      token
      user {
        id
        username
        nickname
      }
    }
  }
`

const CREATE_CHARACTER = gql`
  mutation Mutation($data: CharacterCreateInputData!) {
    createCharacter(data: $data) {
      message
    }
  }
`

const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($deleteCharacterId: Float!) {
  deleteCharacter(id: $deleteCharacterId) {
    message
  }
}
`

export {
  SIGN_UP,
  SIGN_IN,
  CREATE_CHARACTER,
  DELETE_CHARACTER
}
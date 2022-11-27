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

const UPDATE_CHARACTER_PROFICIENCY = gql`
  mutation UpdateCharacterProficiency($data: CharacterUpdateProficiencyInputData!) {
    updateCharacterProficiency(data: $data) {
      message
    }
  }
`
const UPDATE_CHARACTER_ATTRIBUTES = gql`
  mutation UpdateCharacterAttributes($data: CharacterUpdateAttributesInputData!) {
  updateCharacterAttributes(data: $data) {
    message
  }
}
`

const UPDATE_CHARACTER_HP = gql`
  mutation UpdateCurrentHp($data: CharacterUpdateHpInputData!) {
    updateCurrentHp(data: $data) {
      message
    }
  }
`

export {
  SIGN_UP,
  SIGN_IN,
  CREATE_CHARACTER,
  DELETE_CHARACTER,
  UPDATE_CHARACTER_PROFICIENCY,
  UPDATE_CHARACTER_ATTRIBUTES,
  UPDATE_CHARACTER_HP
}
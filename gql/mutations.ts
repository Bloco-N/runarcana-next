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

export {
  SIGN_UP,
  SIGN_IN
}
import { gql } from '@apollo/client'

const USER_CHARACTERS_HOME = gql`
  query UserInfo {
    userInfo {
      characters {
        id
        name
      }
    }
  }
`

export {
  USER_CHARACTERS_HOME
}
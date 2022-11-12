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

const LIST_ALL_REGIONS = gql`
  query Query {
    listAllRegions {
      regions {
        name
        id
      }
    }
  }
`

const LIST_ALL_CLASSES = gql`
  query RunarcanaClasses {
    listAllRClasses {
      runarcanaClasses {
        name
        id
        description
        primaryAbility
        savingThrows
      }
    }
  }
`

const LIST_ALL_PASTS = gql`
  query Pasts {
    listAllPasts {
      pasts {
        id
        name
        description
        skills
        professions
        languages
      }
    }
  }
`

const GET_REGION_BY_ID = gql`
  query GetRegionById($getRegionByIdId: Float!) {
    getRegionById(id: $getRegionByIdId) {
      name
    }
  }
`

const GET_ORIGIN_BY_ID = gql`
  query GetOriginById($getOriginByIdId: Float!) {
    getOriginById(id: $getOriginByIdId) {
      name
    }
  }
`

const GET_CLASS_BY_ID = gql`
  query GetRClassById($getRClassByIdId: Float!) {
    getRClassById(id: $getRClassByIdId) {
      name
    }
  }
`
const GET_PAST_BY_ID = gql`
  query GetPastById($getPastByIdId: Float!) {
    getPastById(id: $getPastByIdId) {
      name
    }
  }
`

export {
  USER_CHARACTERS_HOME,
  LIST_ALL_REGIONS,
  LIST_ALL_CLASSES,
  LIST_ALL_PASTS,
  GET_REGION_BY_ID,
  GET_ORIGIN_BY_ID,
  GET_CLASS_BY_ID,
  GET_PAST_BY_ID
}
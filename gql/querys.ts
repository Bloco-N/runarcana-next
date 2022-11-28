import { gql } from '@apollo/client'

const USER_CHARACTERS_HOME = gql`
query Query {
  userInfo {
    Characters {
      id
      name
    }
  }
}
`
const USER_CHARACTER_DASHBOARD = gql`
  query Query($where: CharacterWhereInput) {
    userInfo {
      Characters(where: $where) {
        wisdomSavingThrow
        wisdom
        userId
        tecnology
        survival
        strengthSavingThrow
        strength
        stealth
        sleightOfHand
        religion
        regionId
        persuasion
        proficiencyBonus
        performance
        perception
        originId
        pastId
        nature
        name
        medicine
        lineageId
        level
        investigation
        intimidation
        intelligenceSavingThrow
        intelligence
        insight
        id
        history
        expression
        exaltation
        essence
        dexteritySavingThrow
        dexterity
        deception
        currentHp
        constitutionSavingThrow
        constitution
        classHpBase
        charismaSavingThrow
        charisma
        bonusHp
        athletics
        arcana
        animalHandling
        acrobatics
        Region {
          name
        }
        Past {
          name
        }
        Origin {
          name
        }
        Lineage {
          name
        }
        Characteristics {
          name
          info
        }
      }
    }
  }
  `

const LIST_ALL_REGIONS = gql`
  query Query {
    listAllRegions {
      name
      id
    }
  }
`

const LIST_ALL_CLASSES = gql`
query Query {
  listAllRunarcanaClass {
    name
    savingThrows
    primaryAbility
    description
    id
  }
}
`

const LIST_ALL_PASTS = gql`
  query Pasts {
    listAllPasts {
      id
      name
      description
      skills
      professions
      languages
    }
  }
`

const GET_REGION_BY_ID = gql`
  query Query($where: RegionWhereInput) {
    listAllRegions(where: $where) {
      name
    }
  }
`

const GET_ORIGIN_BY_ID = gql`
  query Query($where: OriginWhereInput) {
    listAllOrigins(where: $where) {
      name
    }
  }
`

const GET_CLASS_BY_ID = gql`
  query Query($where: RunarcanaClassWhereInput) {
    listAllRunarcanaClass(where: $where) {
      name
    }
  }
`
const GET_PAST_BY_ID = gql`
  query Query($where: PastWhereInput) {
    listAllPasts(where: $where) {
      name
    }
  }
`

export {
  USER_CHARACTERS_HOME,
  USER_CHARACTER_DASHBOARD,
  LIST_ALL_REGIONS,
  LIST_ALL_CLASSES,
  LIST_ALL_PASTS,
  GET_REGION_BY_ID,
  GET_ORIGIN_BY_ID,
  GET_CLASS_BY_ID,
  GET_PAST_BY_ID,
}
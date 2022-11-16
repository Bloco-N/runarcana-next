type RunarcanaClass = {
  RunarcanaClass: {
    name:string 
  }
}

export const SkillsAttributesMap = {
  acrobatics: 'dexterity',
  arcana: 'intelligence',
  athletics: 'strength',
  performance: 'charisma',
  deception: 'charisma', 
  stealth: 'dexterity',
  history: 'intelligence',
  intimidation: 'charisma',
  insight: 'wisdom',
  investigation: 'intelligence',
  animalHandling: 'wisdom',
  medicine: 'wisdom',
  nature: 'intelligence',
  perception: 'wisdom',
  persuasion: 'charisma',
  sleightOfHand: 'dexterity',
  religion: 'intelligence',
  survival: 'wisdom',
  tecnology: 'intelligence',
  strengthSavingThrow: 'strength',
  dexteritySavingThrow: 'dexterity',
  constitutionSavingThrow: 'constitution',
  intelligenceSavingThrow: 'intelligence',
  wisdomSavingThrow: 'wisdom',
  charismaSavingThrow: 'charisma',
}

export type SkillsValues = {
  acrobatics: number
  arcana: number
  athletics: number
  performance: number
  deception: number
  stealth: number
  history: number
  intimidation: number
  insight: number
  investigation: number
  animalHandling: number
  medicine: number
  nature: number
  perception: number
  persuasion: number
  sleightOfHand: number
  religion: number
  survival: number
  tecnology: number
  strengthSavingThrow: number
  dexteritySavingThrow: number
  constitutionSavingThrow: number
  intelligenceSavingThrow: number
  wisdomSavingThrow: number
  charismaSavingThrow: number
}

export type Skills = {
  acrobatics: string
  arcana: string
  athletics: string
  performance: string
  deception: string
  stealth: string
  history: string
  intimidation: string
  insight: string
  investigation: string
  animalHandling: string
  medicine: string
  nature: string
  perception: string
  persuasion: string
  sleightOfHand: string
  religion: string
  survival: string
  tecnology: string
  strengthSavingThrow: string
  dexteritySavingThrow: string
  constitutionSavingThrow: string
  intelligenceSavingThrow: string
  wisdomSavingThrow: string
  charismaSavingThrow: string
}

export type Attributes = {
  strength: number
  dexterity:number
  constitution: number
  intelligence:number
  wisdom:number
  charisma:number
}

export type Character = {
  name: string
  Origin:{
    name:string
  }
  Past:{
    name: string
  }
  Region:{
    id:number
    name:string
  }
  proficiencyBonus: number
  strength: number
  dexterity:number
  constitution: number
  intelligence:number
  wisdom:number
  charisma:number
  acrobatics: string
  arcana: string
  athletics: string
  performance: string
  deception: string
  stealth: string
  history: string
  intimidation: string
  insight: string
  investigation: string
  animalHandling: string
  medicine: string
  nature: string
  perception: string
  persuasion: string
  sleightOfHand: string
  religion: string
  survival: string
  tecnology: string
  strengthSavingThrow: string
  dexteritySavingThrow: string
  constitutionSavingThrow: string
  intelligenceSavingThrow: string
  wisdomSavingThrow: string
  charismaSavingThrow: string
  CharacterRunarcanaClass : RunarcanaClass []
}

type UserCharacterDashboard ={
  userInfo:{
    characters: Character []
  }
}

export default UserCharacterDashboard
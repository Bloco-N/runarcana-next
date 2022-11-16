export const modifier = (x:number) => Math.floor((x - 10) / 2)

export const proficiency = (prof:string, mod:number, proficiencyBonus:number) => {
  switch (prof) {
    case 'NOT_PROFICIENT':
      return mod
    case 'PROFICIENT':
      return mod + proficiencyBonus
    case 'SPECIALIST':
      return mod + proficiencyBonus * 2
  }
}
type RunarcanaClasse = {
  id:number,
  name:string,
  description:string,
  primaryAbility:string,
  savingThrows:string
}

type ListAllClasses = {
  listAllRClasses:{
    runarcanaClasses: RunarcanaClasse []
  }
}

export default ListAllClasses
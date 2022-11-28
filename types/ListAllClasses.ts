type RunarcanaClass = {
  id: number,
  name: string,
  description: string,
  primaryAbility: string,
  savingThrows: string
}

type ListAllClasses = {
  listAllRunarcanaClass: RunarcanaClass[]

}

export default ListAllClasses
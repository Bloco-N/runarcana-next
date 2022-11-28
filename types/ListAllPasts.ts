type Past = {
  id: number,
  description: string,
  languages: string,
  name: string,
  professions: string,
  skills: string
}

type ListAllPasts = {
  listAllPasts: Past[]
}

export default ListAllPasts
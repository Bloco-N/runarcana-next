type Past = {
  id:number,
  description: string,
  languages: string,
  name: string,
  professions: string, 
  skills: string
}

type ListAllPasts = {
  listAllPasts:{
    pasts: Past []
  }
}

export default ListAllPasts
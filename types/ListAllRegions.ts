type Region = {
  id:number,
  name:string
}

type ListAllRegions = {
  listAllRegions:{
    regions: Region[]
  }
}

export default ListAllRegions
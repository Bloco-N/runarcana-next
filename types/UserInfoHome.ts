type CharactersHome = {
  id:number,
  name:string
}

type UserInfoHome = {
  userInfo:{
    characters: CharactersHome[]
  }
}

export default UserInfoHome
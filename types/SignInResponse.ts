type SignInResponse = {
  signIn:{
    token:string,
    user:{
      id:number,
      nickname:string,
      username:string
    }
  }
}

export default SignInResponse
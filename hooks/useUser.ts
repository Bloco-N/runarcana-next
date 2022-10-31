import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import User from "../types/User"
import protectedRoutes from "../utils/protectedRoutes"

export default function useUser(){
  const router = useRouter()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const user:User = JSON.parse(localStorage.getItem('user') as string)
    if(!user && protectedRoutes.includes(router.asPath)) router.push('/sign-in')
    setUser(user)
  }, [router])

  return user
}
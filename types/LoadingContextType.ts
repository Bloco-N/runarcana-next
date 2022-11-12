import { Dispatch, SetStateAction } from "react"

type LoadingContextType = [
  loadingLayout:boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
]

export default LoadingContextType
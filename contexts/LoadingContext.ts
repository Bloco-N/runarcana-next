import { createContext } from "react"
import LoadingContextType from "../types/LoadingContextType"

const LoadingContext = createContext<LoadingContextType | null>(null)

export default LoadingContext
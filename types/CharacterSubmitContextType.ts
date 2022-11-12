import { Dispatch, SetStateAction } from "react"
import CreateCharacterSubmit from "./CreateCharacterSubmit"

type CharacterSubmitContextType = [
  CreateCharacterSubmit,
  Dispatch<SetStateAction<CreateCharacterSubmit>>
]

export default CharacterSubmitContextType
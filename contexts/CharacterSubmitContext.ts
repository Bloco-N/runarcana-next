import { createContext } from "react";
import CharacterSubmitContextType from "../types/CharacterSubmitContextType";

const CharacterSubmitContext = createContext<CharacterSubmitContextType | null>(null)

export default CharacterSubmitContext
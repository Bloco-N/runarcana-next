import React, { Dispatch, SetStateAction } from 'react';
import CreateCharacterSubmit from '../types/CreateCharacterSubmit';
import CharacterNameInput from './create_character/CharacterNameInput';
import MoralInput from './create_character/MoralInput';
import OriginInput from './create_character/OriginInput';
import PastInput from './create_character/PastInput';
import RegionInput from './create_character/RegionInput';
import RunarcanaClassInput from './create_character/RunarcanaClassInput';

type InputsWrapperProps = {
  currentInput: number,
}

const InputsWrapper = (props:InputsWrapperProps) => {
  
  switch(props.currentInput){
    case 0: return <RegionInput/>
    case 1: return <OriginInput/>
    case 2: return <RunarcanaClassInput/>
    case 3: return <PastInput/>
    case 4: return <MoralInput/>
    case 5: return <CharacterNameInput/>
    default: return <RegionInput/>
  }

};

export default InputsWrapper;
import React, { Dispatch, SetStateAction } from 'react';
import CreateCharacterSubmit from '../types/CreateCharacterSubmit';
import CharacterNameInput from './CharacterNameInput';
import MoralInput from './MoralInput';
import OriginInput from './OriginInput';
import PastInput from './PastInput';
import RegionInput from './RegionInput';
import RunarcanaClassInput from './RunarcanaClassInput';

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
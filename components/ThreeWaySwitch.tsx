import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Skills } from '../types/UserCharacterDashBoard';

type ThreeWaySwitchProps = {
    skills: Skills,
    setSkills: Dispatch<SetStateAction<Skills>>,
    name: string
    value: string
    className?: string
}

const Container = styled.div`
  div{      
    height: 2rem;
    width: 2rem;
    text-align: center;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    background-color: rgba(124, 127, 147, 0.25);
    backdrop-filter: blur(0.2rem);
    &.not-proficient{
      
    }
    &.proficient{
      background-color: var(--secondary);
      opacity: 0.7;
    }
    &.specialist{
      background-color: var(--secondary);
    }
  }
  &.specialist{
    animation: blink infinite alternate 1s;
  }
  :hover{
    cursor: pointer;
  }
`

const ThreeWaySwitch = (props: ThreeWaySwitchProps) => {
    const [value, setValue] = useState(props.value)
    const parent = useRef(null)
    const children = useRef(null)
    useEffect(() => {
        if (parent.current && children.current && props.value) {
            const parentCurrent = parent.current as HTMLElement
            const childrenCurrent = children.current as HTMLElement
            if (props.value === 'NOT_PROFICIENT') {
                childrenCurrent.classList.add('not-proficient')
            } else if (props.value === 'PROFICIENT') {
                childrenCurrent.classList.add('proficient')
            } else {
                childrenCurrent.classList.add('specialist')
                parentCurrent.classList.add('specialist')
            }
        }
        setValue(props.value)
    }, [props.value])
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        const aux = props.skills
        if (value === 'NOT_PROFICIENT') {
            target.classList.remove('not-proficient')
            target.classList.add('proficient')
            aux[props.name as keyof Skills] = 'PROFICIENT'
            props.setSkills({ ...aux })
            setValue('PROFICIENT')
        } else if (value === 'PROFICIENT') {
            target.classList.remove('proficient')
            target.parentElement?.classList.add('specialist')
            target.classList.add('specialist')
            aux[props.name as keyof Skills] = 'SPECIALIST'
            props.setSkills({ ...aux })
            setValue('SPECIALIST')
        } else {
            target.classList.remove('specialist')
            target.parentElement?.classList.remove('specialist')
            target.classList.add('not-proficient')
            aux[props.name as keyof Skills] = 'NOT_PROFICIENT'
            props.setSkills({ ...aux })
            setValue('NOT_PROFICIENT')
        }
    }
    return (
        <Container {...props} ref={parent} onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}>
            <div ref={children}></div>
        </Container>
    );
};

export default ThreeWaySwitch;
import React from 'react';
import styled from 'styled-components';

type InputProps = {
  placeholder: string,
  type?: string
}

const Container = styled.input`
  all: unset;
  padding-bottom: 1rem;
  border-bottom: 0.1rem solid var(--secondary);
  font-size: 2rem;
  ::placeholder{
    color: var(--secondary);
    opacity: 0.7;
  }
`

const Input = React.forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  return <Container ref={ref} {...props} />
}) 
Input.displayName = 'Input'

export default Input;
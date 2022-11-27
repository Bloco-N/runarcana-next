import React from 'react';
import styled from 'styled-components';

type InputProps = {
  placeholder: string,
  type?: string
  onFocus?: React.FocusEventHandler
  onChange?: React.ChangeEventHandler
}

const Container = styled.input`
  all: unset;
  background: linear-gradient(45deg, var(--gradient-color-one) 0%, var(--gradient-color-two) 100%);
  background-size: 400%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: gradient 2s ease infinite;
  color: transparent;
  padding-bottom: 1rem;
  border-bottom: 0.2rem solid var(--secondary);
  font-size: 2rem;
  opacity: 0.7;
  caret-color: var(--gradient-color-one);
  :focus{
    opacity: 1;
    border-image-source: linear-gradient(45deg, var(--gradient-color-one) 0%, var(--gradient-color-two) 100%);
    border-image-slice: 1;
  }
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
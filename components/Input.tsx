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

const Input = (props: InputProps) => {
  return (
    <Container {...props} />
  );
};

export default Input;
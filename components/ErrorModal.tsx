import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 4%;
  padding: 4rem;
  color: var(--error);
`
type ErrorModalProps = {
  message: string
}

const ErrorModal = (props:ErrorModalProps) => {
  return (
    <Container>
      <p>{props.message}</p>
    </Container>
  );
};

export default ErrorModal;
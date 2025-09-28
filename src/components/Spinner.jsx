import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4c6ef5;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export default Spinner;

import React from 'react';
import styled, { keyframes } from 'styled-components';

function Waiting() {
  return (
    <Loading>
      <LoadingPoint delay={0} />
      <LoadingPoint delay={0.4} />
      <LoadingPoint delay={0.8} />
    </Loading>
  );
}

export default Waiting;

const LoadingAnimation = keyframes`
  to {
    opacity: 0.3;
    transform: translateY(-25px);
    -webkit-transform: translateY(-25px);
    -moz-transform: translateY(-25px);
    -ms-transform: translateY(-25px);
    -o-transform: translateY(-25px);
  }
`;

const LoadingPoint = styled.div`
  width: 15px;
  height: 15px;
  background-color: white;
  margin-left: 5px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  margin-top: calc(60px - 12.5px);
  animation-name: ${LoadingAnimation};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: ${({ delay }) => delay || 0}s;
`;

const Loading = styled.div`
  flex-grow: 1;
  margin: 0px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: none;
`;

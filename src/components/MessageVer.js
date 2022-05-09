import React from 'react';
import styled, { keyframes } from 'styled-components';

const MessageVer = ({
  verify,
  handleOnVer,
}) => (
  <Rootwrapper valid={verify == 'Valid'}>
    {
      (verify == '') ? (
        <Loading>
          <LoadingPoint delay={0} />
          <LoadingPoint delay={0.4} />
          <LoadingPoint delay={0.8} />
        </Loading>
      ) : (
        <Btn onClick={handleOnVer}>{verify}</Btn>
      )
    }
  </Rootwrapper>
);

export default MessageVer;

const Rootwrapper = styled.div`
  background-color: ${({ valid }) => (valid ? '#3e5d19' : '#6b0600')};
  width: 100%;
  height: inherit;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
`;

const Btn = styled.button`
  color: white;
  background: transparent;
  height: 60px;
  width: 120px;
  padding: 10px 20px;
  border-color: white;
	border-radius: 6px;
	border-width: 2px;
	border-style: solid;
	font-size: 20px;
	font-family: 'Ubuntu', sans-serif;
	cursor: pointer;
	transition: 0.25s ease;
  position: relative;
	overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    width: 150%;
    padding-top: 150%;
    transform: rotate(25deg);
    top: -100%;
    left: -190%;
    transition: 0.5s ease;
  }
  &:hover {
    &:after {
      left: 130%;
    }
  }
`;

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
  margin: 0px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: none;
`;

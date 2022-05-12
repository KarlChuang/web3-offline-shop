import React from 'react';
import styled, { keyframes } from 'styled-components';
// import { useParams } from 'react-router-dom'

const MessageVer = ({
  id,
  name,
  verify,
  verifyMsg,
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
        <Display>
          <Btn valid={verify == 'Valid'} onClick={handleOnVer}>{name}</Btn>
          <Message>{verifyMsg}</Message>
        </Display>
      )
    }
  </Rootwrapper>
);


export default MessageVer;

const Rootwrapper = styled.div`
  background-color: ${({ valid }) => (valid ? '#3e5d19' : '#6b0600')};
  width: 100%;
  flex-grow: 1;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: scroll;
`;

const Display = styled.div`
  width: 80%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Message = styled.div`
  color: white;
  word-break: break-word;
  margin-top: 30px;
`;

const Btn = styled.button`
  color: ${({ valid }) => (valid ? '#3e5d19' : '#6b0600')};
  background: white;
  height: 300px;
  width: 100%;
  padding: 10px 20px;
  border-color: white;
	border-radius: 6px;
	border-width: 2px;
	border-style: solid;
	font-size: 30px;
  font-weight: 900;
	font-family: 'Ubuntu', sans-serif;
	cursor: pointer;
	transition: 0.25s ease;
  position: relative;
  user-select: none;
  &:active {
    background-color: ${({ valid }) => (valid ? '#3e5d19' : '#6b0600')};
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
  flex-grow: 1;
  margin: 0px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: none;
`;

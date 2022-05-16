import React from 'react';
import styled from 'styled-components';

import Waiting from './Waiting';

const MessageVer = ({
  name,
  verify,
  verifyMsg,
  handleOnVer,
}) => (
  <Rootwrapper valid={verify == 'Valid'}>
    {
      (verify == '') ? (
        <Waiting />
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

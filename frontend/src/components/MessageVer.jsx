import React from 'react';
import styled from 'styled-components';

import Waiting from './Waiting';

function MessageVer({
  name,
  imageUri,
  verify,
  verifyMsg,
  handleOnVer,
}) {
  return (
    <Rootwrapper valid={verify === 'Valid'}>
      {
        (verify === '') ? (
          <Waiting />
        ) : (
          <Display>
            <Btn valid={verify === 'Valid'} onClick={handleOnVer} img={imageUri}>
              {name}
            </Btn>
            <Message>{verifyMsg}</Message>
          </Display>
        )
      }
    </Rootwrapper>
  );
}

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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  color: white;
  height: 300px;
  width: 100%;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 30px;
  font-weight: 900;
  font-family: 'Ubuntu', sans-serif;
  cursor: pointer;
  transition: 0.25s ease;
  position: relative;
  user-select: none;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${({ img }) => img});
  background-size: 100% auto;
  background-position: 50% 50%;
  &:active {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${({ img }) => img});
    background-size: 150% auto;
    background-position: 50% 50%;
  }
`;

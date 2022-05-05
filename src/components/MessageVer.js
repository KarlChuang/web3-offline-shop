import React from 'react';
import styled from 'styled-components';

const MessageVer = ({
  verify,
  handleOnVer,
}) => (
  <Rootwrapper>
    <Btn onClick={handleOnVer}>VERIFY</Btn>
    <Msg>{(verify) ? "Valid" : "Invalid"}</Msg>
  </Rootwrapper>
);

export default MessageVer;

const Rootwrapper = styled.div`
  margin: 20px;
  width: 50%;
  height: inherit;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

const Btn = styled.button`
  margin-top: 50px;
`;

const Msg = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  word-break: break-word;
`;

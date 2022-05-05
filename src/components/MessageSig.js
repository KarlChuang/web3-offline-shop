import React from 'react';
import styled from 'styled-components';

const MessageSig = ({
  message,
  address,
  signature,
  handleStateChange,
  handleOnSig,
}) => (
  <Rootwrapper>
    <MsgInput value={message} onChange={(e) => handleStateChange('message', e.target.value)} />
    <Msg>message: "{message}"</Msg>
    <button onClick={handleOnSig}>SIGN</button>
    <Msg>address: "{address}"</Msg>
    <Msg>signature: "{signature}"</Msg>
  </Rootwrapper>
);

export default MessageSig;

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

const MsgInput = styled.input`
  width: 80%;
  margin-top: 50px;
`;

const Msg = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  word-break: break-word;
`;

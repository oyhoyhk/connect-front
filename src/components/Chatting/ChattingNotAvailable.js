import React from 'react';

import styled from 'styled-components';

const ChattingNotAvailableBlock = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
`;

const Text = styled.div`
  padding: 20px;
  background: #73b2ff;
  color: white;
  border-radius: 10px;
  font-size: 1.2rem;
`;

const ChattingNotAvailable = () => {
  return (
    <ChattingNotAvailableBlock>
      <Text>대화 상대를 선택해주세요</Text>
    </ChattingNotAvailableBlock>
  );
};

export default ChattingNotAvailable;

import React from 'react';
import styled from 'styled-components';

const BackgroundBlock = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #d3d3d3;
`;

const Background = (props) => {
  return <BackgroundBlock {...props} />;
};

export default Background;

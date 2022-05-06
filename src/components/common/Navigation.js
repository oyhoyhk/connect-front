import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../node_modules/react-router-dom/index';
import palette from '../../lib/styles/palette';

const NavigationBlock = styled.div`
  width: 800px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NavigateLink = styled(Link)`
  text-decoration: none;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${palette.blue[0]};
  color: ${palette.blue[0]};
  border-radius: 8px;
  height: 50px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: 0.3s;
  margin-bottom: 30px;
  &:hover {
    background: ${palette.blue[0]};
    color: white;
  }
`;
const NewMessages = styled.div`
  width: 25px;
  height: 25px;
  background: #ff6f6f;
  color: white;
  font-size: 0.7rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -10%;
  bottom: -10%;
`;
const Navigation = ({ newMessages }) => {
  return (
    <NavigationBlock>
      <NavigateLink to="/">단체 채팅</NavigateLink>
      <NavigateLink to="/friends">친구 목록</NavigateLink>
      <NavigateLink to="/chatting" style={{ position: 'relative' }}>
        채팅 목록
        {newMessages !== 0 ? (
          <NewMessages>{newMessages >= 100 ? '100+' : newMessages}</NewMessages>
        ) : (
          ''
        )}
      </NavigateLink>
      <NavigateLink to="/setting">개인 설정</NavigateLink>
    </NavigationBlock>
  );
};

export default Navigation;

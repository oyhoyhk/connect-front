import React from 'react';
import styled from 'styled-components';

const TagListBlock = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const TagListTitle = styled.div`
  width: 40%;
  background: #73b2ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  border-radius: 10px;
`;
const TagInputForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TagInput = styled.input`
  width: 75%;
  outline: none;
  border: 2px solid #73b2ff;
  border-radius: 10px;
  font-size: 1.25rem;
  text-align: center;
  padding: 5px 0;
`;
const TagInputButton = styled.button`
  outline: none;
  background: #73b2ff;
  border: none;
  border-radius: 10px;
  color: white;
  width: 20%;
  height: 100%;
  cursor: pointer;
`;
const TagBox = styled.div`
  border: 2px solid #73b2ff;
  border-radius: 10px;
  width: 100%;
  height: 200px;
  padding: 3px;
`;
const Tag = styled.div`
  display: inline-block;
  background: #7ab2ff;
  padding: 5px 8px;
  border-radius: 10px;
  color: white;
  margin: 5px;
  cursor: pointer;
`;
const TagList = ({ onSubmit, onRemove, tags }) => {
  return (
    <TagListBlock>
      <TagListTitle>관심 태그</TagListTitle>
      <TagInputForm onSubmit={onSubmit}>
        <TagInput name="tag" placeholder="태그 입력" />
        <TagInputButton>추가</TagInputButton>
      </TagInputForm>
      <TagBox>
        {tags.map((tag) => (
          <Tag key={tag} onClick={onRemove}>
            #{tag}
          </Tag>
        ))}
      </TagBox>
    </TagListBlock>
  );
};

export default TagList;

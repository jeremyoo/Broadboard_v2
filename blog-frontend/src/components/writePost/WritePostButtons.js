import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WritePostButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WritePostButtons = ({ onCancel, onPublish, isEdit }) => {
  return (
    <WritePostButtonsBlock>
      <StyledButton cyan onClick={onPublish}>
        {isEdit ? 'Edit' : 'Add'} Post
      </StyledButton>
      <StyledButton onClick={onCancel}>Cancel</StyledButton>
    </WritePostButtonsBlock>
  );
};

export default WritePostButtons;

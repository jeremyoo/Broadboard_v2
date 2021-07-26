import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WritePostButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  color: var(--white);
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WritePostButtons = ({ onPublish, isEdit, onChangeConfirm }) => {
  return (
    <WritePostButtonsBlock>
      <StyledButton cyan onClick={onPublish}>
        {isEdit ? 'Edit' : 'Add'} Post
      </StyledButton>
      <StyledButton onClick={onChangeConfirm}>Cancel</StyledButton>
    </WritePostButtonsBlock>
  );
};

export default WritePostButtons;

import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';

const WriteCommentButtonsBlock = styled(Responsive)`
  padding: 1.5rem 1rem;
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

const WriteCommentButtons = ({ onCancel, onPublish, isEdit }) => {
  return (
    <WriteCommentButtonsBlock>
      <StyledButton cyan onClick={onPublish}>
        {isEdit ? 'Edit' : 'Add'} Comment
      </StyledButton>
      <StyledButton onClick={onCancel}>Cancel</StyledButton>
    </WriteCommentButtonsBlock>
  );
};

export default WriteCommentButtons;

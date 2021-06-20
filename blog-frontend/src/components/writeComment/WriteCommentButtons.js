import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteCommentButtonsBlock = styled.div`
  padding: 1rem 1rem 0;
  width: 768px;
  display: flex;
  justify-content: flex-end;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
      margin-left: 0.5rem;
  }
`;

const WriteCommentButtons = ({ onCancel, onCancelAdd, onPublish, commentId }) => {

  const onCancelAll = () => {
    onCancel();
    onCancelAdd();
  }

  return (
    <>
      {commentId ? (
        <>
          <StyledButton cyan onClick={onPublish}>Confirm</StyledButton>
          <StyledButton onClick={onCancelAll}>Cancel</StyledButton>
        </>
      ) : (
        <WriteCommentButtonsBlock>
            <StyledButton ClassName="largeBtn" cyan onClick={onPublish}>Confirm</StyledButton>
            <StyledButton ClassName="largeBtn" onClick={onCancelAll}>Cancel</StyledButton>
        </WriteCommentButtonsBlock>
      ) }
    </>
  );
};

export default WriteCommentButtons;

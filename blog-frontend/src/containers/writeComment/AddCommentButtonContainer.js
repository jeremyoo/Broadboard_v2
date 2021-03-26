import React from 'react';
import styled, { css } from 'styled-components';
import Responsive from '../../components/common/Responsive'
import Button from '../../components/common/Button'
import palette from '../../lib/styles/palette';

const AddCommentBlock = styled(Responsive)`
  display: flex;
  width: 768px;
  padding: 3rem 0;
  justify-content: center;
  align-items: center;
  ${props => !props.addComment && css`
    border-top: 1px solid ${palette.gray[2]};
  `}
`;

const AddCommentButton = styled(Button)`
  font-size: var(--ft-xl);
  padding: 1rem 10rem;
`;

const AddCommentButtonContainer = ({ onClickAdd, addComment, loadingComments }) => {

  return (
    <AddCommentBlock addComment={addComment}>
    {!loadingComments && (
        <AddCommentButton onClick={onClickAdd}>Add your comment!</AddCommentButton>
    ) }
    </AddCommentBlock>
  );
};

export default AddCommentButtonContainer;

import React from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';

const WriteNextButtonBlock = styled.div`
  width: 768px;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
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

const WriteNextButtonContainer = ({ onChangeConfirm, onCancel }) => {
  return (
    <WriteNextButtonBlock>
        <StyledButton onClick={onChangeConfirm} cyan>Next</StyledButton>
        <StyledButton onClick={onCancel}>Cancel</StyledButton>
    </WriteNextButtonBlock>
  );
};

export default WriteNextButtonContainer;

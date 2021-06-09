import React from 'react';
import CommentEditorContainer from '../writeComment/CommentEditorContainer';
import WriteCommentButtonContainer from '../writeComment/WriteCommentButtonContainer';
import AddCommentButtonContainer from '../writeComment/AddCommentButtonContainer';
import Responsive from '../../components/common/Responsive'
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const CommentBlock = styled(Responsive)`
    background: var(--bright-white);
    justify-content: center;
    width: 768px;
    padding: 2rem 0;
    margin-bottom: 3rem;
    ${props => props.addComment && css`
        border: 1px solid ${palette.gray[2]};
        border-radius: 6px;
    `};
`;

const CommentWriteContainer = ({ loadingComments, addComment, onClickAdd, onCancelAdd }) => {

    return (
        <>
            {!addComment ?
            <AddCommentButtonContainer onClickAdd={onClickAdd} addComment={addComment} loadingComments={loadingComments} />:
            <CommentBlock addComment={addComment}>
                <CommentEditorContainer addComment={addComment} />
                <WriteCommentButtonContainer onCancelAdd={onCancelAdd} />
            </CommentBlock>
            }
        </>
    )
};

export default CommentWriteContainer;


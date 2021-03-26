import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styled, { css } from 'styled-components';

const CommentEditorBlock = styled.div`
  width: 736px;
  margin: 0 auto;
  ${props => props.originalCommentId && css `
    margin-top: 1rem;
  `}
`;

const CommentQuillWrapper = styled.div`
  .ql-editor {
    padding: 0.5rem 0.75rem;
    min-height: 120px;
    font-size: var(--ft-lg);
    font-family: Sans-Serif;
    line-height: 1.3;
  }
  .ql-editor.ql-blank::before {
    left: 0.75rem;
  }
  background: var(--brightest-white);
`;

const CommentEditor = ({ onChangeComment, body, originalCommentId }) => {
  const CommentquillElement = useRef(null);
  const CommentquillInstance = useRef(null);

  useEffect(() => {
    CommentquillInstance.current = new Quill(CommentquillElement.current, {
      theme: 'snow',
      placeholder: 'write your comment...',
      modules: {
        // https://quilljs.com/docs/modules/toolbar/
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],
          ],
        }
      },
    });
    // https://quilljs.com/docs/api/events
    const quill = CommentquillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeComment({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeComment]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    CommentquillInstance.current.root.innerHTML = body;
  }, [body]);

  return (
    <CommentEditorBlock originalCommentId={originalCommentId} >
      <CommentQuillWrapper>
        <div ref={CommentquillElement} />
      </CommentQuillWrapper>
    </CommentEditorBlock>
  );
};

export default CommentEditor;

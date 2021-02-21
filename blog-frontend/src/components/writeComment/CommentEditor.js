import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const CommentEditorBlock = styled(Responsive)`
  padding-top: 2rem;
`;

const CommentQuillWrapper = styled.div`
  .ql-editor {
    padding: 0.5rem 1rem;
    min-height: 120px;
    font-size: 1rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0.75rem;
  }
`;

const CommentEditor = ({ onChangeComment, body }) => {
  const CommentquillElement = useRef(null);
  const CommentquillInstance = useRef(null);

  useEffect(() => {
    CommentquillInstance.current = new Quill(CommentquillElement.current, {
      theme: 'snow',
      placeholder: 'write your post...',
      modules: {
        // https://quilljs.com/docs/modules/toolbar/
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block', 'link'],
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
    <CommentEditorBlock>
      <CommentQuillWrapper>
        <div ref={CommentquillElement} />
      </CommentQuillWrapper>
    </CommentEditorBlock>
  );
};

export default CommentEditor;

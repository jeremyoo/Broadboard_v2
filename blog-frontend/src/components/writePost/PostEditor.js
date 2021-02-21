import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import * as fileCtrl from '../../lib/api/file';

const PostEditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const PostQuillWrapper = styled.div`
  .ql-editor {
    padding: 0.5rem 1rem;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 1rem;
  }
`;

const PostEditor = ({ onChangePost, title, body }) => {
  const PostquillElement = useRef(null);
  const PostquillInstance = useRef(null);

  useEffect(() => {
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
          const file = input.files[0];
          const formData = new FormData();
          formData.append('image', file);
          const path = await fileCtrl.upload(formData);
          const url = path.data.data.display_url
          const range = quill.getSelection(true);
          await quill.insertEmbed(range.index, 'image', url);
          quill.setSelection(range.index + 1);
          onChangePost({ key: 'body', value: quill.root.innerHTML });
        }
    } 
    PostquillInstance.current = new Quill(PostquillElement.current, {
      theme: 'snow',
      placeholder: 'write your post...',
      modules: {
        // https://quilljs.com/docs/modules/toolbar/
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block', 'link', 'image'],
          ],
          handlers: {
            image: imageHandler
          }
        }
      },
    });
    // https://quilljs.com/docs/api/events
    const quill = PostquillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangePost({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangePost]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    PostquillInstance.current.root.innerHTML = body;
  }, [body]);

  const onChangeTitle = (e) => {
    onChangePost({ key: 'title', value: e.target.value });
  };

  return (
    <PostEditorBlock>
      <TitleInput
        placeholder="Title"
        onChange={onChangeTitle}
        value={title}
      />
      <PostQuillWrapper>
        <div ref={PostquillElement} />
      </PostQuillWrapper>
    </PostEditorBlock>
  );
};

export default PostEditor;

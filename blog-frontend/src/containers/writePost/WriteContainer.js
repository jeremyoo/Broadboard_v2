import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changePostField, initializePost } from '../../modules/writePost';
import PostEditor from '../../components/writePost/PostEditor';
import TagBoxContainer from './TagBoxContainer';
import WriteNextButtonContainer from './WriteNextButtonContainer'
import ConfirmContainer from './ConfirmContainer';

const WriteContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ writePost }) => ({
    title: writePost.title,
    body: writePost.body,
  }));
  const [ confirmOn, setConfirmOn ] = useState(false);

  useEffect(() => {
    return () => dispatch(initializePost());
  }, [dispatch]);

  const onChangePost = useCallback((payload) => dispatch(changePostField(payload)),
    [dispatch],
  );

  // remember to put error when no title body value
  const onChangeConfirm = useCallback(() => { if (title !== "" && body !== "" ) setConfirmOn(!confirmOn)});
  const onCancel = useCallback(() => history.goBack());

  return (
    <>
      <PostEditor onChangePost={onChangePost} title={title} body={body} />
      <TagBoxContainer />
      <WriteNextButtonContainer onChangeConfirm={onChangeConfirm} onCancel={onCancel}/>
      {confirmOn === true &&
      <ConfirmContainer onChangePost={onChangePost} onChangeConfirm={onChangeConfirm} confirmOn={confirmOn} />
      }
    </>
  )
};

export default withRouter(WriteContainer);

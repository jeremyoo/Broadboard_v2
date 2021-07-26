import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostItem from '../../components/common/PostItem';
import { initializeBanner } from '../../modules/writePost'
// import * as fileCtrl from '../../lib/api/file';
import sanitizeHtml from 'sanitize-html';

const PreviewContainer = ({ onChangePost, smalleritem, preview }) => {
  const dispatch = useDispatch();
  const { title, body, banner, tags, user, _id } = useSelector(({ writePost, user }) => ({
    title: writePost.title,
    body: writePost.body,
    banner: writePost.banner,
    tags: writePost.tags,
    user: user.user.nickname,
    _id: writePost.originalPostId,
  }));

  const removeHtmlAndShorter = body => {
    const filtered = sanitizeHtml(body, {allowedTags: []});
    return filtered.length < 125 ? filtered : `${filtered.slice(0, 125)}...`;
  };
  
  const onInitialBanner = () => dispatch(initializeBanner());

  const post = {
    title: title,
    body: removeHtmlAndShorter(body),
    banner: banner,
    tags: tags,
    user: {
      nickname: user
    },
    publishedDate: null,
    like_users: [],
    likes_count: 0,
    _id: _id,
  }

  return ( 
    <>
        <PostItem smalleritem={smalleritem} preview={preview} onChangePost={onChangePost} onInitialBanner={onInitialBanner} post={post} />
    </>
  )
};

export default PreviewContainer;

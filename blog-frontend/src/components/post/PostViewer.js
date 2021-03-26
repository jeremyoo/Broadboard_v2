import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';

const PostViewerBlock = styled(Responsive)`
  margin-top: 6rem;
  width: 768px;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  .title {
    margin-bottom: 2rem; 
    font-size: var(--ft-lg-heading);
    font-weight: bold;
    line-height: 1.5;
    word-break: keep-all;
  }
  .subinfo {
    display: flex;
    margin-bottom: 1rem;
    .nickname {
      font-weight: bold;
      color: var(--light-navy)
    }
    .date {
      color: var(--light-steel)
    }
    .spacer {
      margin: 0 0.75rem;
    }
  }
`;

const PostContent = styled.div`
  padding-bottom: 6rem;
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
  word-wrap: break-word;
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {

  const contentRef = useRef();
  const [ toc, setToc ] = useState([]);

  useEffect(() => {
    console.log("viewerInner");
    if (!loading && post) {
      const content = contentRef.current.children;
      const arry = Array.from(content)
      arry.forEach(a => {
        if (a.localName === 'ul') {
          setToc(arr => [...arr, {
            tag: a.localName,
            text: a.innerText,
            top: a.offsetTop,
          }])
        }
      });
    }
  }, [loading])

  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>This post doesn't exist anymore.</PostViewerBlock>;
    }
    return <PostViewerBlock>Error occured!</PostViewerBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, body, user, publishedDate, tags } = post;
  const viewerTags = true;

  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title} - REACTERS </title>
      </Helmet>
      <PostHead>
        <div className='title'>{title}</div>
        <div className='subinfo'>
          <div className='nickname'>{user.nickname}</div>
          <div className='spacer'>·</div>
          <div className='date'>{moment(publishedDate).format('HH: mm MMM-Do-YYYY')}</div>
        </div>
        <Tags className='tags' tags={tags} viewerTags={viewerTags} />
      </PostHead>
      {actionButtons}
      <PostContent ref={contentRef} dangerouslySetInnerHTML={{ __html: body }} />
      {/* {toc.map((a) => 
        <div key={a.top} onClick={() => window.scrollTo({
          top: a.top,
          left: 0,
          behavior: 'smooth'
        })}>{a.text}</div>
      )} */}
    </PostViewerBlock>
  );
};

export default PostViewer;
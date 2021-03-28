import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
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
  h1 {
    margin: 2.5rem 0 1rem;
  }
  h2 {
    margin: 1.85rem 0 1rem;
  }
  h1, h2 {
    line-height: 1.5;
  }
  p {
    margin: 1rem 0;
    line-height: 1.5;
  }
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const PostTocBlock = styled.div`
  ${props => props.scrolled && css`
    .postToc {
      position: fixed;
      left: calc(50vw + 384px);
    }
  `}
  position: relative;
  margin-top: 1rem;
  .postTocPosition {
    position: absolute;
    left: 100%;
  }
  .postToc {
    margin-left: 4rem;
    padding-left: 1rem;
    border-left: 3px solid ${palette.gray[2]};
    width: 250px;
    div {
      margin: 0.4rem 0;
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
    .active {
      font-weight: bold;
    }
  }

`;

const PostViewer = ({ post, error, loading, actionButtons }) => {

  const contentRef = useRef();
  const scrollRef = useRef();
  const tocElement = useRef();

  const [ toc, setToc ] = useState([]);
  const [ scrolled, setScrolled ] = useState(false);
  const [ itemTop, setItemTop ] = useState(0);

  useEffect(() => {
    if (!loading && post) {
      const content = contentRef.current.children;
      const arry = Array.from(content)
      arry.forEach(a => {
        if (a.localName === 'h1' || a.localName === 'h2' ) {
          setToc(arr => [...arr, {
            tag: a.localName,
            text: a.innerText,
            top: a.offsetTop - 65,
          }])
        }
      });
      setItemTop(scrollRef.current.offsetTop - 250);
    }
  }, [loading])

  const tocFix = useCallback(() => {
    if (document.documentElement.scrollTop >= 250) {
      return setScrolled(true);
    };
    setScrolled(false);
  })

  useEffect(() => {
    window.addEventListener("scroll", tocFix, true);
    return () => {
      window.removeEventListener("scroll", tocFix, true);
    }
  }, [loading, tocFix])

  const tocBold = useCallback(() => {
    if (toc.length !== 0) {
      toc.map((a, index) => {
        const tocRef =  tocElement.current;
        const currentScroll = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        const scrolling = currentScroll + (clientHeight * 2/5);
        const next = toc[index + 1] === undefined ? scrollHeight : toc[index + 1].top;
        if (a.top < scrolling && scrolling < next) {
          tocRef.children[index].className = "active"
        } else {
          tocRef.children[index].className = ""
        }
      })
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", tocBold, true);
    return () => {
      window.removeEventListener("scroll", tocBold, true);
    }
  }, [loading, scrolled])

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
      <PostTocBlock scrolled={scrolled} ref={scrollRef}>
        <div className="postTocPosition">
          <div className="postToc" ref={tocElement} style={{top: `${itemTop}px`}}>
          {toc.map((a, index) =>
            <div key={index} yoyyo={a.top}
            onClick={() => window.scrollTo({
              top: a.top,
              left: 0,
              behavior: 'smooth'
            })
          }
            >
              {a.text}
            </div>
          )}
          </div>
        </div>
      </PostTocBlock>
      <PostContent ref={contentRef} dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
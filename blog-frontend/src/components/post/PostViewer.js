import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import { FaHeart, FaShareAlt, FaCommentDots, FaTools } from "react-icons/fa";

const PostViewerBlock = styled(Responsive)`
  margin-top: 6rem;
  width: 768px;
`;

const PostHead = styled.div`
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
  img {
    margin: auto;
    display: block;
  }
  word-break: keep-all;
  overflow-wrap: break-word;
`;


const PostLikeShareBlock = styled.div`
  ${props => props.scrolled && css`
    .postLBC {
      position: fixed;
      right: calc(50vw + 367px);
    }
  `}
  position: relative;
  margin-top: 1rem;
  .postLBCPosition {
    position: absolute;
    right: 100%;
  }
  .postLBC {
    margin-right: 8rem;
    padding: 0 0.6rem;
    width: 90px;
    height: 300px;
    background-color: var(--bright-white);
    border: 1px solid var(--lightest-steel);
    border-radius: 5rem;
    ${props => props.scrolled && props.itemTop && css`
      top: ${props.itemTop - 0}px;
    `}
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
    .likeBlock {
      height: 115px;
      background-color: var(--brightest-white);
      border: 0.75px solid var(--lightest-steel);
      border-radius: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .likeValue {
        margin-top: 0.6rem;
        color: var(--light-steel);
        font-size: var(--ft-lg);
        font-weight: bold;
      }
      .likeLogo {
        cursor: pointer;
        .FaHeart {
          color: var(--light-steel);
        }
      }
      &:hover,
      &:focus,
      &:active {
        border: 0.75px solid var(--dark-steel);
        .FaHeart,
        .likeValue {
          color: var(--dark-steel);
        }
      }
    }
    .commentLogo,
    .shareLogo {
      cursor: pointer;
      height: 70px;
      background-color: var(--brightest-white);
      border: 0.75px solid var(--lightest-steel);
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .FaCommentDots,
      .FaShareAlt {
        color: var(--light-steel);
      }
      &:hover,
      &:focus,
      &:active {
        border: 0.75px solid var(--dark-steel);
        .FaCommentDots,
        .FaShareAlt {
          color: var(--dark-steel);
        }
      }
    }
  }
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
    margin-left: 4.5rem;
    padding-left: 1rem;
    border-left: 2px solid ${palette.gray[1]};
    width: 250px;
    ${props => props.scrolled && props.itemTop && css`
      border-left: 2px solid ${palette.gray[4]};
      top: ${props.itemTop - 0}px;
    `}
    div {
      padding: 0.25rem 0;
      cursor: pointer;
      font-size: var(--ft-md);
      color: var(--lightestest-navy);
      &:hover,
      &:focus,
      &:active {
        text-shadow: var(--steel) 1px 0 2px;
        animation: jumpX 0.25s;
        animation-timing-function: var(--easing);
      }
    }
    .typeh2 {
      margin-left: 0.75rem;
    }
    #tocInneractive {
      text-shadow: var(--steel) 1px 0 2px;
      animation: jumpX 0.25s;
      animation-timing-function: var(--easing);
    }
  }
`;

const PostViewer = ({ post, error, loading, actionButtons, onLike, onAddCmt }) => {

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
            top: a.offsetTop,
          }])
        }
      });
      setItemTop(scrollRef.current.offsetTop - 250);
    }
    return () => {
      setToc([]);
    }
  }, [loading, post])

  const tocFix = useCallback(() => {
      if (document.documentElement.scrollTop >= 250 && tocElement.current !== null) {
        return setScrolled(true);
      };
      return setScrolled(false);
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
          tocRef.children[index].id = "tocInneractive";
        } else {
          tocRef.children[index].id = "";
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

  const { title, body, user, publishedDate, tags, likes_count } = post;
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
      <PostLikeShareBlock scrolled={scrolled} itemTop={itemTop}>
        <div className="postLBCPosition">
          <div className="postLBC">
            <div className="likeBlock">
              <div className="likeLogo" onClick={onLike}>
                <FaHeart className="FaHeart" size="32px" />
              </div>
              <div className="likeValue">
                {likes_count}
              </div>
            </div>
            <div className="shareLogo">
              <FaShareAlt className="FaShareAlt" size="32px" />
            </div>
            <div className="commentLogo" onClick={onAddCmt}>
              <FaCommentDots  className="FaCommentDots" size="32px" />
            </div>
          </div>
        </div>
      </PostLikeShareBlock>
      <PostTocBlock scrolled={scrolled} itemTop={itemTop} ref={scrollRef}>
        <div className="postTocPosition">
          <div className="postToc" ref={tocElement} >
          {toc.map((a, index) =>
            <div className={"type"+a.tag} key={index} onClick={() => window.scrollTo({top: (a.top - (document.documentElement.clientHeight * 2/5) + 1), left: 0,behavior: 'smooth'})}>
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
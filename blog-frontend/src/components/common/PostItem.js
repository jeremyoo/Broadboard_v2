import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import moment from 'moment';
import UploadButton from './UploadButton';
import { IoImageOutline } from "react-icons/io5";

const PostItemCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 49rem;
    padding-bottom: 4rem;
    overflow: hidden;
    ${props => props.smalleritem && css`
        width: 20rem;
        height: 28rem;
        margin: 1rem;
        padding-bottom: 0;
        box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
        border-radius: 0.5rem;
        background: white;
        ${props => props.preview && css`
            margin: 0;
        `}
    `}
`;

const PostPostBlock = styled.div`
    .postImage {
        height: 29rem;
        width: 100%;
        position: relative;
        justify-content: center;
        align-items: center;
        background: var(--dark-steel);
        z-index: 0;
        img {
            object-fit: cover;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }
        ${props => props.smalleritem && css`
            height: 12rem;
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
            img {
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
                z-index: 9;
            }
            .exit {
                position: absolute;
                top: 4px;
                left: calc(100% - 44px);
                z-index: 10;
                width: 40px;
                height: 40px;
                background-color: var(--light-navy);
                border-radius: 0.5rem;
                pointer-events: auto;
                &:hover,
                &:focus,
                &:active {
                    cursor: pointer;
                    background-color: var(--lightestestest-navy);
                }
            }
            .exit::before,.exit::after {
                content:'';
                position: absolute;
                width: 34px;
                height: 3px;
                top: 18px;
                background-color: var(--white);
            }
            .exit::before{
                -webkit-transform:rotate(45deg);
                -moz-transform:rotate(45deg);
                transform:rotate(45deg);
                left: 3px;
                }
            .exit::after{
                -webkit-transform:rotate(-45deg);
                -moz-transform:rotate(-45deg);
                transform:rotate(-45deg);
                right: 3px;
            }
        `}
        .upload {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .imageIcon {
                color: var(--brightest-white);
            }
        }
    }
    .postContent {
        padding: 0.5rem 1rem 0;
        .title {
            margin: 0 0 0.25rem;
            font-size: var(--ft-xl);
            font-weight: bold;
            color: var(--light-navy);
            word-break: break-word;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .date {
            margin: 0 0 0.4rem;
            font-size: var(--ft-sm);
            color: var(--light-steel);
        }
        .body {
            font-size: var(--ft-lg);
            color: var(--lightestest-navy);
            word-break: break-all;
        }
        ${props => props.smalleritem && css`
        .body {
            font-size: var(--ft-md);
            color: var(--dark-steel);
        }`}
    }
`;

const PostItemLinkBlock = styled(Link)`display: block;`;
const PostItemDivBlock = styled.div`display: block;`;

const SubInfoBlock = styled.div`
    padding: 0.5rem 1rem;
    border-top: 1px solid rgb(238, 241, 245);
`;

const PostItemContent = ({ preview, smalleritem, onChangePost, onInitialBanner, title, banner, body, publishedDate }) => {
    
    return (
        <>
            <div className="postImage" banner={banner}>
                {banner && banner !== "" ?
                    (<div className="image">
                        {preview && preview === 1 &&
                            <div className="exit" onClick={onInitialBanner} />
                        }
                        <img src={`${banner}`} />
                    </div>)
                    :
                    (<div className="upload">
                        {preview && preview === 1 &&
                        <>
                            <IoImageOutline className="imageIcon" size="120" />
                            <UploadButton reduxAct={onChangePost} keyWord={'banner'} />
                        </>}
                    </div>)
                }
            </div>
            <div className="postContent" smalleritem={smalleritem} >
                <div className="title">{title}</div>
                {smalleritem &&
                    <div className="date">
                        {publishedDate && publishedDate !== null ? 
                            <>{moment(publishedDate).format('HH: mm MMM-Do-YYYY')}</>
                            :<>{moment().format('HH: mm MMM-Do-YYYY')}</>
                        }
                    </div>
                }
                <div className="body" smalleritem={smalleritem} >{body}</div>
            </div>
        </>
    )
}

const SubInfoBig = ({ publishedDate, like_users, likes_count}) => {
    return (
        <>
            <div className="date">{moment(publishedDate).format('HH: mm MMM-Do-YYYY')}</div>
            <div className="">
                {like_users && like_users !== null ? 
                    <div>{like_users.length}</div>:<></>
                }
                <div>{likes_count}</div>
            </div>
        </>
    )
}

const PostItem = ({ post, smalleritem, preview, onChangePost, onInitialBanner }) => {

       const { publishedDate, user, like_users, likes_count, tags, title, body, banner, _id } = post;
    
       return (
        <>
            <PostItemCard smalleritem={smalleritem} preview={preview}>
                <PostPostBlock smalleritem={smalleritem}>
                    {preview ?
                        <PostItemDivBlock smalleritem={smalleritem} >
                            <PostItemContent smalleritem={smalleritem} preview={preview} banner={banner} body={body} title={title} onChangePost={onChangePost} onInitialBanner={onInitialBanner} publishedDate={publishedDate} />
                        </PostItemDivBlock>
                    :
                        <PostItemLinkBlock to={`/@${user.nickname}/${_id}`} smalleritem={smalleritem}>
                            <PostItemContent smalleritem={smalleritem} banner={banner} body={body} title={title} publishedDate={publishedDate} />
                        </PostItemLinkBlock>
                    }
                </PostPostBlock>
                
                <Tags tags={tags} smalleritem={smalleritem} preview={preview} />

                <SubInfoBlock>
                    {smalleritem ?
                        <SubInfo preview={preview} nickname={user.nickname} likeUsers={like_users} likesCount={likes_count} />
                    :
                        <SubInfoBig publishedDate={publishedDate} like_users={like_users} likes_count={likes_count}  />
                    }
                </SubInfoBlock>
            </PostItemCard>
        </>
    );
};

export default PostItem;
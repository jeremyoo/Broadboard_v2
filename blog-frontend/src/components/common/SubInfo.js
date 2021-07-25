import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { IoChatboxEllipses, IoHeart } from "react-icons/io5";

const SubInfoBlock = styled.div`
    color: ${palette.gray[6]};
    span + span:before {
        color: ${palette.gray[4]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';
    }
    display: flex;
    justify-content: space-between;
    font-size: var(--ft-md);
    .link {
        display: flex;
        font-size: var(--ft-xsm);
        .nickname {
            display: flex;
            align-items: center;
            margin-left: 0.5rem;
            b {
                margin-left: 0.25rem;
            }
        }
    }
    .icons {
        display: flex;
        align-items: center;
        .icon {
            margin: 0 0.25rem 0 1rem;
        }
    }
    ${props => props.preview && css`
        pointer-events: none;
    `}
`;

const ProfilePic = styled.div`
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    background-color: var(--dark-teal);
`;

const SubInfo = ({ preview, nickname, likeUsers, likesCount }) => {
    return (
        <SubInfoBlock preview={preview}>
            <Link className='link' to={`/@${nickname}`}>
                <ProfilePic />
                <div className='nickname'>by<b>{nickname}</b></div>
            </Link>
            <div className='icons'>
                <IoChatboxEllipses className='icon' />{likeUsers.length}<IoHeart className='icon' />{likesCount}
            </div>
        </SubInfoBlock>
    );
};

export default SubInfo;
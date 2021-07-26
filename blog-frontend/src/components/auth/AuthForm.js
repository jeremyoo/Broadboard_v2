import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import UploadButton from '../common/UploadButton'

const AuthFormBlock = styled.div`
    width: 50%;
    background: var(--light-navy);
    padding: 1.5rem;
    .labelInputOuterregister {
        display: flex;
        justify-content: space-between;
    }
    .labelInputOuterlogin {
        display: normal;
    }
    .labelInputInnerregister,.labelInputInnerlogin {
        display: flex;
        flex-direction: column-reverse;
        margin: 0.35rem 0;
        transition: var(--transition);
    }
    .labelInputInnerregister {
        width: 48%;
    }
    .labelInputInnerlogin {
        width: 100%;
    }
    
    .labelTextareaInnter {
        display: flex;
        flex-direction: column-reverse;
        margin: 0.35rem 0;
        transition: var(--transition);
    }
    .labelTextareaInnter,.labelInputInner {
        .styledinput:focus + .styledlabel {
            font-weight: bold;
            color: var(--bright-white);
        }
    }
`;

const ProfilePicBlock = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0;
    .profilePicBlock {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1.5rem;
        .profilePic {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            width: 6.5rem;
            height: 6.5rem;
            overflow: hidden;
            user-select: none;
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
            .profileText {
                text-transform: uppercase;
                font-size: var(--ft-xl-heading);
                font-weight: bold;
            }
        }
    }

    .profileCons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 55%;
        color: var(--brightest-white);
        .introduction {
            margin-bottom: 0.4rem;
            line-height: 0.95;
            font-style: italic;
            font-size: var(--ft-xs);
            color: var(--dark-steel);
        }
        .profileColor {
            margin-bottom: 1rem;
            .colorBackPick,.colorTextPick {
                display: flex;
                align-items: center;
            }
            .colorBackPick {
                margin-bottom: 0.25rem;
            }
            input[type=color] {
            width: 1.75rem;
            height: 1.75rem;
            cursor: pointer;
            border-radius: 0.2rem;
                ::-webkit-color-swatch { 
                    border-radius: 0.2rem;
                }
            }
            label {
                margin-left: 0.5rem;
                pointer-events: none;
            }
        }
    }

`;

const StyledLabel = styled.label`
    font-size: var(--ft-xs);
    padding: 0 0.05rem;
    margin-bottom: 0.25rem;
    color: var(--light-steel);
    border: none;
    outline: none;
`;

const StyledInput = styled.input`
    font-size: var(--ft-sm);
    padding: 0.35rem 0.35rem;
    border-radius: 3px;
    outline: none;
    background: var(--white);
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
        background: var(--brightest-white);
        color: var(--light-navy);
    }
    &::placeholder {
        font-style: italic;
        color: var(--steel);
        font-size: var(--ft-sm);
    }
    &:focus {
        &::placeholder {
            color: transparent;
        }
    }
`;

const StyledTextBox = styled.textarea`
    resize: none;
    padding: 0.5rem 0.5rem;
    border-radius: 3px;
    height: 3rem;
    width: 100%;
    background: var(--white);
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
        background: var(--brightest-white);
        color: var(--light-navy);
    }
    &::placeholder {
        font-style: italic;
        color: var(--steel);
        font-size: var(--ft-sm);
    }
    &:focus {
        &::placeholder {
            color: transparent;
        }
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
    .switch {
        cursor: pointer;
    }
`

const ButtonWithMarginTop = styled(Button)`
    margin-top: 1rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`

const AuthForm = ({ type, form, onAuthOff, onChange, onChangeProfile, onInitializeProfilePic, onSubmit, onSwitchType, error }) => {
    const backurl = (type === 'register') ? form.profilePic.imgUrl : undefined;

    const [ profileColor, setProfileColor ] = useState({ text: '#fdfeff', back: '#5b6e94' });

    const onChangeColor = () => {
        if (type === 'register' && profileColor !== {} && !form.profilePic.imgUrl) {
            onChangeProfile({
                form: 'register',
                key: 'profilePic',
                value: { color: profileColor}
            })
        };
    };

    return (
        <AuthFormBlock>
            {/* <div className='logo-area'>
                <div className='to-Main' onClick={onAuthOff}><h3>BroadBoard</h3></div>
            </div> */}
            {type === 'register' && (
            <ProfilePicBlock>
                <div className='profilePicBlock'>
                    <div className='profilePic' style={{background: `${profileColor.back}`}}>
                        {!backurl && backurl === undefined && form.nickname !== '' && 
                            <div className='profileText' style={{color: `${profileColor.text}`}}>{form.nickname[0]}</div>}
                        {!backurl && backurl === undefined && form.nickname === '' &&
                            <div className='profileText' style={{color: `${profileColor.text}`}}>B</div>}
                        {backurl && backurl !== undefined &&
                            <img src={`${backurl}`} />}
                    </div>
                </div>
                <div className='profileCons'>
                    <div className='profileColor'>
                        <div className='introduction'>customise text & background colors for the profile</div>
                        <div className='colorBackPick'>
                            <input type='color' id='colorBack' name='colorBack'
                                value={profileColor.back} onChange={(e) => setProfileColor({ ...profileColor, back: e.target.value })} />
                            <label htmlFor='colorBack'>Background</label>
                        </div>
                        <div className='colorTextPick'>
                            <input type='color' id='colorText' name='colorText'
                                value={profileColor.text} onChange={(e) => setProfileColor({ ...profileColor, text: e.target.value })} />
                            <label htmlFor='colorText'>Text</label>
                        </div>
                    </div>
                    <div className='introduction'>...or upload an image from your device for the profile</div>
                    <UploadButton reduxAct={onChangeProfile} keyWord={'profilePic'} type={type} imgUrl={'url'} backurl={backurl} onInitializeProfilePic={onInitializeProfilePic} />
                </div> 
            </ProfilePicBlock>
            )}
            <form onSubmit={onSubmit}>
                <div className={`labelInputOuter${type}`}>
                    <div className={`labelInputInner${type}`}>
                        <StyledInput
                            className='styledinput'
                            autoComplete='username'
                            name='username'
                            placeholder='e-mail'
                            onChange={onChange}
                            value={form.username}
                        />
                        <StyledLabel className='styledlabel'>e-mail</StyledLabel>
                    </div>
                    {type === 'register' && (
                    <div className={`labelInputInner${type}`}>
                        <StyledInput
                            className='styledinput'
                            name='nickname'
                            placeholder='nickname'
                            onChange={onChange}
                            value={form.nickname}
                        />
                        <StyledLabel className='styledlabel'>nickname</StyledLabel>
                    </div>  
                    )}
                </div>
                <div className={`labelInputOuter${type}`}>
                    <div className={`labelInputInner${type}`}>
                        <StyledInput
                            className='styledinput'
                            autoComplete='new-password'
                            name='password'
                            placeholder='password'
                            type='password'
                            onChange={onChange}
                            value={form.password}
                        />
                        <StyledLabel className='styledlabel'>password</StyledLabel>
                    </div>
                    {type === 'register' && (
                    <div className={`labelInputInner${type}`}>
                        <StyledInput
                            className='styledinput'
                            autoComplete='new-password'
                            name='passwordConfirm'
                            placeholder='password confirm'
                            type='password'
                            onChange={onChange}
                            value={form.passwordConfirm}
                        />
                        <StyledLabel className='styledlabel'>password Confirm</StyledLabel>
                    </div>
                    )}
                </div>
                {type === 'register' && (
                    <div className='labelTextareaInnter'>
                        <StyledTextBox
                            className='styledinput'
                            name='sentence'
                            placeholder='describe yourself in a sentence...'
                            onChange={onChange}
                            value={form.sentence}
                        />
                        <StyledLabel className='styledlabel'>who are you?</StyledLabel>
                    </div>
                )}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ButtonWithMarginTop cyan fullWidth onClick={onChangeColor}>{type}</ButtonWithMarginTop>
            </form>
            <Footer>
                    <span className='switch' onClick={onSwitchType}>
                        {(type === 'login' ? 'Register' : 'Log in')}
                    </span>
            </Footer>
        </AuthFormBlock>
    )
}

export default AuthForm;

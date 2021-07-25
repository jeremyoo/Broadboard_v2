import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import WritePostButtonsContainer from '../../containers/writePost/WritePostButtonsContainer';
import PreviewContainer from '../../containers/writePost/PreviewContainer';

const ConfirmPopUpBlock = styled.div`
    pointer-events: auto;
    position: absolute;
    width: 100%; height: 100%; z-index: 10; background: var(--navy-shadow);
    top: 0;
    left: 0;
`;

const ConfirmPopUp = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    background: var(--brightest-white);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.65);
    width: 768px;
    ${props => props.elementHeight && props.elementWidth && css`
        top: ${props.documentHeight - props.elementHeight/2}px;
        left: ${props.documentWidth - props.elementWidth/2}px;
    `}
    .previewContainer {
        width: 50%;
        padding: 3rem 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .previewContent {
        width: 50%;
        padding: 3rem 2rem;
        background: var(--lightest-navy);
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const PreviewContent = styled.div`
    width: 15rem;
    display: flex;
    flex-direction: column;
    color: var(--white);
    img {
        width: 95%;
        border-radius: 0.5rem;
        cursor: pointer;
    }
`;

const Confirm = ({ onChangePost, onChangeConfirm, confirmOn }) => {
    const [ elementWidth, setElementWidth ] = useState(null);
    const [ elementHeight, setElementHeight ] = useState(null);

    const documentWidth = document.documentElement.clientWidth / 2;
    const documentHeight = document.documentElement.clientHeight / 2;

    useEffect(() => {
        if (confirmOn === true) {
            const confirmPopUp = document.getElementById("confirmPopUp");
            setElementWidth(confirmPopUp.clientWidth);
            setElementHeight(confirmPopUp.clientHeight);
        }
    }, [confirmOn])

  return ( 
    <ConfirmPopUpBlock confirmOn={confirmOn}>
        <ConfirmPopUp
        id="confirmPopUp"
        documentWidth={documentWidth}
        documentHeight={documentHeight}
        elementWidth={elementWidth}
        elementHeight={elementHeight}>
            <div className="previewContainer">
                <PreviewContainer  onChangePost={onChangePost} smalleritem={1} preview={1} />
            </div>
            <div className="previewContent">
                <PreviewContent>
                    <div>Preview</div>
                    <div>Upload your desired banner image and check the preview of your board</div>
                    <a href="https://jeremyoo.github.io/DynamicBanner/" target="_blank"><img src="https://i.ibb.co/VH2Dky7/Dynamic-banner.png" alt="Dynamic-banner" border="0" /></a>
                    <WritePostButtonsContainer onChangeConfirm={onChangeConfirm} />
                </PreviewContent>
            </div>
        </ConfirmPopUp>
    </ConfirmPopUpBlock>
  );
};

export default Confirm;
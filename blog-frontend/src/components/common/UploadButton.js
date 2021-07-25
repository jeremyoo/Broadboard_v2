import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button'
import { uploadImage } from '../../lib/uploadImage';
import { CgProfile } from "react-icons/cg";

const ButtonBlock = styled.div`
    .uploadText {
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    label {
        cursor: pointer;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #uploadAction {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
    .icon {
        margin-right: 0.2rem;
    }
`;

const UploadButton = ({ reduxAct, keyWord, type, imgUrl, backurl, onInitializeProfilePic }) => {

    return (
        <>
            <ButtonBlock>
                {backurl === undefined &&
                <>
                    <Button className='uploadText' cyan icon><label htmlFor='uploadAction'><CgProfile className='icon' size="25" />Upload</label></Button>
                    <input type='file' id='uploadAction' accept='image/*' onChange={() => uploadImage(reduxAct, keyWord, type, imgUrl)} />
                </>
                }
                {backurl !== undefined &&
                    <Button className='uploadText' icon onClick={onInitializeProfilePic}><label htmlFor='uploadAction'>Cancel</label></Button>
                }
            </ButtonBlock>

        </>
    )
}

export default UploadButton;
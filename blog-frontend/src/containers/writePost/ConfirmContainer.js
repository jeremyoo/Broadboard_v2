import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Confirm from '../../components/writePost/Confirm';

const ConfirmContainer = ({ onChangePost, onChangeConfirm, confirmOn }) => {

  return ( 
    <>
        <Confirm onChangePost={onChangePost} onChangeConfirm={onChangeConfirm} confirmOn={confirmOn} />
    </>
  )
};

export default ConfirmContainer;

import React from 'react'

import _checkmark from '../images/Checkmark.svg';
import _cross from '../images/Close_Icon.svg';

import './LMDialog.css'


const LMDialog = ({ onSuccess, onClose, style, children }) => {

  const checkmark = (
    <img
      id='dialog-checkmark'
      alt=''
      src={_checkmark}
      onClick={onSuccess} />
  )

  const cross = (
    <img id='dialog-cross'
         src={_cross}
         alt=''
         onClick={onClose} />
  )

  return (
    <div
      id='dialog-container'
      style={style}>
      {children}
      <div id='dialog-footer'>
        {cross}
        {onSuccess && checkmark}
      </div>
    </div>
  )
}

export default LMDialog

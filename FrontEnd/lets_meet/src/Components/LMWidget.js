import React from 'react'
import PropTypes from 'prop-types'
import Slider, { Range } from 'rc-slider'

import _checkmark from '../images/Checkmark.svg';
import _cross from '../images/Close_Icon.svg';

import './animation.css'

const _style = {
  position: 'relative',
  backgroundColor: "#73B2D3",
  borderRadius: 8
}

const _checkmarkStyle = {
  backgroundColor: "#fff",
  borderRadius: 15,
  position: 'absolute',
  padding: 5,
  width: 20,
  height: 20,
  right: 43,
  top: 8,
  cursor: 'pointer'
}

const _crossStyle = {
  backgroundColor: "#fff",
  borderRadius: 12,
  position: 'absolute',
  padding: 5,
  width: 14,
  height: 14,
  right: 10,
  top: 10,
  cursor: 'pointer'
}

const LMWidget = ({ onSuccess, onClose, style, children }) => (
  <div id="lm-widget" style={{..._style, ...style}}>
    { children }
    {onSuccess && (<img className='grow-on-hover'
                       src={_checkmark}
                        style={_checkmarkStyle}
                        onClick={onSuccess}/>) }
    <img src={_cross}
  className='grow-on-hover'
         style={_crossStyle}
         onClick={onClose} />
  </div>
)

export default LMWidget

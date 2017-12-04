import React from 'react'
import PropTypes from 'prop-types'

const _style = {
  height: 50,
  textAlign: 'center',
}

const _backButtonStyle = {
  marginLeft: 32,
  marginTop: 12,
  fontSize: 18,
  color: '#73A9C5',
  float: 'left',
  textAlign: 'left',
  cursor: 'pointer'
}

const _nextButtonStyle = {
  marginRight: 32,
  marginTop: 12,
  fontSize: 18,
  color: '#73A9C5',
  float: 'right',
  textAlign: 'right',
  cursor: 'pointer'
}

const _contentStyle = {
  display: 'inline',
  position: 'relative',
  fontSize: 27,
  fontWeight: 'medium',
  color: 'lightGray',
  top: 6
}

const NavigationBar = ({ style, backText, nextText, onBack, onNext, children }) => (
  <div style={{..._style, ...style}}>
    
    <div
      style={_backButtonStyle}
      onClick={onBack}>
      {backText}
    </div>

    <div style={_contentStyle}>
      {children}
    </div>

    <div
      style={_nextButtonStyle}
      onClick={onNext}>
      {nextText}
    </div>

  </div>
)

export default NavigationBar

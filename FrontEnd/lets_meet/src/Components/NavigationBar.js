import React from 'react'
import PropTypes from 'prop-types'

const style = {
  width: '100%',
  height: 50,
  textAlign: 'center',
}

const NavigationBar = ({ backText, nextText, onBack, onNext, children }) => (
  <div style={style}>
    
    <div
      style={{float: 'left', textAlign: 'left'}}
      onClick={onBack}>
      {backText}
    </div>

    <div style={{display: 'inline'}}>
      {children}
    </div>

    <div
      style={{float: 'right', textAlign: 'right'}}
      onClick={onNext}>
      {nextText}
    </div>

  </div>
)

NavigationBar.propTypes = {
}

export default NavigationBar

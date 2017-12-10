import React from 'react'
import FullScreen from 'react-fullscreen'

import { connect } from 'react-redux'

import { dismissPopup } from '../actions'

const _bgStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)'
}

const Popup = ({ body, dismiss }) => body && (
  <div style={_bgStyle} onClick={dismiss}>
    {body}
  </div>
) || null

const mapStateToProps = ({ popup }) => ({
  body: popup
})

const mapDispatchToProps = (dispatch) => ({
  dismiss: () => dispatch(dismissPopup())
})

export default connect(mapStateToProps, mapDispatchToProps)(Popup);

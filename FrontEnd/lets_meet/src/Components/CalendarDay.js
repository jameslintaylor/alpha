import React from 'react'

import './common.css'
import './animation.css'

const _style = {
  float: 'left',
  width: 50,
  height: 50,
  borderRadius: 4,
  color: 'white',
  cursor: 'pointer',
  backgroundColor: '#C0E2F4'
}

const _styleSelected = {
  ..._style,
  backgroundColor: '#73B2D3'
}

const _styleDisabled = {
  ..._style,
  backgroundColor: 'lightGray',
  cursor: 'default'
}

const CalendarDay = ({ onClick, disabled, hasSelection, day }) => (
  <div
    className={(!disabled && 'grow-on-hover') || ''}
    onClick={ onClick }
    style={(disabled && _styleDisabled) ||
           (hasSelection && _styleSelected) ||
           _style}>
    <div style={{margin: 3, fontSize: 18}}>
      {day}
    </div>
  </div>
)

export default CalendarDay

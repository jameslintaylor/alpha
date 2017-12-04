import React from 'react'
import PropTypes from 'prop-types'

const _style = {
  float: 'left',
  width: 50,
  height: 50,
  borderRadius: 4,
  color: 'white',
}

const colorSelected = '#73B2D3'
const colorDefault = '#C0E2F4'

const CalendarDay = ({ onClick, hasSelection, day }) => (
  <div
    onClick={ onClick }
    style={{ ..._style, backgroundColor: hasSelection ? colorSelected : colorDefault }}>
    {day}
  </div>
)

CalendarDay.propTypes = {
  onClick: PropTypes.func.isRequired,
  hasSelection: PropTypes.bool.isRequired,
  day: PropTypes.number.isRequired
}

export default CalendarDay

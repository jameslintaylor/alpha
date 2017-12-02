import React from 'react'
import PropTypes from 'prop-types'

const style = {
  float: 'left',
  width: 50,
  height: 50,
  borderRadius: 4,
  color: 'white',
}

const colorSelected = 'hsla(200, 80%, 40%, 1)'
const colorDefault = 'hsla(200, 70%, 70%, 1)'

const CalendarDay = ({ onClick, hasSelection, day }) => (
  <div
    onClick={ onClick }
    style={{ ...style, backgroundColor: hasSelection ? colorSelected : colorDefault }}>
    {day}
  </div>
)

CalendarDay.propTypes = {
  onClick: PropTypes.func.isRequired,
  hasSelection: PropTypes.bool.isRequired,
  day: PropTypes.number.isRequired
}

export default CalendarDay

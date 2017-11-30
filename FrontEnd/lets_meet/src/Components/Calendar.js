import React from 'react'
import PropTypes from 'prop-types'
import CalendarDay from './CalendarDay'

const style = {
  width: "100%",
  display: 'grid',
  gridTemplateColumns: "50px 50px 50px 50px 50px 50px 50px",
  gridGap: 10
}

const inc = (x) => x + 1

const Calendar = ({ numDays, onDayClick }) => (
  <div style={{ ...style }} >
    {[...Array(numDays).keys()]
      .map(inc)
      .map((day) => (
        <CalendarDay
          day={day}
          hasSelection={false}
          onClick={() => onDayClick(day)}/>
      ))}
  </div>
)

export default Calendar

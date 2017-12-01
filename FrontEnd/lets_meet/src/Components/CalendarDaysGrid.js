import React from 'react'
import PropTypes from 'prop-types'
import CalendarDay from './CalendarDay'

const style = {
  display: 'grid',
  gridTemplateColumns: "50px 50px 50px 50px 50px 50px 50px",
  gridGap: 10,
}

const inc = (x) => x + 1

const CalendarDaysGrid = ({ numDays, dayOffset, onDayClick }) => {

  const daysLastMonth = [...Array(dayOffset).keys()]
        .map((_) => (
          <CalendarDay
            day={null}
            hasSelection={true}
            onClick={null}
            />
        ))

  const days = [...Array(numDays).keys()]
        .map(inc)
        .map((day) => (
          <CalendarDay
            day={day}
            hasSelection={false}
            onClick={() => onDayClick(day)}/>
        ))

  return (
    <div style={{ ...style }} >
      { daysLastMonth.concat(days) }
    </div>
  )
}

CalendarDaysGrid.propTypes = {
  numDays: PropTypes.number.isRequired,
  dayOffset: PropTypes.number.isRequired,
  onDayClick: PropTypes.func.isRequired
}

export default CalendarDaysGrid

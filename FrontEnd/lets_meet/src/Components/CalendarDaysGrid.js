import React from 'react'
import PropTypes from 'prop-types'
import CalendarDay from './CalendarDay'

const _style = {
  display: 'grid',
  gridTemplateColumns: "50px 50px 50px 50px 50px 50px 50px",
  gridGap: 10,
  marginTop: -10,
  marginLeft: 36
}

const inc = (x) => x + 1

const CalendarDaysGrid = ({ days, dayOffset, onDayClick }) => {

  const lastMonthDays = [...Array(dayOffset).keys()]
        .map((_) => (
          <CalendarDay
            day={null}
            disabled={true}
            onClick={null}
            />
        ))

  const thisMonthDays = days.map(({ day, selected }) => (
    <CalendarDay
      day={day}
      hasSelection={selected}
      onClick={() => onDayClick(day)}/>
  ))

  // just gonna pad the 
  const nextMonthDays = [...Array(42 - dayOffset - days.length).keys()]
        .map((_) => (
          <CalendarDay
            day={null}
            disabled={true}
            onClick={null}
            />
        ))

  return (
    <div style={_style} >
      { [ ...lastMonthDays,
          ...thisMonthDays,
          ...nextMonthDays ] }
    </div>
  )
}

CalendarDaysGrid.propTypes = {
  numDays: PropTypes.number.isRequired,
  dayOffset: PropTypes.number.isRequired,
  onDayClick: PropTypes.func.isRequired
}

export default CalendarDaysGrid

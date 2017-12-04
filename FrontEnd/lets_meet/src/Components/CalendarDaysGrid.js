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

  const disabled = [...Array(dayOffset).keys()]
        .map((_) => (
          <CalendarDay
            day={null}
            disabled={true}
            onClick={null}
            />
        ))

  const active = days.map(({ day, selected }) => (
    <CalendarDay
      day={day}
      hasSelection={selected}
      onClick={() => onDayClick(day)}/>
  ))

  return (
    <div style={_style} >
      { [ ...disabled, ...active ] }
    </div>
  )
}

CalendarDaysGrid.propTypes = {
  numDays: PropTypes.number.isRequired,
  dayOffset: PropTypes.number.isRequired,
  onDayClick: PropTypes.func.isRequired
}

export default CalendarDaysGrid

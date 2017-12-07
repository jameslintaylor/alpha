import React from 'react'
import CalendarDay from './CalendarDay'

const _style = {
  display: 'grid',
  gridTemplateColumns: "50px 50px 50px 50px 50px 50px 50px",
  gridGap: 10,
  marginTop: -10,
  marginLeft: 36
}

const CalendarDaysGrid = ({ days, dayOffset, onDayClick }) => {

  const lastMonthDays = [...Array(dayOffset).keys()]
        .map((day) => (
          <CalendarDay
            day={null}
            disabled={true}
            onClick={null}
            key={`l${day}`}
            />
        ))

  const thisMonthDays = days.map(({ day, selected }) => (
    <CalendarDay
      day={day}
      hasSelection={selected}
      onClick={() => onDayClick(day)}
      key={`${day}`}
      />
  ))

  // just gonna pad the 
  const nextMonthDays = [...Array(42 - dayOffset - days.length).keys()]
        .map((day) => (
          <CalendarDay
            day={null}
            disabled={true}
            onClick={null}
            key={`n${day}`}
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

export default CalendarDaysGrid

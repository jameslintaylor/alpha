import React from 'react'
import Date from './Date'

const _style = {
  backgroundColor: "#fff",
  border: "4px solid #73A9C5",
  height: '100%',
  overflowY: 'auto',
}

const DateList = ({ dates, onDateRemove }) => (
  <div style={_style}>
    {dates.map((date) => (
      <Date key={date.id} {...date} onClick={() => onDateRemove(date.id)} />
    ))}
  </div>
)

export default (DateList)

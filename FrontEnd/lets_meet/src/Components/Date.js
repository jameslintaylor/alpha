import React from 'react'

import LMWidget from './LMWidget'

import {abbrevForMonth } from './date-utils'

import './common.css'

const _style = {
  position: 'relative',
  margin: 10,
  height: 70
}

const _dayStyle = {
  color: 'white',
  fontSize: 22,
  fontWeight: 'medium',
  position: 'absolute',
  left: 10,
  top: 10
}

const _timeStyle = {
  color: 'white',
  fontSize: 18,
  position: 'absolute',
  left: 10,
  bottom: 6
}

const pad = (x) => String("0" + x).slice(-2)

const Date = ({ start, end, onClick }) => {

  let day = start.getDate()
  let month = start.getMonth() + 1

  let startHours = pad(start.getHours())
  let startMinutes = pad(start.getMinutes())

  let endHours = pad(end.getHours())
  let endMinutes = pad(end.getMinutes())

  let timeString = `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`

  return (
    <LMWidget style={_style}
              onClose={onClick}>

      <div style={_dayStyle}>
        {abbrevForMonth(month)} {day}
      </div>

      <div style={_timeStyle}>
        {timeString}
      </div>

    </LMWidget>
  )
}


export default Date

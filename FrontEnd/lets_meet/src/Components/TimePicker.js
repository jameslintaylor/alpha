import React from 'react'
import PropTypes from 'prop-types'
import Slider, { Range } from 'rc-slider'
import TimeSlider from './TimeSlider'

const _style = {
  backgroundColor: "#fff",
  border: "4px solid #73A9C5",
  height: '100%'
}

const _labelStyle = {
  width: '100%',
  textAlign: 'center',
  fontFamily: 'Helvetica',
  fontSize: 40,
  color: 'lightGray',
  paddingTop: 10
}

const _sliderStyle = {
  margin: 10
}

const TimePicker = ({ day, month, year, onPicked, onCancel }) => {

  const makeDate = (minutes) => {
    let h = Math.floor(minutes / 60)
    let m = minutes % 60
    console.log(h, m)
    return new Date(year, month, day, h, m)
  }
  
  return (
    <div style={_style}>
      <div style={_labelStyle}> {day} {month} </div>
      <TimeSlider
        onContinue={ (start, end) => onPicked(makeDate(start), makeDate(end)) }
        onCancel={onCancel}
        style={_sliderStyle} />
    </div>
  )
}

export default TimePicker

import React from 'react'
import PropTypes from 'prop-types'
import Slider, { Range } from 'rc-slider'
import LMWidget from './LMWidget'

import 'rc-slider/assets/index.css'
import './TimeSlider.css'

const _style = {
  position: 'relative'
}

const _labelStyle = {
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  bottom: 0
}

const TimeSlider = ({ style, onContinue, onCancel }) => {

  const max = 1440

  // initial values
  var start = 600
  var end = 1000
  const onChanged = (values) => {
    start = values[0]
    end = values[1]
  }

  return (
    <div style={{..._style, ...style}}>
      <LMWidget onSuccess={() => onContinue(start, end)}
                onClose={onCancel}
                style={{height: 280, position: 'relative'}}>

        {/* 30 minute intervals, (* 24 300) minutes in a day */}
        <Range style={{position: 'absolute', left: '2%', top: 40, width: '96%'}}
               step={30}
               max={max}
               defaultValue={[start, end]}/>

        <div style={_labelStyle}> abc </div>
      </LMWidget>
    </div>
  )
}

export default TimeSlider

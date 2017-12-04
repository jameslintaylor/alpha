import React from 'react'
import PropTypes from 'prop-types'
import Slider, { Range } from 'rc-slider'
import LMWidget from './LMWidget'

import 'rc-slider/assets/index.css'
import './TimeSlider.css'

const _style = {
  position: 'relative'
}

const _rangeStyle = {
  position: 'absolute',
  left: '2%',
  top: 40,
  width: '96%'
}

const _labelStyle = {
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  bottom: 0,
  fontFamily: 'Helvetica',
  fontSize: 32,
  color: 'white',
}

// oh boy repeating logic everywhere where it shouldn't!
const toHoursMinutes = (value) => {
  return [Math.floor(value / 60), value % 60]
}

const toHoursMinutesString = (value) => {
  let hm = toHoursMinutes(value)
  let h = String("0" + hm[0]).slice(-2)
  let m = String("0" + hm[1]).slice(-2)
  return `${h}:${m}`
}

class TimeSlider extends React.Component {

  componentWillMount() {
    // idc anymore
    this.setState({
      start: 600,
      end: 1000
    })
  }

  labelString() {
    return `${toHoursMinutesString(this.state.start)}-${toHoursMinutesString(this.state.end)}`
  }
  
  render() {

    const max = 1440

    // initial values
    const onChange = (values) => {
      this.setState({
        start: values[0],
        end: values[1]
      })
    }
    
    return (
      <div style={{..._style, ...this.props.style}}>
        <LMWidget onSuccess={() => this.props.onContinue(this.state.start, this.state.end)}
          onClose={this.props.onCancel}
          style={{height: 280, position: 'relative'}}>

          {/* 30 minute intervals, (* 24 300) minutes in a day */}
          <Range style={_rangeStyle}
                 step={30}
                 max={max}
                 defaultValue={[this.state.start, this.state.end]}
                 onChange={onChange}/>

          <div style={_labelStyle}> {this.labelString.bind(this)()} </div>
        </LMWidget>
      </div>
    )
  }
}

export default TimeSlider

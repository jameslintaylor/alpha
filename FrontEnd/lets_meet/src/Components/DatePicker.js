import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Calendar from './Calendar'
import DateList from './DateList'
import TimePicker from './TimePicker'

import { addDate, removeDate } from '../actions'

import './DatePicker.css';

const _style = {
  position: 'relative',
  backgroundColor: 'green',
  width: 700,
  height: 400
}

const _dateListStyle = {
  position: 'absolute',
  left: 0,
  width: 220,
  height: '100%',
  backgroundColor: 'red'
}

const _calendarStyle = {
  position: 'absolute',
  left: 216,
  right: 0,
  height: '100%',
  margin: '0 auto',
  backgroundColor: 'purple'
  // right: 0,
  // height: '100%',
}

const _timePickerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
}

// more classes much state much sketchy code wow!
class DatePicker extends React.Component {

  componentWillMount() {
    this.setState({pickingTime: false})
  }
  
  showTimePicker(day, month, year) {
    this.setState({
      pickingTime: true,
      selectedDay: day,
      selectedMonth: month,
      selectedYear: year
    })
  }

  dismissTimePicker() {
    console.log('hello')
    this.setState({
      pickingTime: false,
      selectedDay: null,
      selectedMonth: null,
      selectedYear: null
    })
  }

  render() {
    return (
      <div style={_style}>

        <div style={_dateListStyle}>
          <DateList dates={this.props.dates}
                    onDateRemove={this.props.onDateRemove}/>
        </div>

        <div style={_calendarStyle}>
          <Calendar onDayClick={this.showTimePicker.bind(this)} />
        </div>

        {/* idk what I'm doing btw */}
        {this.state.pickingTime &&
          <div style={_timePickerStyle}>
              <TimePicker
                  day={this.state.selectedDay}
                  month={this.state.selectedMonth - 1}
                  year={this.state.selectedYear}
                  onPicked={ (start, end) => { this.props.onDateAdd(start, end); this.dismissTimePicker.bind(this)() }}
                  onCancel={this.dismissTimePicker.bind(this)}/>
            </div>
        }

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dates: state.dates
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDateAdd: (start, end) => dispatch(addDate(start, end)),
    onDateRemove: (id) => dispatch(removeDate(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker)

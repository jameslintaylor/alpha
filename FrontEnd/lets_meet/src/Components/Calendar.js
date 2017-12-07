import React from 'react'
import CalendarDaysGrid from './CalendarDaysGrid'
import NavigationBar from './NavigationBar'

import { connect } from 'react-redux'

import { numDaysInMonth,
         dayOffsetInMonth,
         nameForMonth,
         abbrevForMonth} from './date-utils'

import "./common.css"

const _style = {
  width: '100%',
  height: '100%',
  backgroundColor: "#fff",
  border: "4px solid #73A9C5",
}

// negative friendly modulo
Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}

// This calendar will hold it's own presentation state (month/year)
class Calendar extends React.Component {

  constructor(props) {
    super(props)
    this.nextMonth.bind(this)
    this.backMonth.bind(this)
    // month and year can be passed optionally as props, otherwise
    // will default to the current month/year.
    let now = new Date()
    this.state = Object.assign({
      month: now.getMonth(),
      year: now.getFullYear()
    }, props)
  }

  nextMonth() {
    switch (this.state.month) {
    case 12:
      this.setState({month: 1, year: this.state.year + 1})
      return
    default:
      this.setState({month: this.state.month + 1})
    }
  }
  
  backMonth() {
    switch (this.state.month) {
    case 1:
      this.setState({month: 12, year: this.state.year - 1})
      return
    default:
      this.setState({month: this.state.month - 1})
    }
  }

  _isSelected(day, month, year) {
    let key = `${day}-${month}-${year}`
    return this.props.selectedDayLookup[key]
  }
  
  render() {

    const days = [...Array(numDaysInMonth(this.state.month, this.state.year)).keys()]
          .map(x => x + 1)
          .map(day => ({
            day,
            month: this.state.month,
            year: this.state.year,
            selected: this._isSelected.bind(this)(day, this.state.month, this.state.year)
          }))

    return (
      <div style={_style}>

        <NavigationBar
          backText={abbrevForMonth(this.state.month - 1)}
          nextText={abbrevForMonth(this.state.month + 1)}
          onBack={() => this.backMonth()}
          onNext={() => this.nextMonth()}>
          { nameForMonth(this.state.month) } { this.state.year } 
        </NavigationBar>

        <CalendarDaysGrid
          days={days}
          dayOffset={dayOffsetInMonth(this.state.month, this.state.year)}
          selectedDates={this.props.selectedDates}
          onDayClick={ (day) => this.props.onDayClick(day, this.state.month, this.state.year)}/>
        
      </div>
    )
  }
}

const toDayLookup = (dates) => dates.reduce((a, { start }) => {
  let copy = Object.assign({}, a)
  let day = start.getDate()
  let month = start.getMonth() + 1
  let year = start.getFullYear()
  let key = `${day}-${month}-${year}`
  copy[key] = true
  return copy
}, {})

const mapStateToProps = (state) => ({
  selectedDayLookup: toDayLookup(state.dates)
})

export default connect(mapStateToProps)(Calendar)

import React from 'react'
import PropTypes from 'prop-types'
import CalendarDaysGrid from './CalendarDaysGrid'
import NavigationBar from './NavigationBar'

import { connect } from 'react-redux'
import { addDate } from '../actions'

const style = {
  padding: 10,
  width: 410,
  backgroundColor: 'white',
  overflow: 'hidden'
}

// negative friendly modulo
Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthAbbrevs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const numDaysInMonth = (month, year) => (new Date(year, month, 0)).getDate()
const dayOffsetInMonth = (month, year) => (new Date(year, month - 1, 1)).getDay()
const nameForMonth = (month) => monthNames[(month - 1).mod(12)]
const abbrevForMonth = (month) => monthAbbrevs[(month - 1).mod(12)]

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

  render() {

    const addDay = (day) =>
          this.props.dispatch(addDate(day, this.state.month, this.state.year))
    
    return (
      <div style={style}>

        <NavigationBar
          backText={abbrevForMonth(this.state.month - 1)}
          nextText={abbrevForMonth(this.state.month + 1)}
          onBack={() => this.backMonth()}
          onNext={() => this.nextMonth()}>
          { nameForMonth(this.state.month) } { this.state.year } 
        </NavigationBar>

        <CalendarDaysGrid
          numDays={numDaysInMonth(this.state.month, this.state.year)}
          dayOffset={dayOffsetInMonth(this.state.month, this.state.year)}
          onDayClick={addDay}/>
          
      </div>
    )
  }
}

Calendar.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number
}

Calendar = connect()(Calendar)

export default Calendar

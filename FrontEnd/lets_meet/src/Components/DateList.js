import React from 'react'
import PropTypes from 'prop-types'
import Date from './Date'

import { addDate } from '../actions'

import { connect } from 'react-redux'

const DateList = ({ dates, onDateClick }) => {
  console.log(dates)
  return (<ul>
    {dates.map((date) => (
      <Date key={date.id} {...date} onClick={() => onDateClick(date.id)} />
    ))}
   </ul>)
}

const mapStateToProps = state => {
  return {
    dates: state.dates
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDateClick: dispatch(addDate(0, 0, 0))
  }
}

export default connect(mapStateToProps)(DateList)

import React from 'react'
import PropTypes from 'prop-types'
import Date from './Date'

import { removeDate } from '../actions'

import { connect } from 'react-redux'

const _style = {
  backgroundColor: "#fff",
  border: "4px solid #73A9C5",
  height: '100%'
}

const DateList = ({ dates, onDateRemove }) => (
  <div style={_style}>
    {dates.map((date) => (
      <Date key={date.id} {...date} onClick={() => onDateRemove(date.id)} />
    ))}
  </div>
)

export default (DateList)

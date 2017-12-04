import React from 'react'
import PropTypes from 'prop-types'

import LMWidget from './LMWidget'

const _style = {
  margin: 10,
  height: 70,
}

const Date = ({ start, end, onClick }) => {

  let day = start.getDate()
  let month = start.getMonth()

  return (
    <LMWidget style={_style}
              onClose={onClick}>
      
      {day}/{month}
    </LMWidget>
  )
}


export default Date

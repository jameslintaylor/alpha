import React from 'react';
import PropTypes from 'prop-types';

import Calendar from './Calendar'
import DateList from './DateList'

import './DatePicker.css';

const DatePicker = ({ onDateAdd, onDateDelete, }) => (
  <div style={{backgroundColor: 'green', overflow: 'hidden'}}>
    
    <div style={{float: 'left', width: 180, height: 360, backgroundColor: 'lightGray'}}>
      <DateList />
    </div>

    <div>
      <Calendar />
    </div>
    
  </div>
)

export default DatePicker;

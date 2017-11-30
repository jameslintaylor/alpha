import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './DatePicker.css';

class DatePicker extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.setState({
      month: 0
    });
  }

  render(){
    return (
      <div> the coolest </div>
    )
  }
}

export default DatePicker;

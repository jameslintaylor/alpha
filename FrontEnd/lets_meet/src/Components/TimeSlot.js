import React from 'react';
import classname from 'classnames';

import './TimeSlot.css';

import { abbrevForMonth } from './date-utils'

const pad = (x) => String("0" + x).slice(-2)

class TimeSlot extends React.Component {

  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount(){
    this.setState({
      toggled: false
    });
  }

  toggle(){
    if(this.props.onToggle){
      this.setState({
        toggled:!this.state.toggled
      });
      this.props.onToggle(this.props.index,!this.state.toggled);
    }
  }

  render(){
    const cname = classname("timeslot",{
      "selected":this.state.toggled
    });

    // you'd think there would be a way to get a formatted string from
    // a date object but my googling skills are lacking
    let startHours = pad(this.props.start.getHours())
    let startMinutes = pad(this.props.start.getMinutes())

    let endHours = pad(this.props.end.getHours())
    let endMinutes = pad(this.props.end.getMinutes())

    return (
      <div className={cname} onClick={this.toggle}>
        <div className="day">
          {abbrevForMonth(this.props.start.getMonth())} {this.props.start.getDate()}
        </div>
        <div className="times">
          <div className="label">from</div>
          <div>{startHours}:{startMinutes}</div>
          <div className="label">to</div>
          <div>{endHours}:{endMinutes}</div>
        </div>
      </div>
    )
  }
}

export default TimeSlot;

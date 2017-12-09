import React from 'react';
import classname from 'classnames';

import './TimeSlot.css';

class TimeSlot extends React.Component{

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
			return (
				<div className={cname} onClick={this.toggle}>
					<div className="day">Sep 30</div>
					<div className="times">
						<div className="label">from</div>
						<div>10:30 AM</div>
						<div className="label">to</div>
						<div>11:30 AM</div>
					</div>
				</div>
			)
		}
}

export default TimeSlot;
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import FormInputText from '../Components/FormInputText';

import Logo from '../images/Logo.svg';
import ProgressArrow from '../images/Progress_Arrow.svg';
import './Event.css';

class EventManagement extends React.Component{
	render(){
		const rsvp = ()=>{
			this.props.push(this.props.location.pathname + "/rsvp")
		};

		return (
			<div className="page" id="event-management">
				<a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
				<div className="content">
					<h1>{this.props.match.params.code}</h1>
					<div className="padded-top">
					<button onClick={rsvp}>RSVP</button><br/>
					<button>view results</button><br/>
					<button>edit event</button><br/>
					</div>
				</div>				
			</div>
		)		
	}
}

export default connect(null,{push})(EventManagement);
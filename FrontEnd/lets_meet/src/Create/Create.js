import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import ProgressIndicator, {Actions as PIActions} from '../Components/ProgressIndicator.js';
import SectionPager from '../Components/SectionPager';
import Section1 from './Section1.js';
import Section2 from './Section2';
import Section3 from './Section3';
import {Actions as EventActions} from './reducers';

import Logo from '../images/Logo.svg';
import './Create.css';

class Create extends React.Component{	

	constructor(props){
		super(props);
		this.createNewEvent = this.createNewEvent.bind(this);
		this.updateEvent = this.updateEvent.bind(this);
	}

	componentWillMount(){
		this.props.createEventID();
		this.props.restartProgress();
	}

	createNewEvent(){		
		axios({
			url: "http://127.0.0.1:5000/event/",
			method: "post",
			contentType: 'application/json',
			data: {
				id: this.props.event.id,
				name: this.props.event.meetingName,
				owner:this.props.event.creatorEmail,
				timeslots: this.props.event.timeslots,
				invitees: this.props.event.invitees										
			}
		})
		.then((response) =>{
			console.log(response);
		})
		.catch((error)=>{
			console.error(error);
		})
	}

	updateEvent(){
		axios({
			url: "http://127.0.0.1:5000/event/",
			method: "put",
			contentType: 'application/json',
			data: {
				id: this.props.event.id,
				name: this.props.event.meetingName,
				owner:this.props.event.creatorEmail,
				timeslots: this.props.event.timeslots,
				invitees: this.props.event.invitees										
			}
		})
		.then((response) =>{
			console.log(response);
		})
		.catch((error)=>{
			console.error(error);
		})
	}

	render(){

		return (
			<div className="page" id="create">
				<a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
				<h1 id="process-title">Create Event</h1>
				<ProgressIndicator count={3}/>
				<div className="content">
					<SectionPager>		
						<Section1/>
						<Section2/>
						<Section3 createNewEvent={this.createNewEvent}/>					
					</SectionPager>
				</div>				
			</div>
		)
	}
}

const mstp = state =>({
	currentStage: state.progressIndicator.index,
	event: {
			...state.createEvent,
			timeslots: state.dates
		}
});

const fstp = {
	nextStage: PIActions.Incr_Indicator, 
	restartProgress: PIActions.Reset_Indicator,
	createEventID:EventActions.createId
}

export default connect(mstp,fstp)(Create);
import React from 'react';
import {connect} from 'react-redux';

import FormInputText from '../Components/FormInputText';
import {Actions} from './reducers';

import ProgressArrow from '../images/Progress_Arrow.svg';

class Section1 extends React.Component{

	constructor(props){
		super(props);
		this.continue = this.continue.bind(this);
	}

	continue(){				
		if(this.props.currentSection === 2)return;
		switch(this.props.currentSection){
			case 0:
			if(	this.props.eventName != null && 
				this.props.eventName.length > 0){									
				this.props.nextSection();
			}
			break;
			default:
			return;
		}		
	}

	render(){

		return (
			<div>
				<FormInputText prompt="Event Name" width="20%"
						 onChange={(text)=>this.props.setMeetingName(text)} 
						 onDone={this.continue}/>
					<img onClick={this.continue} alt="continue" style={{paddingTop:"20px"}} src={ProgressArrow} className="continue" />					
			</div>
		)
	}

}

const mstp = state =>({
	eventName: state.createEvent.meetingName
})

export default connect(mstp,{setMeetingName:Actions.setMeetingName})(Section1);
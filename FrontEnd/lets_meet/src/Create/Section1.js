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

	componentWillMount(){
		this.setState({
			error: ""
		});
	}

	continue(){				
		if(this.props.currentSection === 2)return;
		switch(this.props.currentSection){
			case 0:
				if(	this.props.eventName != null && 
					this.props.eventName.length > 0){									
					if(this.state.error !== ""){
						this.setState({
							error: ""
						});
					}
					this.props.nextSection();
				}else{
					this.setState({
						error: "Please provide an event name"
					});
				}	
			break;
			default:
			return;
		}		
	}

	render(){

		return (
			<div>			
				<h2>Enter Event Name</h2>
				<label style={{color:"red"}}>{this.state.error}</label><br/>			
				<FormInputText prompt="Event Name" width="20%"
						 onChange={(text)=>this.props.setMeetingName(text)} 
						 onDone={this.continue}/>
					<button onClick={this.continue}  style={{marginTop:"20px",transform:"translateY(18px)"}}  className="arrow"><img alt="continue"src={ProgressArrow} className="continue" /></button>
			</div>
		)
	}

}

const mstp = state =>({
	eventName: state.createEvent.meetingName
})

export default connect(mstp,{setMeetingName:Actions.setMeetingName})(Section1);
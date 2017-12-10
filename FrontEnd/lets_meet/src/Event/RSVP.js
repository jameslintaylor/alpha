import React from 'react';
import {connect} from 'react-redux';

import SectionPager from '../Components/SectionPager';
import ProgressIndicator,{Actions} from '../Components/ProgressIndicator';
import FormInputText from '../Components/FormInputText';
import TimeSlot from '../Components/TimeSlot';
import BottomMenuBar from '../Components/BottomMenuBar';

import Logo from '../images/Logo.svg';
import ProgressArrow from '../images/Progress_Arrow.svg';
import './Event.css';

class RSVP extends React.Component{

	componentWillMount(){
		this.props.restartProgress();
	}

	render(){
		return (
			<div className="page" id="rsvp">
				<a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
				<h1 id="process-title">Event Name</h1>
				<ProgressIndicator count={2}/>
				<div className="content">
					<SectionPager>
						<Section1 {...this.props}/>
						<Section2 {...this.props}/>
						<Section3 {...this.props}/>
					</SectionPager>					
				</div>				
			</div>
		)
	}

}

class Section1 extends React.Component{
	componentWillMount(){
		this.setState({
			name: undefined
		})
	}

	render(){
		const submit = ()=>{
			if(this.state.name && this.state.name.trim().length > 0){
				this.props.nextSection();
			}
		};
		const change = (text)=>{this.setState({name:text})}

		return (
			<div>
				<h2>What's your name?</h2>
				<FormInputText prompt="Your Name" onChange={change} onDone={submit} />
				<button onClick={submit}  style={{marginTop:"20px",transform:"translateY(18px)"}}  className="arrow"><img alt="continue"src={ProgressArrow} className="continue" /></button>
			</div>
		)
	}
}

class Section2 extends React.Component{
	render(){
		const submit = ()=>{this.props.nextSection()};
		const back = ()=>{this.props.prevSection()};
		return (
			<div>
				<h2>When are you available, Name?</h2>
				<div id="timeslot-container">
					<TimeSlot index={1} onToggle={(x,y)=>{console.log(x+" "+y)}}/>					
				</div>
				<BottomMenuBar>					
				<button onClick={back}  style={{marginLeft:"60px",marginBottom:"20px",marginTop:"20px",transform:"translateY(18px)"}}  className="arrow"><img alt="back"src={ProgressArrow} className="back" /></button>					
					<button onClick={submit}  style={{marginRight:"60px",marginBottom:"20px",marginTop:"20px",transform:"translateY(18px)"}}  className="arrow"><img alt="continue"src={ProgressArrow} className="continue" /></button>					
				</BottomMenuBar>				
			</div>
		)
	}
}

class Section3 extends React.Component{
	render(){
		return (
			<div>
				<h1>Thank you!</h1>
				<label style={{fontWeight:"100",fontSize:"1.3em"}}>Your response has been recorded</label><br/><br/>
				<button className="padded">View Results</button>
			</div>
		)
	}
}

const fstp = {
	nextSection: Actions.Decr_Indicator,
	prevSection: Actions.Incr_Indicator,
	restartProgress: Actions.Reset_Indicator
}

export default connect(null,fstp)(RSVP);

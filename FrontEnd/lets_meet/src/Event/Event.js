import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import FormInputText from '../Components/FormInputText';

import Logo from '../images/Logo.svg';
import ProgressArrow from '../images/Progress_Arrow.svg';
import './Event.css';

class Event extends React.Component{

	constructor(props){
		super(props);
	}

	componentWillMount(){
	}

	render(){
		var content = <NoCode {...this.props}/>		
		return (
			<div className="page" id="event-page">
				<a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
				<div className="content">
					{content}
				</div>
			</div>
		)
	}

}

class NoCode extends React.Component{	

	componentWillMount(){
		this.setState({code:""})
	}

	render(){
		const submit = ()=>{
			if(this.state.code && this.state.code.length > 0){
				this.props.push("/event/"+this.state.code);
			}
		}

		const setCode = (text)=>{
			this.setState({code:text.trim()})
		};

		return (
			<div className="padded-top">
				<h2>Enter Invite code</h2>
				<label style={{fontWeight:"200"}}>Check your inbox or cellphone</label><br/>
				<FormInputText onChange={setCode} onDone={submit} prompt="Invite Code" />
				<button onClick={submit}  style={{marginTop:"20px",transform:"translateY(18px)"}}  className="arrow"><img alt="continue"src={ProgressArrow} className="continue" /></button>
			</div>
		)
	}
}


const mstp = state => ({	
});

export default connect(mstp,{push})(Event);
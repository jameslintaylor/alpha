import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import FormInputText from '../Components/FormInputText';
import BottomMenuBar from '../Components/BottomMenuBar';
import {Actions} from './reducers';

import QuestionButton from '../images/Question_Button.svg';
import ProgressArrow from '../images/Progress_Arrow.svg';
import PlusIcon from '../images/Plus_Icon.svg';
import CopyIcon from '../images/Copy.svg';

class Section3 extends React.Component{

	constructor(props){
		super(props);
		this.addInvitee = this.addInvitee.bind(this);
		this.back = this.back.bind(this);
		this.continue = this.continue.bind(this);
		this.copyLink = this.copyLink.bind(this);
	}

	componentWillMount(){
		this.setState({
			error: ""
		});
	}

	back(){
		this.props.prevSection();
	}

	validEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	validPhone(phonenumber){
		var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
		return re.test(phonenumber);		
	}

	continue(){
		if(!this.validEmail(this.props.creatorEmail)){
			this.setState({
				error: "please provide a valid address for your email"
			});
			return;
		}else{
			this.setState({
				error: ""
			})
		}
		this.props.push("/");
	}

	addInvitee(name,email){
		this.props.addInvitee(name,email);
	}

	copyLink(evt){
		this.linkArea.select();
		document.execCommand("copy");
		evt.target.focus();
	}

	render(){
		const contacts = [];
		for(var i =0; i < this.props.invitees.length+1;i++)
			contacts.push(
				<InviteeInfo key={i} index={i}
					 addInvitee={this.addInvitee}
					 updateInvitee={this.props.updateInvitee}/>
			);

		const setCreatorEmail = this.props.setCreatorEmail;

		return (
			<div>
				<h2>Contact Information</h2>
				<label style={{color:"red"}}>{this.state.error}</label><br/>
				<FormInputText prompt={"Your Email"} width={"30%"} type={"email"} onChange={setCreatorEmail}/>
				<img alt="question" src={QuestionButton} width="60px"/>
				<div className="divider">
					<div className="title">Invitees</div>
				</div><br/>		
				<div>
					{contacts}
				</div>		
				<BottomMenuBar>
				<button onClick={this.back}  style={{marginTop:"20px",transform:"translateY(18px)"}}  className="arrow"><img alt="back"src={ProgressArrow} className="back" /></button>
					<div id="copy-zone">
						<label>Event link</label>
						<textarea autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
							 rows="1" readOnly ref={(linkArea) => this.linkArea = linkArea}
							 value="KwB12fE01LiThisIsGibberish78En14"
							 />							 						
						<img alt="copy" src={CopyIcon} onClick={this.copyLink} />
					</div>
					<button onClick={this.continue}>Done</button>
				</BottomMenuBar>			
			</div>
		)
	}

}

const mstp = state =>({
	creatorEmail: state.createEvent.creatorEmail,
	invitees: state.createEvent.invitees
});

class InviteeInfo extends React.Component{

	constructor(props){
		super(props);
		this.onDone = this.onDone.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
	}

	componentWillMount(){
		this.setState({
			name: null,
			email: null,
			set: false
		});
	}

	onDone(){
		this.setState({
			set: true
		});
		this.props.addInvitee(this.state.name,this.state.email);
	}

	onNameChange(name){
		if(this.state.set){
			this.props.updateInvitee(this.props.index,name,this.state.email)
		}
		this.setState({
			name
		});
	}

	onEmailChange(email){
		if(this.state.set){
			this.props.updateInvitee(this.props.index,this.state.name,email)
		}
		this.setState({
			email
		})		
	}

	render(){
		return(
			<div key={this.props.index} className="contact">
				<FormInputText prompt="name" onChange={this.onNameChange}/>
				<FormInputText prompt="email" width="30%" onChange={this.onEmailChange} onDone={this.onDone}/>
				{!this.state.set?<button onClick={this.onDone}>
					Enter
					<img alt="add" src={PlusIcon} height={"30px"} style={{marginLeft:'10px',float:'right'}}/>
				</button>:null}
			</div>
		)
	}

}

export default connect(mstp,{...Actions,push})(Section3);
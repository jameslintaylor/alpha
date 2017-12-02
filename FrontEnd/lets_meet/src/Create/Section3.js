import React from 'react';
import {connect} from 'react-redux';

import FormInputText from '../Components/FormInputText';
import {Actions} from './reducers';

import QuestionButton from '../images/Question_Button.svg';
import PlusIcon from '../images/Plus_Icon.svg';

class Section3 extends React.Component{

	constructor(props){
		super(props);
		this.addInvitee = this.addInvitee.bind(this);
	}

	addInvitee(name,email){
		this.props.addInvitee(name,email);
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
				<FormInputText prompt={"Your Email"} width={"30%"} type={"email"} onChange={setCreatorEmail}/>
				<img alt="question" src={QuestionButton} width="60px"/>
				<div className="divider">
					<div className="title">Invitees</div>
				</div><br/>		
				<div>
					{contacts}
				</div>					
			</div>
		)
	}

}

const mstp = state =>({
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

export default connect(mstp,Actions)(Section3);
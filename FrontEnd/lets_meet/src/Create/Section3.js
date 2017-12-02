import React from 'react';
import {connect} from 'react-redux';

import FormInputText from '../Components/FormInputText';
import {Actions} from './reducers';

import QuestionButton from '../images/Question_Button.svg';
import PlusIcon from '../images/Plus_Icon.svg';

class Section3 extends React.Component{

	constructor(props){
		super(props);
		this.addContact = this.addContact.bind(this);
	}

	componentWillMount(){
		this.setState({
			contactCount: 1
		});
	}

	addContact(){
		this.setState({
			contactCount: this.state.contactCount+1
		})
	}

	render(){
		const contact = (
			<div className="contact">
				<FormInputText prompt="name"/>
				<FormInputText prompt="email" width="30%" onDone={this.addContact}/>
				<button onClick={this.addContact}>
					Enter
					<img alt="add" src={PlusIcon} height={"30px"} style={{marginLeft:'10px',float:'right'}}/>
				</button>
			</div>
		)

		const contacts = [];
		for(var i =0; i < this.state.contactCount;i++)contacts.push(contact);

		return (
			<div>
				<FormInputText prompt={"Your Email"} width={"30%"} type={"email"}/>
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

export default connect(mstp,Actions)(Section3);
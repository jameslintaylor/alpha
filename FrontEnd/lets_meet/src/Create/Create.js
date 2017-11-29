import React from 'react';

import ProgressIndicator from '../Components/ProgressIndicator.js';
import FormInputText from '../Components/FormInputText';

import Logo from '../images/Logo.svg';
import ProgressArrow from '../images/Progress_Arrow.svg';

import './Create.css';

class Create extends React.Component{
	render(){
		return (
			<div className="page" id="create">
				<a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
				<ProgressIndicator count={3}/>
				<div className="content">
					<FormInputText prompt="Event Name" width="20%" onDone={(text)=>{alert("DONE "+text)}}/>
					<img alt="continue" src={ProgressArrow} className="continue" />					
				</div>				
			</div>
		)
	}
}

export default Create;
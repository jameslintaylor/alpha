import React from 'react';
import {connect} from 'react-redux';

import ProgressIndicator, {Actions as PIActions} from '../Components/ProgressIndicator.js';
import FormInputText from '../Components/FormInputText';

import Logo from '../images/Logo.svg';
import ProgressArrow from '../images/Progress_Arrow.svg';
import './Create.css';

class Create extends React.Component{

	constructor(props){
		super(props);
		this.continue = this.continue.bind(this);
	}

	continue(){
		if(this.props.currentStage === 2)return;
		this.props.nextStage();
	}

	render(){
		return (
			<div className="page" id="create">
				<a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
				<ProgressIndicator count={3}/>
				<div className="content">
					<FormInputText prompt="Event Name" width="20%" onDone={(text)=>{alert("DONE "+text)}}/>
					<img onClick={this.continue} alt="continue" style={{paddingTop:"20px"}} src={ProgressArrow} className="continue" />					
				</div>				
			</div>
		)
	}
}

const mstp = state =>({
	currentStage: state.progressIndicator.index
})

export default connect(mstp,{nextStage: PIActions.Incr_Indicator})(Create);
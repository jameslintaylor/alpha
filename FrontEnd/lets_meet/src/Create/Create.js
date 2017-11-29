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

	componentWillMount(){
		this.setState({
			stage1Input:{
				text:""
			}
		})
	}

	continue(){
		if(this.props.currentStage === 2)return;
		switch(this.props.currentStage){
			case 0:
			if(	this.state.stage1Input.text != null && 
				this.state.stage1Input.text.length > 0){
				this.props.nextStage();
			}
			break;
			default:
			return;
		}		
	}

	render(){
		const stage1Done = (text)=>{			
			this.continue();
		};

		return (
			<div className="page" id="create">
				<a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
				<ProgressIndicator count={3}/>
				<div className="content">
					<FormInputText prompt="Event Name" width="20%"
						 onChange={(text)=>this.setState({
												stage1Input:{
													text:text
												}
											})} 
						 onDone={stage1Done}/>
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
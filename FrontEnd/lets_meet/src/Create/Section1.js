import React from 'react';

import FormInputText from '../Components/FormInputText';

import ProgressArrow from '../images/Progress_Arrow.svg';

class Section1 extends React.Component{

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
		if(this.props.currentSection === 2)return;
		switch(this.props.currentSection){
			case 0:
			if(	this.state.stage1Input.text != null && 
				this.state.stage1Input.text.length > 0){					
				console.log("GO");
				this.props.nextSection();
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
			<div>
				<FormInputText prompt="Event Name" width="20%"
						 onChange={(text)=>this.setState({
												stage1Input:{
													text:text
												}
											})} 
						 onDone={stage1Done}/>
					<img onClick={this.continue} alt="continue" style={{paddingTop:"20px"}} src={ProgressArrow} className="continue" />					
			</div>
		)
	}

}

export default Section1;
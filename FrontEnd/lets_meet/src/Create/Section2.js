import React from 'react';
import DatePicker from '../Components/DatePicker';

import ProgressArrow from '../images/Progress_Arrow.svg';

class Section2 extends React.Component{

	constructor(props){
		super(props);
		this.back = this.back.bind(this);
		this.continue = this.continue.bind(this);
	}

	back(){
		this.props.prevSection();
	}

	continue(){
		this.props.nextSection();
	}

	render(){
		return(
			<div style={{textAlign:'center'}}>
				<div style={{display:'inline-block', marginTop:'20px'}}>
					<DatePicker />
					<div style={{display:'flex',justifyContent:'space-between'}}>
						<img onClick={this.back} alt="back" src={ProgressArrow} className="back" />					
						<img onClick={this.continue} alt="continue" src={ProgressArrow} className="continue" />					
					</div>
				</div>
			</div>
		)
	}

}

export default Section2;

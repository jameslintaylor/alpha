import React from 'react';
import DatePicker from '../Components/DatePicker';
import {connect} from 'react-redux';

import ProgressArrow from '../images/Progress_Arrow.svg';

class Section2 extends React.Component{

	constructor(props){
		super(props);
		this.back = this.back.bind(this);
		this.continue = this.continue.bind(this);
	}

	componentWillMount(){
		this.setState({
			error: ""
		});
	}

	back(){
		this.props.prevSection();
	}

	continue(){
		if(this.props.dates.length === 0){
			this.setState({
				error: "please add timeslots"
			});
			return;
		}
		if(this.state.error !== ""){
			this.setState({
				error: ""
			});
		}
		this.props.nextSection();
	}

	render(){	
		return(
			<div style={{textAlign:'center'}}>
				<div style={{display:'inline-block', marginTop:'20px'}}>
					<h2>Select Timeslots</h2>
					<label style={{color:"red"}}>{this.state.error}</label>
					<DatePicker />
					<div style={{display:'flex',justifyContent:'space-between'}}>
					<button onClick={this.back}  style={{marginTop:"20px",transform:"translateY(18px)"}}  className="arrow"><img alt="back"src={ProgressArrow} className="back" /></button>
						<button onClick={this.continue}  style={{marginTop:"20px",transform:"translateY(18px)"}}  className="arrow"><img alt="continue"src={ProgressArrow} className="continue" /></button>
					</div>
				</div>
			</div>
		)
	}

}

const mstp = state =>({
	dates: state.dates
})

export default connect(mstp)(Section2);

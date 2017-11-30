import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import PI_Bar from '../images/PI_Bar.svg';
import PI_Circle from '../images/PI_Circle.svg';

import './ProgressIndicator.css';

import {createAction} from 'redux-actions';
export const INCR_INDICATOR = "INCR_INDICATOR";
export const DECR_INDICATOR = "DECR_INDICATOR";
export const Actions = { 
	Incr_Indicator : createAction(INCR_INDICATOR),
	Decr_Indicator : createAction(DECR_INDICATOR)
}
export const reducer = (
	state = {
		index: 0
	},
	action
) => {
	switch(action.type){
		case INCR_INDICATOR:
		return {
			...state,
			index: state.index + 1
		}
		case DECR_INDICATOR:
		return {
			...state,
			index: state.index - 1
		};
		default:
		return state;
	}	
}

class ProgressIndicator extends React.Component{
	render(){
		const pair =(index)=> [
			this.props.index === index? <img src={PI_Circle} className="focus" key={index*2} alt="circle"/>: <img src={PI_Circle} key={index*2} alt="circle"/>,
						<img src={PI_Bar} className="bar" key={index*2+1} alt="bar"/>];

		const barContents = ()=>{
			if(this.props.count === 1){
				return (<img src={PI_Circle} className="focus" alt="focused circle"/>);
			}else{
				var res = []		
				for(var i = 0; i < this.props.count-1;i++){
					res.push(...pair(i));
				}
				if(this.props.count-1 === this.props.index){
					res.push(<img src={PI_Circle} className="focus" alt="circle" key={this.props.count+1}/>);
				}else{
					res.push(<img src={PI_Circle} alt="circle" key={this.props.count+1}/>);
				}				
				return res;
			}			
		}
		const left = "calc(50% - "+245 * this.props.index+"px)"; // (this.props.count-1));
		return (
			<div id="progress-indicator-container">
				<div id="progress-indicator" style={{left:left}}>	
					{barContents()}		
				</div>
			</div>
		)
	}
}

ProgressIndicator.propTypes = {
	count: PropTypes.number.isRequired
}

const mstp = state =>({
	index: state.progressIndicator.index
});

export default connect(mstp)(ProgressIndicator);

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './FormInputText.css';

class FormInputText extends React.Component{

	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	componentWillMount(){
		this.setState({
			text: ""
		});
	}

	onKeyDown(evt){
		if(evt.key === "Enter" && this.props.onDone){
			this.props.onDone(evt.target.value);
		}
	}

	onChange(evt){	
		this.setState({
			text: evt.target.value
		});
		if(this.props.onChange){
			this.props.onChange(evt.target.value);
		}
	}

	render(){
		const hintClassName = classNames("hint-text",{
			"top": this.state.text != null && this.state.text.length > 0
		});
		const type = this.props.type || "text";
		return (
			<div className="form-input-text"  style={{...this.props.style,width:this.props.width}}>			
				<div className={hintClassName}>{this.props.prompt}</div>
				<input type={type} onChange={this.onChange} onKeyDown={this.onKeyDown}/>				
			</div>
		)
	}
}

FormInputText.propTypes = {
	prompt: PropTypes.string.isRequired,
	onDone: PropTypes.func,
	onChange: PropTypes.func,
	type: PropTypes.string
}

export default FormInputText;

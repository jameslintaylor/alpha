import React from 'react';
import classNames from 'classnames';
import PropTypes from 'proptypes';

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
	}

	render(){
		const hintClassName = classNames("hint-text",{
			"top": this.state.text != null && this.state.text.length > 0
		});
		return (
			<div className="form-input-text">			
				<div className={hintClassName}>{this.props.prompt}</div>
				<input type="text" onChange={this.onChange} onKeyDown={this.onKeyDown}/>				
			</div>
		)
	}
}

FormInputText.propTypes = {
	prompt: PropTypes.string.isRequired,
	onDone: PropTypes.func
}

export default FormInputText;
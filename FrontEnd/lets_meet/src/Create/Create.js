import React from 'react';

import ProgressIndicator from '../Components/ProgressIndicator.js';
import FormInputText from '../Components/FormInputText';

class Create extends React.Component{
	render(){
		return (
			<div className="page">
				<ProgressIndicator count={3}/>
				<FormInputText prompt="Event Name" onDone={(text)=>{alert("DONE "+text)}}/>
			</div>
		)
	}
}

export default Create;
import React from 'react';

import ProgressIndicator from '../Components/ProgressIndicator.js';

class Create extends React.Component{
	render(){
		return (
			<div className="page">
				<ProgressIndicator count={3}/>
			</div>
		)
	}
}

export default Create;
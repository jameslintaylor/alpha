import React from 'react';
import {connect} from 'react-redux';

import ProgressIndicator, {Actions as PIActions} from '../Components/ProgressIndicator.js';
import SectionPager from '../Components/SectionPager';
import Section1 from './Section1.js';
import Section2 from './Section2';
import Section3 from './Section3';

import Logo from '../images/Logo.svg';
import './Create.css';

class Create extends React.Component{

	render(){

		return (
			<div className="page" id="create">
				<a href="/"><img src={Logo} alt="logo" id="top-logo" /></a>
				<h1 id="process-title">Create Event</h1>
				<ProgressIndicator count={3}/>
				<div className="content">
					<SectionPager>		
						<Section3/>					
						<Section1/>
					</SectionPager>
				</div>				
			</div>
		)
	}
}

const mstp = state =>({
	currentStage: state.progressIndicator.index
})

export default connect(mstp,{nextStage: PIActions.Incr_Indicator})(Create);
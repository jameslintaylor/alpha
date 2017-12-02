import React from 'react';
import {connect} from 'react-redux';

import {Actions as PIActions} from '../Components/ProgressIndicator.js';

import './SectionPager.css';

class SectionPager extends React.Component{

	constructor(props){
		super(props);
		this.nextSection = this.nextSection.bind(this);
		this.prevSection = this.prevSection.bind(this);
	}

	componentWillMount(){
		window.onpopstate = (event) =>{
			if(this.props.index > 0){
				this.props.prevSection();
			}		
		}
	}

	nextSection(){				
		this.props.nextSection();
	}

	prevSection(){
		this.props.prevSection();
	}

	render(){		
		const section = (Child,index) => (
			<div clasname="section" key={index}>
				{React.cloneElement(Child,{			
					currentSection: this.props.index,		
					nextSection: this.nextSection,
					prevSection: this.prevSection
				})}				
			</div>
		)
		const sections = this.props.children.map(section);
		const gridStyle = {
			left: "calc( -100% * "+this.props.index+")",			
			gridTemplateColumns: "repeat("+sections.length+", 100%)"
		}
		return (
			<div id="section-pager">
				<div id="pager" style={gridStyle}>
					{sections}	
				</div>
			</div>
		)
	}
}

const mstp = state =>({
	index: state.progressIndicator.index
})
const fstp = {
	nextSection: PIActions.Incr_Indicator,
	prevSection: PIActions.Decr_Indicator
};

export default connect(mstp,fstp)(SectionPager);
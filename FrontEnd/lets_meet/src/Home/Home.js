import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'

import Logo from '../images/Logo.svg';

import './Home.css';

class Home extends React.Component{

	render(){
		let nav_create = ()=>this.props.push("/create");
		return (
			<div className="page">		
				<div className="container">		
					<img src={Logo} alt="logo"/><br/>
					<button className="big" onClick={nav_create}>Create Event</button><br/>
					<button>Existing Event</button>
				</div>
			</div>
		)
	}

}
const mstp = state =>({})
export default connect(mstp,{push})(Home);
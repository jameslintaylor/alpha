import React from 'react';

import './BottomMenuBar.css';

class BottomMenuBar extends React.Component{

	render(){
		return (
			<div id="bottom-menu-bar">
				{this.props.children}								
			</div>
		)
	}

}

export default BottomMenuBar;
// This component handles the App template seen on every page which contains the body from other components

import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<p>Header here...</p>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired
};

export default App;

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';

class Routes extends React.Component {
	render() {
		return (
			<Route path="/" component={App}>
				<IndexRoute component={HomePage} />
				<Route path="about" component={AboutPage} />
			</Route>
		);
	}
}

export default Routes;

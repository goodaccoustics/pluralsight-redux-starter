//entry point for javascript
//console.log('hi');

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Routes from './routes';
import './styles/styles.css'; //webpack can import CSS files too
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
	<Router history={browserHistory} routes={Routes} />, document.getElementById('app')
);

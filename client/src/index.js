import React from 'react';
import ReactDOM from 'react-dom';;
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import ReactGA from 'react-ga';

// Import stylesheets
import '../styles/base.scss';
// Initialize Google Analytics
ReactGA.initialize('UA-000000-01');

function logPageView() {
	ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(
	<Router history={browserHistory} routes={routes()} onUpdate={logPageView} />,
	document.querySelector('.wrapper'));

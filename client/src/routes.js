import React from 'react';
import { Route } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './app';

export default () => {
	return (
		<Route path="/" component={App} name="TechOTG"/>
	);
};

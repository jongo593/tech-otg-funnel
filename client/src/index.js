import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// Import stylesheets
import '../styles/base.scss';
import  '../styles/bootstrap-theme.min.css';
import '../styles/bootstrap.min.css';
ReactDOM.render(
	<App/>,
	document.querySelector('.wrapper'));

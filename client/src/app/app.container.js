import React, { Component } from 'react';
import Content from './content';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar'
const branding = '#057694';

class AppContainer extends Component {

	render() {
		return (
			<div>
				<Paper id="AppContainer">
					<AppBar title={<a href="http://techotg.com" target="_blank"><img src="/images/TechOTG_Logo.png" height="64"/></a>}
							iconElementLeft={<span></span>}
							iconElementRight={<span style={{lineHeight: '300%'}}><a style={{color: branding, textDecoration: 'none', paddingRight: 15}} href="tel:14078728451">407.872.8451</a></span>}
							style={{backgroundColor: 'white', paddingTop: 4}}
							titleStyle={{color: 'black'}}/>
					{<Content {...this.props}/>}
					<footer style={{padding: 15}}>
						<div style={{textAlign: 'right'}}>
							<small style={{fontSize: 8}}>Made with <i className="fa fa-heart"></i> by <a href="https://www.linkedin.com/in/jonathan-go-06b83b97
" target="_blank">Jonathan Go</a></small>
						</div>
					</footer>
				</Paper>
			</div>

		)
	}
}


export default (AppContainer);

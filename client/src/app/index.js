import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppContainer from './app.container'
injectTapEventPlugin();

class App extends Component {

	render() {
		return (
			<MultiThemeProvider>
				<AppContainer {...this.props} />
			</MultiThemeProvider>
		);
	}
}

export default App;

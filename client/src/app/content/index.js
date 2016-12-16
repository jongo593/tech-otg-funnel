import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import axiosInstance from '../../utils/axios';

import {DEVICES, ISSUES} from '../../../constants';

const branding = '#057694';

const flexContainer = {
	display: 'flex',
	flexDirection: 'row',
	padding: 0,
};

function removeTrailingChar(str, c) {
	if(str[str.length-1] !== c) {
		return str;
	}

	return removeTrailingChar(str.substring(0, str.length-1), c);

}

function applyPhoneMask (value) {
	let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
	x = `${x[1]}.${x[2]}.${x[3]}`;
	x = removeTrailingChar(x, '.');
	return x
}

class contentContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeView: 0,
			zip: null,
			zipValid: -1,
			zipError: null,
			breadCrumbs: [],
			selectedDevice: null,
			selectedModel: null,
			selectedColor: null,
			selectedIssue: null,
			contactInfo: {
				name: null,
				email: null,
				number: null
			},
			submitted: false,
			submitting: false
		};

	}

	renderViews() {
		this.view0 = () => {
			return (<Card style={{textAlign: 'center', boxShadow: 0, minHeight: '70vh'}}>
				<CardHeader style={{padding: 50}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={<h2 style={{textAlign: 'center'}}>Find out if we're in your city</h2>}/>
				<CardText style={{padding: 30}}>
					With 1 OTG-tech across Central Florida, you'll never have to worry about your mobile device breaking again.
					<br/><br/><br/>
					<TextField underlineFocusStyle={{color: branding, borderColor: branding}} type="number" value={this.state.zip} placeholder="ZIP" errorText={this.state.zipError} onChange={(e, zip) => {this.setState({zip}); this.validateZip(e, zip)}}/>
				</CardText>
				<CardActions style={{padding: 30}}>
					<RaisedButton disabled={this.state.zipValid !== 1} label="Continue" backgroundColor={branding} labelColor="white" onTouchTap={(e) => {e.preventDefault(); this.progressNext(this.state.activeView, this.state.activeView + 1)}}/>
				</CardActions>
			</Card>);
		};

		this.view1 = () => {
			return (
				<Card style={{textAlign: 'center', boxShadow: 0, minHeight: '70vh'}}>
					<CardHeader style={{padding: 50}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={
						<h2>First, Choose Your <span style={{color: branding}}>Device</span></h2>
					}/>
					<CardText style={{padding: 30}}>
						{
							Object.keys(DEVICES).map(deviceKey =>
									<span>
										<img className="hidden-mobile" style={{cursor: 'pointer', marginLeft: 30, marginRight: 30}} title={DEVICES[deviceKey].label} width={DEVICES[deviceKey].width} height={DEVICES[deviceKey].height} src={DEVICES[deviceKey].image} onTouchTap={(e) => { e.preventDefault(); this.progressNext(1,2, deviceKey)}}/>
										<RaisedButton className="hidden-desktop" onTouchTap={(e) => { e.preventDefault(); this.progressNext(this.state.activeView, this.state.activeView + 1, deviceKey)}}
													  style={{width: 200, height: 100, padding: 0, margin: 30}}
													  label={deviceKey}/>
									</span>
							)
						}
					</CardText>
					<CardActions style={{padding: 30}}>
					</CardActions>
				</Card>
			);
		};

		this.view2 = () => {
			return (
				<Card style={{textAlign: 'center', boxShadow: 0, minHeight: '70vh'}}>
					<CardHeader style={{padding: 50}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={
						<h2>What <span style={{color: branding}}>Model</span> {this.state.selectedDevice}</h2>
					}/>
					<CardText style={{padding: 30}}>
						{
							DEVICES[this.state.selectedDevice].models.map(({name}, i) =>
								<RaisedButton onTouchTap={(e) => { e.preventDefault(); this.progressNext(this.state.activeView, this.state.activeView + 1, name, i)}}
											  style={{width: 200, height: 100, padding: 0, margin: 30}}
											  label={name}/>
							)
						}
					</CardText>
					<CardActions style={{padding: 30}}/>
				</Card>
			);
		};

		this.view3 = () => {

			return (
				<Card style={{textAlign: 'center', boxShadow: 0, minHeight: '70vh'}}>
					<CardHeader style={{padding: 50}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={
						<h2>Excellent, what <span style={{color: branding}}>Color</span> is it?</h2>
					}/>
					<CardText style={{padding: 30}}>
						{
							DEVICES[this.state.selectedDevice].models[this.state.selectedModel].colors.map(({trim, screen}, i) =>
									<RaisedButton onTouchTap={(e) => { e.preventDefault(); this.progressNext(this.state.activeView, this.state.activeView + 1, trim, i)}}
												  style={{width: 200, height: 100, padding: 0, margin: 30}} label={trim}/>

							)
						}
					</CardText>
					<CardActions style={{padding: 30}}/>
				</Card>
			);
		};

		this.view4 = () => {
			return (
				<Card style={{textAlign: 'center', boxShadow: 0, minHeight: '70vh'}}>
					<CardHeader style={{padding: 50}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={
						<h2>And what is the <span style={{color: branding}}>Issue</span>?</h2>
					}/>
					<CardText style={{padding: 50}}>
						{
							ISSUES.map((issue, i) =>
								<RaisedButton onTouchTap={(e) => { e.preventDefault(); this.progressNext(this.state.activeView, this.state.activeView + 1, issue, i)}}
											  style={{width: 200, height: 100, padding: 0, margin: 30}} label={issue}/>

							)
						}
					</CardText>
					<CardActions style={{padding: 50}}/>
				</Card>
			)
		};

		this.view5 = () => {
			return (
				<Card style={{textAlign: 'center', boxShadow: 0, minHeight: '70vh'}}>
					<CardHeader style={{padding: 50}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={<h2 style={{textAlign: 'center'}}>Almost there!</h2>}/>
					<CardText style={{padding: 30}}>
						Let us know where we should send your quote.
						<br/><br/>
						<TextField underlineFocusStyle={{color: branding, borderColor: branding}}type="text" value={this.state.contactInfo.name} placeholder="Name" onChange={(e, name) => {this.setState({contactInfo: {number: this.state.contactInfo.number, email: this.state.contactInfo.email, name}})}}/>
						<br/><br/>
						<TextField underlineFocusStyle={{color: branding, borderColor: branding}}type="email" value={this.state.contactInfo.email} placeholder="Email" onChange={(e, email) => {this.setState({contactInfo: {name: this.state.contactInfo.name, number: this.state.contactInfo.number, email}})}}/>
						<br/><br/>
						<TextField underlineFocusStyle={{color: branding, borderColor: branding}}type="phone" value={this.state.contactInfo.number} placeholder="Phone Number" onChange={(e, number) => {this.setState({contactInfo: {name: this.state.contactInfo.name, email: this.state.contactInfo.email, number: applyPhoneMask(number)}})}}/>
					</CardText>
					<CardActions style={{padding: 30}}>
						<RaisedButton labelColor="white" backgroundColor={branding} disabled={!this.validateContactInfo(this.state.contactInfo) || this.state.submitted || this.state.submitting} label={this.renderSubmitLabel()} onTouchTap={(e) => {e.preventDefault(); this.submit(this.state)}}/>
					</CardActions>
				</Card>
			);
		};

		this.view6 = () => {
			return (
				<Card style={{textAlign: 'center', boxShadow: 0, minHeight: '70vh'}}>
					<CardHeader style={{padding: 50}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={<h2 style={{textAlign: 'center'}}>Great!</h2>}/>
					<CardText style={{padding: 30}}>
						<p style={{color:'green'}}><i className="fa fa-check-circle-o fa-5x"></i></p>
						<p>We'd love to fix your device!</p>
						<p>We will contact you as soon as we have your quote ready to schedule your repair!</p>
					</CardText>
					<CardActions style={{padding: 30}}>
					</CardActions>
				</Card>
			)
		};

		this.views = [
			this.view0,
			this.view1,
			this.view2,
			this.view3,
			this.view4,
			this.view5,
			this.view6
		]
	}

	renderSubmitLabel() {
		if(this.state.submitting) {
			return <i className="fa fa-spinner fa-spin"></i>
		}

		if(this.state.submitted) {
			return <i className="fa fa-check"></i>
		}

		return "Submit"
	}

	progressPrev(curr, dest) {
		let newBread = this.state.breadCrumbs;
		switch(dest) {
			case 0:
				newBread = newBread.splice(0, dest);
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					selectedDevice: null
				});
				break;
			case 1:
				newBread = newBread.splice(0, dest);
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					selectedModel: null
				});
				break;

			case 2:
				newBread = newBread.splice(0, dest);
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					selectedColor: null
				});
				break;
			case 3:
				newBread = newBread.splice(0, dest);
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					selectedIssue: null
				});
				break;
			case 4:
				newBread = newBread.splice(0, dest);
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					contactInfo: {name: null, number: null, email: null}
				});
				break;

		}

	}

	progressNext(curr, dest, ...data) {
		let newBread = this.state.breadCrumbs;

		switch(curr) {
			case 0:
				newBread.push(this.generateListItem(this.state.zip, 'Zip', curr));
				this.setState({
					breadCrumbs: newBread,
					activeView: dest
				});
				break;

			case 1:
				newBread.push(this.generateListItem(data[0], 'Device', curr));
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					selectedDevice: data[0]
				});
				break;
			case 2:
				newBread.push(this.generateListItem(data[0], 'Model', curr));
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					selectedModel: data[1]
				});
				break;
			case 3:
				newBread.push(this.generateListItem(data[0], 'Color', curr));
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					selectedColor: data[1]
				});
				break;
			case 4:
				newBread.push(this.generateListItem(data[0], 'Issue', curr));
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					selectedIssue: data[1]
				});
				break;
			case 5:
				this.setState({
					breadCrumbs: newBread,
					activeView: dest,
					submitted: true,
					submitting: false
				});
		}
	}

	generateListItem (p, s, i) {
		return <ListItem className="breadcrumbs" onTouchTap={(e) => {this.progressPrev(this.state.activeView, i)}} primaryText={p} secondaryText={s}/>
	}

	submit() {

		this.setState({
			submitting: true
		});

		axiosInstance.post('/submit', {
			zip: this.state.zip,
			device: this.state.selectedDevice,
			model: DEVICES[this.state.selectedDevice].models[this.state.selectedModel].name,
			color: DEVICES[this.state.selectedDevice].models[this.state.selectedModel].colors[this.state.selectedColor],
			issue: ISSUES[this.state.selectedIssue],
			contact: this.state.contactInfo
		}).then(__ => {

			this.progressNext(this.state.activeView, this.state.activeView + 1);

		}, err => {

			this.progressNext(this.state.activeView, this.state.activeView + 1);

		});

	}



	validateContactInfo({name = '', email, number}) {

		let nameValid = typeof name === 'string' && name.length > 0;

		let emailValid = typeof email === 'string' && email.indexOf('@') > 0 && email.indexOf('.') > 0;

		let numberValid = typeof number === 'string' && number.length === 12;

		return nameValid && emailValid && numberValid;

	}

	validateZip(event, zip) {
		if(zip.length !== 5){

			return this.setState({
				zipValid: 0,
				zipError: ' '
			});

		}

		//Check valid list of zips

		return this.setState({
			zipValid: 1,
			zipError: null,
			zip: zip
		});
	}


	renderContent() {
		return this.views[this.state.activeView]();
	}

	renderProgressBar() {

		if(!this.state.submitted) {
			return (
				<div>
					<LinearProgress mode="determinate" min={0} max={5} value={this.state.activeView} color={branding}/>
					<div style={{width: '100%', backgroundColor: "#e8e8e8"}}>
						<List style={flexContainer}>
							<ListItem
								primaryText={
									<IconButton iconClassName="fa fa-arrow-left" disabled={this.state.activeView < 1} onTouchTap={(e) => { e.preventDefault(); this.progressPrev(this.state.activeView, this.state.activeView - 1)}}/>
								}/>

							{
								this.state.breadCrumbs
							}

						</List>
					</div>
				</div>
			)
		}




	}

	render() {
		this.renderViews();
		return <div>
			{this.renderProgressBar()}
			<div style={{textAlign: 'center'}}>
				{
					this.renderContent()
				}
			</div>
		</div>
	}
}

export default (contentContainer);

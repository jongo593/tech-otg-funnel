import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import axiosInstance from '../../utils/axios';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

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

	componentWillMount() {
		this.renderViews();
	}

	renderViews() {
		this.view0 = () => {

			return (
				<div className="col-xs-12">
					<div className="row" style={{padding: 30}}>
						<div className="col-xs-12">
							<h2 style={{textAlign: 'center'}}>LET'S GET STARTED</h2>
						</div>
					</div>
					<div className="row" style={{padding: 30}}>
						<div className="col-xs-12">
							Enter a service Zip Code
						</div>
					</div>
					<div className="row" style={{padding: 30}}>
						<div className="col-xs-12">
							<TextField underlineFocusStyle={{color: branding, borderColor: branding}} type="number" value={this.state.zip} placeholder="ZIP" errorText={this.state.zipError} onChange={(e, zip) => {this.setState({zip}); this.validateZip(e, zip)}}/>

						</div>
					</div>
					<div className="row" style={{padding: 30}}>
						<div className="col-xs-12">
							<RaisedButton disabled={this.state.zipValid !== 1} label="Continue" backgroundColor={branding} labelColor="white" onTouchTap={(e) => {e.preventDefault(); this.progressNext(this.state.activeView, this.state.activeView + 1)}}/>

						</div>
					</div>

					<div className="row" style={{padding: 30}}>
						<div className="col-xs-12">
							<Divider/>

						</div>
					</div>

					<div className="row">
						<div className="col-xs-12">
							<div className="row">
								<div className="col-xs-12">
									<h2 style={{color: branding, fontSize: 36}}>WHY CHOOSE TECHOTG?</h2>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={{padding: 15}}>
									<FontIcon
										style={{color: branding}}
										className="fa fa-calendar-check-o"
									/>
									<p><strong>CONVENIENTLY SIMPLE</strong></p>
									<p>Pick the time and place most convenient for you & we'll come to you and repair your device on site. Whenever. Wherever</p>
								</div>
								<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={{padding: 15}}>
									<FontIcon
										style={{color: branding}}
										className="fa fa-star"
									/>
									<FontIcon
										style={{color: branding}}
										className="fa fa-star"
									/>
									<FontIcon
										style={{color: branding}}
										className="fa fa-star"
									/>
									<FontIcon
										style={{color: branding}}
										className="fa fa-star"
									/>
									<FontIcon
										style={{color: branding}}
										className="fa fa-star"
									/>
									<p><strong>QUALITY GUARANTEED</strong></p>
									<p>We don't skimp on quality. Every part we use is up to industry standards. All Parts and repairs are backed by our lifetime warranty.</p>
								</div>
								<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={{padding: 15}}>
									<FontIcon
										style={{color: branding}}
										className="fa fa-check"
									/>
									<p><strong>PROFESSIONALLY CERTIFIED</strong></p>
									<p>We're people helping people. Rigorously trained technicians with years of experience. Rest assured, you can always expect the best.</p>
								</div>
								<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={{padding: 15}}>
									<FontIcon
										style={{color: branding}}
										className="fa fa-lock"
									/>
									<p><strong>YOUR PRIVACY, SECURED</strong></p>
									<p>On-site device repair means your data is safe and secured. Never leaving your site.</p>
								</div>


							</div>

						</div>
					</div>

					<div className="row" style={{padding: 30}}>
						<div className="col-xs-12">
							<Divider/>
						</div>
					</div>

					<div className="row" style={{padding: 30}}>
						<div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
							<div style={{backgroundColor: '#e3e3e3', borderRadius: 2, color: branding, padding: 15, textAlign: 'left'}}>
								<p>
									<FontIcon
										style={{color: branding}}
										className="fa fa-shield"
									/>&nbsp;&nbsp;&nbsp;<strong>FREE BONUS</strong>
								</p>
								<p>
									TEMPERED-GLASS SCREEN PROTECTOR
								</p>
								<p>We'll install a free screen protector at no extra cost <small>(iPhone only)</small>.</p>
							</div>
						</div>
					</div>

				</div>
			);
		};

		this.view1 = () => {
			return (
				<Card style={{textAlign: 'center', boxShadow: 0, minHeight: '70vh'}}>
					<CardHeader style={{padding: 30}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={
						<h2>First, Choose Your <span style={{color: branding}}>Device</span></h2>
					}/>
					<CardText style={{padding: 30}}>
						{
							Object.keys(DEVICES).map(deviceKey =>
									<figure style={{display: 'inline-block', margin: 'auto'}}>
										<img className="hidden-mobile" style={{cursor: 'pointer', marginLeft: 30, marginRight: 30}} title={DEVICES[deviceKey].label} width={DEVICES[deviceKey].width} height={DEVICES[deviceKey].height} src={DEVICES[deviceKey].image} onTouchTap={(e) => { e.preventDefault(); this.progressNext(1,2, deviceKey)}}/>
										<figcaption><strong>{deviceKey}</strong></figcaption>

										<RaisedButton className="hidden-desktop" onTouchTap={(e) => { e.preventDefault(); this.progressNext(this.state.activeView, this.state.activeView + 1, deviceKey)}}
													  style={{width: 200, height: 100, padding: 0, margin: 30}}
													  label={deviceKey}/>
									</figure>
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
					<CardHeader style={{padding: 30}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={
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
					<CardHeader style={{padding: 30}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={
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
					<CardHeader style={{padding: 30}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={
						<h2>And what's the <span style={{color: branding}}>Issue</span>?</h2>
					}/>
					<CardText style={{padding: 30}}>
						{
							ISSUES.map((issue, i) =>
								<RaisedButton onTouchTap={(e) => { e.preventDefault(); this.progressNext(this.state.activeView, this.state.activeView + 1, issue, i)}}
											  style={{width: 200, height: 100, padding: 0, margin: 30}} label={issue}/>

							)
						}
					</CardText>
					<CardActions style={{padding: 30}}/>
				</Card>
			)
		};

		this.view5 = () => {
			return (
				<Card style={{textAlign: 'center', boxShadow: 0, minHeight: '70vh'}}>
					<CardHeader style={{padding: 30}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={<h2 style={{textAlign: 'center'}}>Almost there!</h2>}/>
					<CardText style={{padding: 30}}>
						Let us know where we should send your quote.
						<br/><br/>
						<TextField underlineFocusStyle={{color: branding, borderColor: branding}}type="text" value={this.state.contactInfo.name} placeholder="Name" onChange={(e, name) => {this.setState({contactInfo: {number: this.state.contactInfo.number, email: this.state.contactInfo.email, name}})}} errorText={typeof this.state.contactInfo.name === 'string' && !this.validateName(this.state.contactInfo.name) ? 'Please enter a name' : null}/>
						<br/><br/>
						<TextField underlineFocusStyle={{color: branding, borderColor: branding}}type="email" value={this.state.contactInfo.email} placeholder="Email" onChange={(e, email) => {this.setState({contactInfo: {name: this.state.contactInfo.name, number: this.state.contactInfo.number, email}})}} errorText={typeof this.state.contactInfo.email === 'string' && !this.validateEmail(this.state.contactInfo.email) ? 'Please enter a valid email' : null}/>
						<br/><br/>
						<TextField underlineFocusStyle={{color: branding, borderColor: branding}}type="phone" value={this.state.contactInfo.number} placeholder="Phone Number" onChange={(e, number) => {this.setState({contactInfo: {name: this.state.contactInfo.name, email: this.state.contactInfo.email, number: applyPhoneMask(number)}})}} errorText={typeof this.state.contactInfo.number === 'string' && !this.validateNumber(this.state.contactInfo.number) ? 'Please enter a valid phone number xxx.xxx.xxxx' : null}/>
					</CardText>
					<CardActions style={{padding: 30}}>
						<RaisedButton labelColor="white" backgroundColor={branding} disabled={!this.validateContactInfo(this.state.contactInfo) || this.state.submitted || this.state.submitting} label={this.renderSubmitLabel()} onTouchTap={(e) => {e.preventDefault(); this.submit(this.state)}}/>
						<p><small style={{fontSize: 10}}>I understand that I may be contacted via text message,<br/> phone call or via email to receive a service quote after submitting this form. <br/> Standard messaging rates may apply.</small></p>
					</CardActions>
				</Card>
			);
		};

		this.view6 = () => {
			return (
				<Card style={{textAlign: 'center', boxShadow: 0, height: '90vh'}}>
					<CardHeader style={{padding: 30}} titleStyle={{textAlign: 'center', paddingRight: 0}} textStyle={{textAlign: 'center', paddingRight: 0}} title={<h2 style={{textAlign: 'center'}}>Great!</h2>}/>
					<CardText style={{padding: 30}}>
						<p style={{color:'green'}}><i className="fa fa-check-circle-o fa-5x"></i></p>
						<p>We'd love to fix your device!</p>
						<p>We will contact you as soon as we have your quote ready to schedule your repair!</p>
					</CardText>
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
		return this.validateName(name) && this.validateEmail(email) && this.validateNumber(number);
	}

	validateName(name) {
		return  typeof name === 'string' && name.length > 0;
	}

	validateEmail(email) {
		return typeof email === 'string' && email.indexOf('@') > 0 && email.lastIndexOf('.') > 0 && email.lastIndexOf('.') !== email.length - 1 ;
	}

	validateNumber(number) {
		return typeof number === 'string' && number.length === 12;
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

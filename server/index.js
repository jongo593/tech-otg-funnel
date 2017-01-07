const  Express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('../config');
const Mandrill = require('mandrill-api');
//const Mongoose = require('mongoose');
//const Models = require('../models');
const BodyParser = require('body-parser');
const _ = require('lodash');
const {DEVICES, ISSUES} = require('../client/constants');
// Config
const APP_PORT = config.APP_PORT;
//const { uri, options } = config.MONGO;

//Mandrill
const mandrill = new Mandrill.Mandrill(config.MANDRILL_KEY);

function validateBody(body) {

	/*

	 { zip: '32746',
	 device: 'iPhone',
	 model: '6 Plus',
	 color: { trim: 'Rose Gold', screen: 'White' },
	 issue: 'Water Damage',
	 contact:
	 { name: 'Jonathan Go',
	 email: 'jongo593@gmail.com',
	 number: '305.613.4645' } }

	*/

	let zipValid = _.has(body, 'zip') && _.isString(body.zip) && body.zip.length === 5;
	let deviceValid = _.has(body, 'device') && _.isString(body.device) && _.has(DEVICES, body.device);
	let modelIndex = _.findIndex(DEVICES[body.device].models, {name: body.model});
	let modelValid = _.has(body, 'model') && _.isString(body.model) && modelIndex > -1;
	let colorValid = _.has(body, 'color') && _.has(body.color, 'trim') && _.has(body.color, 'screen') && _.find(DEVICES[body.device].models[modelIndex].colors, {trim: body.color.trim, screen: body.color.screen});
	let issueValid = _.has(body, 'issue') && _.isString(body.issue) && _.includes(ISSUES, body.issue);
	let contactValid = _.has(body.contact,'name') && _.has(body.contact,'email') && _.has(body.contact,'number');

	return zipValid && deviceValid && modelValid && colorValid && issueValid && contactValid;

}

//Mongoose.connect(uri, options, (err) => {

	//const models = Models();

	// Start
	const app = Express();

	//Parse
	app.use(BodyParser.json());

	//CORS
	app.use(cors());

	app.get('/quote_count', (req, res) => {
		models.Quotes.count({}, (err, count = 0) => {
			res.send({count});
		});
	});

	app.post('/submit', ({body}, res) => {

		if(validateBody(body)) {
			const {
				zip,
				device,
				model,
				color,
				issue,
				contact
			} = body;

			const {
				name,
				number,
				email
			} = contact;

			const phone = number;

			let message = {
				"html":
					`<ul>
						<li>
							Name: ${name}
						</li>
						<li>
							Email: ${email}
						</li>
						<li>
							Phone Number: ${number}
						</li>
						<li>
							ZIP: ${zip}
						</li>
						<li>
							Device: ${device}
						</li>
						<li>
							Model: ${model}
						</li>
						<li>
							Color: ${color.trim} (${color.screen})
						</li>
						<li>
							Issue: ${issue}
						</li>
					 </ul>`,
				"text": "New Quote from " + name,
				"subject": "Quote: " + name + " - " + email,
				"from_email": "quotes@techotg.com",
				"from_name": "Tech OTG",
				"to": [{
					"email": "AJ.techotg@gmail.com",
					"name": "Aj Santos",
					"type": "to"
				}],
				"headers": {
					"Reply-To": "quotes@techotg.com"
				},
				"tags": [
					"Quote"
				],
				"metadata": {
					"website": "www.techotg.com"
				}
			};

			mandrill.messages.send({message, async: true}, (result) => {
				console.log(result);
				res.send(result);
				models.Quotes.create({e: email, ts: new Date(), s: _.omit(body, 'contact.email')})
			}, (err) => {
				console.log(err);
				res.statusCode = 400;
				res.send({ok: false, error: err});
			});
		} else {

			res.statusCode = 400;

			res.send({ok: false, error: 'Invalid data'});

		}

	});

	if(process.env.NODE_ENV === 'production') {
		app.use(Express.static(path.join(__dirname, './../dist/')));

		app.get('*/bundle.js', function (req, res) {
			res.sendFile(path.join(__dirname, './../dist/bundle.js'));
		});

		app.get('*/app.css', function (req, res) {
			res.sendFile(path.join(__dirname, './../dist/app.css'));
		});

		app.get('*', function(req, res) {
			res.sendFile(path.join(__dirname, './../dist/index.html'));
		});
	}

	app.listen(APP_PORT, ()=> {
		console.log(`App listening on port ${APP_PORT}`);
	});
//});


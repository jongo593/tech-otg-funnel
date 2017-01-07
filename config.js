module.exports =  {
	MONGO: {
		uri: 'mongodb://TechOTG:AJ_TECH_OTG@0.0.0.0:27017/TechOTG',
		options: {}
	},
	APP_PORT: process.env.PORT || 3002,
	MANDRILL_KEY: process.env.MANDRILL_KEY || 'MANDRILL_KEY'
}
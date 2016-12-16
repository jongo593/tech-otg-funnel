import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let QuoteSchema = new Schema({
	e: Schema.Types.Mixed, //Email
	ts: Date, //Timestamp
	s: Schema.Types.Mixed //submitted data

});

export default mongoose.model('Quotes', QuoteSchema);
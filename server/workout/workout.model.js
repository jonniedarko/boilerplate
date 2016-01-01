/**
 * @Todo requires a lot more ( not currently using yet)
 */
var mongoose = require('mongoose');

var workoutSchema = new mongoose.Schema({
	sets: {type: Number, default:1 },
	workoutType: {type:String, default: ''},
	reps : {type: Number, default:1 },
	setDuration : { type: Number},
	Date: { type: Date, default: date.now}
});

module.exports.workout = mongoose.model('Workout', workoutSchema);
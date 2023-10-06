import mongoose from 'mongoose';

const scheduleItemSchema = new mongoose.Schema({
  time: String,
  title: String,
});

const scheduleSchema = new mongoose.Schema({
  day: String,
  schedule: [scheduleItemSchema], // An array of schedule items
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;

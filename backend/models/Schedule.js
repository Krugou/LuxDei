import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  date: Date,

  event: String,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

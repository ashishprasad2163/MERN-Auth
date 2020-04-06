import { Schema, model } from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const JobsSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  standard: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  jobId: {
    type: String,
  },
});

JobsSchema.plugin(paginator);
export default model('jobs', JobsSchema);

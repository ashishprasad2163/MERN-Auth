import { Schema, model } from 'mongoose';

const CommonSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  profilePicture: {
    type: String,
    required: true,
  },
});

export default model('common', CommonSchema);

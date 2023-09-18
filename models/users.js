import pkg from 'mongoose';
const { Schema, model } = pkg;

const usersSchema = new Schema({
  login: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
});

export default model('users', usersSchema);

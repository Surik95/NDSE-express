import pkg from 'mongoose';
const { Schema, model } = pkg;

const liblarySchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  authors: {
    type: String,
    default: '',
  },
  favorite: {
    type: Boolean,
    default: '',
  },
  fileCover: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
  views: {
    type: Number,
    default: 0,
  },
});

export default model('liblary', liblarySchema);

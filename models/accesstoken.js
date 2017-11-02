import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
  type: {type: String, unique: true},
  token: Object,
  updateAt: {type: Date, default: new Date()}
});

export default  mongoose.model('AccessToken', accessTokenSchema);

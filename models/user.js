/**
 * 用户数据(来源微信)
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  openid: String,
  nickname: String,
  sex: String,
  city: String,
  province: String,
  country: String,
  headimgurl: String,
  privilege: Array,
  access_token: String,
  refresh_token: String,
  createAt: { type: Date, default: Date.now }
  
})

export default mongoose.model('Users', UserSchema)

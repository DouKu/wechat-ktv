/**
 * 信音频
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AudioSchema = new Schema({
  url: String,
  name: String
})

export default mongoose.model('Audios', AudioSchema)
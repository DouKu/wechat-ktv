/**
 * 信音频
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AudioSchema = new Schema({
  url: String,
  name: String,
  fileName: String
})

export default mongoose.model('Audios', AudioSchema)
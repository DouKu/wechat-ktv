/**
 * 信音频
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AudioSchema = new Schema({
  url: String,
  name: String,
  fileName: String,
  secondes: {type: Array},
  parLen: {type: Array},
  lyric: {type: Array}
})

export default mongoose.model('Audios', AudioSchema)
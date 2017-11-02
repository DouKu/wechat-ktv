/**
 * 合成音频
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ChorusSchema = new Schema({
  recordUrl: String, // 录音url
  recordFileName: String, // 录音文件名
  owner: { type: Schema.Types.ObjectId, ref: 'Users' }, // 拥有者
  status: { type: Boolean, default: false },
  users: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'Users' },
      extendMessage: {
        point: Number, // 各自得分
      }, // 额外信息
    },
  ], // 参与者
  audio: { type: Schema.Types.ObjectId, ref: 'Audios' },
	totalScore: Number, // 总得分
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

export default mongoose.model('Chorus', ChorusSchema)

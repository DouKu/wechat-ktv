/**
 * 合成音频
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ChorusSchema = new Schema({
  url: String,
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Users' },  // 拥有者
  users: [{
    type: Schema.Types.ObjectId, ref: 'Users'
  }], // 参与者
  audioId: [{
    type: Schema.Types.ObjectId, ref: 'Audio'
	}], // 录音
	extendMessage: [{
		point: Number,            // 各自得分
	}],  // 额外信息
	sumPoint: Number,         // 总得分
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

export default mongoose.model('Chorus', ChorusSchema)

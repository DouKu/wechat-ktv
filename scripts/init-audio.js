import '../nconf'
import '../mongoose'
import mongoose from 'mongoose'
import Promise from 'bluebird'

const Audio = mongoose.model('Audios')

const resource = [
  { url: 'http://os32fgzvj.bkt.clouddn.com/%E6%BA%90%E7%9C%9F%E6%BA%90%E5%91%B3_20171012_235523.mp3', name: '死了都要爱' },
  { url: 'http://os32fgzvj.bkt.clouddn.com/%E6%BA%90%E7%9C%9F%E6%BA%90%E5%91%B3_20171012_235523.mp3', name: '离歌' },
  { url: 'http://os32fgzvj.bkt.clouddn.com/%E6%BA%90%E7%9C%9F%E6%BA%90%E5%91%B3_20171012_235523.mp3', name: '海阔天空' },
  { url: 'http://os32fgzvj.bkt.clouddn.com/%E6%BA%90%E7%9C%9F%E6%BA%90%E5%91%B3_20171012_235523.mp3', name: '天高地厚' }
]

const res = resource.forEach(async item => {
  return await new Audio(item).save()
})

import '../nconf'
import '../mongoose'
import mongoose from 'mongoose'
import { uploadToQiniu, checkfile } from '../services/qiniu-oss'
import Path from 'path'

const Audio = mongoose.model('Audios')
const dir = '../tempFiles'

const resource = [
  { name: '死了都要爱', fileName: 'love.mp3' },
  { name: '离歌', fileName: 'leave.mp3' },
  { name: '海阔天空', fileName: 'sea.mp3' },
  { name: '天高地厚', fileName: 'sky.mp3' }
]

const start = async () => {
  await Audio.remove({})
  const res = await resource.forEach(async item => {
    try {
      const url = await uploadToQiniu(Path.resolve(__dirname, './files'), item.fileName)
      console.log(url)
      return await new Audio({
        url,
        fileName: item.fileName,
        name: item.name
      }).save()
    } catch (error) {
      console.log(error)    
    }
  })
}

start()

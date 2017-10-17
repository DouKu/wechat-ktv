import { savechorus, findchorus, findOnechorus, updatechorus } from '../services/core/chorus-service'
import { saveAudio, findOneAudio, mergeAudio, removeAudioFile, changeAudioFormat, getMedia } from '../services/core/audio-service'
import { downloadFromQiniu, downloadFile, uploadToQiniu } from '../services/qiniu-oss'
import Path from 'path'

const getAllXinMusic = async (req, res, next) => {
	
}

const postchorus = async (req, res, next) => {
  // 当前的音频
  const mediaId = req.body.mediaId
  // 之前已经录制过的音频(如果有则合并音频)
  const audioId = req.body.audioId
  // TODO 使用token中间件代替
  const openid = req.body.openid
  try {
    // 获取微信的音频
    const mp3 = await getMedia(mediaId)
    const name = mp3.name
    const audio = await findOneAudio({ _id:  audioId })
    const { _name } = await downloadFile(audio.url, audio.name)
    const output = await mergeAudio(Path.resolve(__dirname, '../tempFiles', `${_name}.mp3`), Path.resolve(__dirname, '../tempFiles', `/${name}.mp3`), Path.resolve(__dirname, '../tempFiles', `${name}-merge.mp3`))
    // 删除本地文件
    // await removeAudioFile({
    //   name,
    //   path: Path.resolve(__dirname, '../tempFiles'),
    //   type: 'mp3'
    // })
    res.json({
      code: 200,
      data: {
        output
      }
    })
  } catch (error) {
    console.log(error)
    res.json({
      code: 400,
      msg: error.message
    })
  }
}

export {
  postchorus
}

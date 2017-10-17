import { saveChrous, findChrous, findOneChrous, updateChrous } from '../services/core/chorus-service'
import { saveAudio, findOneAudio, mergeAudio, removeAudioFile, changeAudioFormat, } from '../services/core/audio-service'
import { downloadFromQiniu, downloadFile, uploadToQiniu } from '../services/qiniu-oss'
import Path from 'path'

const getAllXinMusic = async (req, res, next) => {
	
}

const postChrous = async (req, res, next) => {
  // 当前的音频
  const mediaId = req.body.mediaId
  // 之前已经录制过的音频(如果有则合并音频)
  const audioId = req.body.audioId
  // TODO 使用token中间件代替
  const openid = req.body.openid
  try {
    // 获取微信的音频
    const mp3 = await getMedia(mediaId)
    const path = mp3.path
    const name = mp3.name
    const audio = await findOneAudio({ _id:  audioId })
    const { _name, _path } = await downloadFile(audio.url, audio.name)
    const output = mergeAudio(`${_path}/${_name}`, `${path}/${name}`, Path.resolve(__dirname, '../tempFiles', `${name}-merge.mp3`))
    // 删除本地文件
    await removeAudioFile({
      name,
      path: Path.resolve(__dirname, '../tempFiles'),
      type: 'mp3'
    })
    res.json({
      code: 200,
      data: {
        res
      }
    })
  } catch (error) {
    res.json({
      code: 400,
      msg: error.message
    })
  }
}

export {
  saveMedia,
  postChrous
}

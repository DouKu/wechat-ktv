import { getMedia, changeMedia, changeAudioFormat, mergeAudio, removeAudioFile } from '../services/core/chorus-service'
import Path from 'path'

const saveMedia = async (req, res, next) => {
  // 当前的音频
  const mediaId = req.body.mediaId
  // 之前已经录制过的音频(如果有则合并音频)
  const preMedia = req.body.preMediaId
  // TODO 使用token中间件代替
  const openid = req.body.openid
  try {
    // 获取微信的音频
    const mp3 = await getMedia(mediaId)
    const path = mp3.path
    const name = mp3.name
    if (preMedia) {
      // 需要合并音频,先下载七牛云对应的音频，然后合并本地文件
    }
    // 上传本地文件到七牛云, 并更新数据库

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

const getAllXinMusic = async (req, res, next) => {
	
}

export {
  saveMedia
}
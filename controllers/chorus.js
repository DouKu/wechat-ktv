import { saveChorus, findChorus, findOneChorus, updateChorus } from '../services/core/chorus-service'
import { saveAudio, findOneAudio, mergeAudio, removeAudioFile, changeAudioFormat, getMedia } from '../services/core/audio-service'
import { downloadFromQiniu, downloadFile, uploadToQiniu } from '../services/qiniu-oss'
import Path from 'path'

const getChorusByUser = async (req, res, next) => {
  const user = req.user
  console.log(user)
  try {
    const choruses = await findChorus({ owner: user._id }, { updateAt: 'asc' }) || []
    res.json({
      code: 200,
      data: choruses[0] || {}
    })
  } catch (error) {
    res.json({
      code: 500,
      msg: error.message
    })    
  }
}

const getChorus = async (req, res, next) => {
  const chorusId = req.params.id
  try {
    const chorus = await findOneChorus({ _id: chorusId })
    res.json({
      code: 200,
      data: chorus
    })
  } catch (error) {
    res.json({
      code: 500,
      msg: error.message
    })
  }
}

const postChorus = async (req, res, next) => {
  const mediaId = req.body.mediaId
  const audioId = req.body.audioId
  const user = req.user
  console.log(user)
  try {
    // 获取微信的音频
    const mp3 = await getMedia(mediaId)
    const name = mp3.name
    const recordUrl = await uploadToQiniu(Path.resolve(__dirname, '../tempFiles'), `${name}.mp3`)
    const point = parseInt(Math.random() * 1000)
    const chorus = await saveChorus({
      recordUrl,
      recordFileName: name,
      owner: user._id,
      users: [{
        user: user._id,
        extendMessage: {
          point
        }
      }],
      audio: audioId,
      totalScore: point
    })
    // TODO 删除本地文件
    res.json({
      code: 200,
      msg: '录制成功',
      data: {
        chorusId: chorus._id
      }
    })
  } catch (error) {
    console.log(error)
    res.json({
      code: 500,
      msg: error.message
    })
  }
}

const patchChorus = async (req, res, next) => {
  const user = req.user
  console.log(user)
  const chorusId = req.params.id
  console.log('chorusId', chorusId)
  const audioId = req.body.audioId
  const mediaId = req.body.mediaId
  try {
    const mp3 = await getMedia(mediaId)
    const name = mp3.name
    const mergeName = name + '-merge'
    const chorus = findOneChorus({ _id: chorusId })
    if(chorus.owner === user._id) {
      return res.json({
        code: 400,
        msg: '已经无法继续录制'
      })
    }
    await downloadFile (chorus.recordUrl, Path.resolve(__dirname, '../tempFiles'), chorus.recordFileName)
    await mergeAudio(Path.resolve(__dirname, '../tempFiles', `${name}.mp3`), Path.resolve(__dirname, '../tempFiles', `${chorus.recordFileName}.mp3`), Path.resolve(__dirname, '../tempFiles', `${mergeName}.mp3`))
    const recordUrl = await uploadToQiniu(Path.resolve(__dirname, '../tempFiles'), `${mergeName}.mp3`)
    const point = parseInt(Math.random() * 1000)
    const users = chorus.users
    const totalScore = chorus.totalScore + point
    users.push({
      user: user._id,
      extendMessage: {
        point
      }
    })
    await updateChorus({ _id: chorusId }, {
      recordUrl,
      recordFileName: mergeName,
      users,
      totalScore,
      updateAt: Date.now()
    })
    // TODO 删除本地文件
    res.json({
      code: 200,
      msg: '录制成功',
      data: {
        recordUrl
      }
    })
  } catch (error) {
    console.log(error)
    res.json({
      code: 500,
      msg: error.message
    })
  }
}

export {
  postChorus,
  patchChorus,
  getChorus,
  getChorusByUser
}

import { saveChorus, findChorus, findOneChorus, updateChorus } from '../services/core/chorus-service'
import { saveAudio, findOneAudio, mergeAudio, removeAudioFile, changeAudioFormat, getMedia } from '../services/core/audio-service'
import { downloadFromQiniu, downloadFile, uploadToQiniu } from '../services/qiniu-oss'
import { makeRandomSongPoint } from '../services/core/user-service'
import Path from 'path'

const formatPoint = point => {
  point = point + parseInt(Math.random() * 10) + parseFloat(Math.random().toFixed(2))
  if (point > 100) {
    point = parseFloat((100 - parseInt(Math.random() * 10)).toFixed(2))
  } else if (point < 60 && point > 50) {
    point = point + parseFloat((Math.random() * 20).toFixed(2))
  } else if (point < 50) {
    point = point + parseFloat((Math.random() * 25).toFixed(2))
  }
  return parseFloat(point.toFixed(2))
}

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

const getChoruses = async (req, res, next) => {
  try {
    const choruses = await findChorus({ status: true }, { totalScore: 'desc' }, 10) || []
    res.json({
      code: 200,
      data: choruses
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
  const recordText = req.body.recordText
  console.log(recordText)
  const audioId = req.body.audioId
  const user = req.user
  console.log(user)
  try {
    // 获取微信的音频
    const mp3 = await getMedia(mediaId)
    const audio = await findOneAudio({ _id: audioId })
    const name = mp3.name
    const recordUrl = await uploadToQiniu(Path.resolve(__dirname, '../tempFiles'), `${name}.mp3`)
    let point = await makeRandomSongPoint(recordText, audio.lyric.toString())
    point = formatPoint(point)
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
    // await removeAudioFile(name, Path.resolve(__dirname, '../tempFiles', 'mp3'))
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
  const recordText = req.body.recordText
  try {
    const audio = await findOneAudio({ _id: audioId })
    const mp3 = await getMedia(mediaId)
    const name = mp3.name
    const mergeName = name + '-merge'
    const chorus = await findOneChorus({ _id: chorusId })
    if(chorus.owner === user._id) {
      return res.json({
        code: 400,
        msg: '已经无法继续录制'
      })
    }
    await downloadFile (chorus.recordUrl, Path.resolve(__dirname, '../tempFiles'), chorus.recordFileName)
    await mergeAudio(Path.resolve(__dirname, '../tempFiles', `${chorus.recordFileName}.mp3`), Path.resolve(__dirname, '../tempFiles', `${name}.mp3`), Path.resolve(__dirname, '../tempFiles', `${mergeName}.mp3`))
    const recordUrl = await uploadToQiniu(Path.resolve(__dirname, '../tempFiles'), `${mergeName}.mp3`)
    let point = await makeRandomSongPoint(recordText, audio.lyric.toString())
    point = formatPoint(point)
    const users = chorus.users
    const totalScore = chorus.totalScore + point
    let status = false
    if (users.status) {
      res.json({
        code: 400,
        msg: '该合唱人数已满'
      })
      return
    }
    users.push({
      user: user._id,
      extendMessage: {
        point
      }
    })
    if (users.length === 4) {
      status = true
    }
    await updateChorus({ _id: chorusId }, {
      recordUrl,
      recordFileName: mergeName,
      status,
      users,
      totalScore,
      updateAt: Date.now()
    })
    // TODO 删除本地文件
    // await removeAudioFile(name, Path.resolve(__dirname, '../tempFiles', 'mp3'))
    // await removeAudioFile(mergeName, Path.resolve(__dirname, '../tempFiles', 'mp3'))
    res.json({
      code: 200,
      msg: '录制成功',
      data: {
        chorusId: chorusId
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
  getChoruses,
  patchChorus,
  getChorus,
  getChorusByUser
}

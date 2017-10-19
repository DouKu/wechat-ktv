import mongoose from 'mongoose'
import { wechatAPI } from '../../services/wechat/wechat-api'
import { uploadToQiniu } from '../qiniu-oss'
import fs from 'fs'
import Path from 'path'
import ffmpeg from 'fluent-ffmpeg'
import cp from 'child_process'
import request from 'request'
const Audio = mongoose.model('Audios')

const saveAudio = data => {
  return new Audio(data).save()
}

const findOneAudio = filter => {
  return Audio.findOne(filter)
}

const updateAudio = (filter, data, options = {}) => {
  return Audio.findOneAndUpdate(filter, data, options)
}

const findAudio = filter => {
	return Audio.find(filter)
}

const removeAudioFile = (name, path = Path.resolve(__dirname, '../../tempFiles'), type) => {
  return new Promise((resolve, reject) => {
    if(name === '/') {
      return reject(new Error('删除操作有误'))
    }
    cp.exec(`rm -f ${path}/${name}.${type}`, err => {
      if(err) {
        return reject(err)
      }
      return resolve('success')
    })
  })
}

/**
 * 转换arm音频格式为mp3
 */
const changeAudioFormat = ({ name, path = Path.resolve(__dirname, '../../tempFiles'), output = Path.resolve(__dirname, '../../tempFiles'), type = '.amr' }) => {
  return new Promise((resolve, reject) => {
    cp.exec(`ffmpeg -i ${path}/${name}${type} ${output}/${name}.mp3`, err => {
      if(err) {
        return reject(err)
      }
      return resolve({
        path: output,
        type: '.mp3',
        name
      })
    })
  })
}

/**
 * 合并mp3音频
 */
const mergeAudio = (audio1, audio2, output = '') => {
  console.log(audio1, audio2, output)
  return new Promise((resolve, reject) => {
    cp.exec(`ffmpeg -i "concat:${audio1}|${audio2}" -acodec copy ${output}`, (err) => {
      if(err) {
        return reject(err)
      }
      console.log('合并成功', output)
      return resolve(output)
    })
  })
}

/**
 * 把微信获取到的buffer转换为amr文件
 */
const changeMedia = (buffer, { path = Path.resolve(__dirname, '../../tempFiles'), name = '', type = '.amr' }) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${path}/${name}${type}`, buffer, (err) => {
      if(err) {
        return reject(err)
      }
      return resolve({
        path,
        name,
        type
      })
    })
  })
}

/**
 * 微信获取音频数据
 */
const getMedia = mediaId => {
  return new Promise((resolve, reject) => {
    wechatAPI.getMedia(mediaId, async (err, result, res) => {
      if(err) {
        return reject(err)
      }
      const file = await changeMedia(result, { name: mediaId }) 
      await uploadToQiniu(Path.resolve(__dirname, '../../tempFiles'), file.name + '.amr')
      const formatFile = await changeAudioFormat({
        name: file.name
      })
      await uploadToQiniu(Path.resolve(__dirname, '../../tempFiles'), file.name + '.mp3')
      // TODO 删除amr文件
      // await removeAudioFile(mediaId, 'amr')
      return resolve({
        name: formatFile.name,
        path: formatFile.path
      })
    })
  })
}

export {
  saveAudio,
	findOneAudio,
	updateAudio,
	findAudio,
  getMedia,
  mergeAudio,
  changeMedia,
  removeAudioFile,
  changeAudioFormat
}
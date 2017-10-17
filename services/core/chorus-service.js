import { wechatAPI } from '../../services/wechat/wechat-api'
import fs from 'fs'
import Path from 'path'
import ffmpeg from 'fluent-ffmpeg'
import cp from 'child_process'

const removeAudioFile = (name, path = Path.resolve(__dirname, '../../tempFiles'), type) => {
  return new Promise((resolve, reject) => {
    if(name = '/') {
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
    const command = ffmpeg(`${path}/${name}${type}`)
      .on('end', () => {
        console.log('file has been converted succesfully');
      })
      .on('error', err => {
        return reject(err)
      })
      .save(`${output}/${name}.mp3`);
    return resolve({
      path: output,
      type: '.mp3',
      name
    })
  })
}

/**
 * 合并mp3音频
 */
const mergeAudio = (audio1, audio2, output = '') => {
  return new Promise((resolve, reject) => {
    cp.exec(`ffmpeg -i "concat:${audio1}|${audio2}" -acodec copy ${output}`, (err) => {
      if(err) {
        return reject(err)
      }
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
      const formatFile = await changeAudioFormat({
        name: file.name,
      })
      // 删除amr文件
      await removeAudioFile(mediaId, 'amr')
      return resolve({
        name: formatFile.name,
        path: formatFile.path
      })
    })
  })
}
export {
  getMedia,
  mergeAudio,
  changeMedia,
  removeAudioFile,
  changeAudioFormat
}

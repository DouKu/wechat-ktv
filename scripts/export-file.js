import '../nconf'
import '../mongoose'
import mongoose from 'mongoose'
import xlsx from 'node-xlsx'
import fs from 'fs'
import { findUsers } from '../services/core/user-service'
import { findChorus } from '../services/core/chorus-service'
import { findAudio } from '../services/core/audio-service'

const exportUser = async () => {
  let users = await findUsers({})
  let filename = '用户信息' + Date.now() + '.xlsx'
  let sheet = [
    ['序号', '微信昵称', '性别', '用户填写的姓名', '电话号码', '备注']
  ]
  await users.forEach((item, key) => {
    let data = [
      key+1,
      item.nickname,
      item.sex,
      item.realname,
      item.phoneNumber,
      null
    ]
    console.log(data)
    sheet.push(data);
  })
  let buff = xlsx.build([{ name: "sheet1", data: sheet }])
  fs.writeFile('scripts/sheet/' + filename, buff, (err) => {
    if (err) throw err
    console.log("add sheet success");
  })
}


const exportChorus = async () => {
  let chorus = await findChorus({})
  let filename = '合唱信息' + Date.now() + '.xlsx'
  let sheet = [
    ['序号', '合唱歌曲', '总分',
    '创建者/微信昵称',
    '创建者/姓名',
    '创建者/电话号码',
    '备注']
  ]
  await chorus.forEach( async (item, key) => {
    let audioMessage = await findAudio({_id: item.audio})
    let owner = await findUsers({_id: item.owner})
    let data = [
      key+1, audioMessage[0].name, item.totalScore,
      owner[0].nickname, owner[0].name, owner[0].phoneNumber,
      null
    ]
    console.log(data)
    sheet.push(data);
  })
  let buff = xlsx.build([{ name: "sheet1", data: sheet }])
  fs.writeFile('scripts/sheet/' + filename, buff, (err) => {
    if (err) throw err
    console.log("add sheet success");
  })
}

exportUser()
exportChorus()
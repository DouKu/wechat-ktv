import '../nconf'
import '../mongoose'
import mongoose from 'mongoose'
import xlsx from 'node-xlsx'
import fs from 'fs'
import { findUsers, findOneUser } from '../services/core/user-service'
import { findChorus } from '../services/core/chorus-service'
import { findAudio, findOneAudio } from '../services/core/audio-service'

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
    ['序号', '合唱歌曲', '总分', '是否唱完',
		'创建者/微信昵称', '创建者/姓名', '创建者/电话号码',
    '备注']
	]
	let i = 0
	for (let item of chorus) {
		i++
		let owner = await findOneUser({ _id: item.owner })
		let audio = await findOneAudio({ _id: item.audio })
		let finish = item.status ? "是" : "否"
		let buf = [
			i, audio.name, item.totalScore, finish,
			owner.nickname, owner.realname, owner.phoneNumber, null,
		]
		sheet.push(buf)
		console.log(sheet)
	}
  
  let buff = xlsx.build([{ name: "sheet1", data: sheet }])
  fs.writeFile('scripts/sheet/' + filename, buff, (err) => {
    if (err) throw err
    console.log("add sheet success");
  })
}

exportUser()
exportChorus()

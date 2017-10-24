import '../nconf'
import '../mongoose'
import mongoose from 'mongoose'
import xlsx from 'node-xlsx'
import fs from 'fs'
import { findUsers } from '../services/core/user-service'
import { findChorus } from '../services/core/chorus-service'

const exportUser = async () => {
  let users = await findUsers({})
  let filename = '用户信息' + Date.now()
  let sheet = [
    ['序号', '微信昵称', '性别', '用户填写的姓名', '电话号码']
  ]
  await users.forEach((item, key) => {
    let data = [
      key+1,
      item.nickname,
      item.sex,
      item.realname,
      item.phoneNumber
    ]
    sheet.push(data);
  })
  let buff = xlsx.build([{ name: "sheet1", data: sheet }])
  fs.writeFile
}
        var buffer = xlsx.build([{name: "sheet1", data: sheet}]);
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set("Content-Disposition", "attachment;filename=" + encodeURIComponent(filename));
        res.end(buffer);
      }
    });
  },
}

exportUser()
const qiniu = require('qiniu')

let accessKey = 'TQH16oTDMXh1nZgVjdBtdj-hHloZVbCawbOsamG0'
let secretKey = 'd5lswyGYlKbFMzmPLh-8drEPmkVcYXBAyzlrKSvB'
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

let options = {
  scope: "gyblog",
}

let putPolicy = new qiniu.rs.PutPolicy(options)
let uploadToken = putPolicy.uploadToken(mac)

let config = new qiniu.conf.Config()
// 空间对应的机房: 华南机房
config.zone = qiniu.zone.Zone_z2;
// 是否使用https域名
//config.useHttpsDomain = true;
// 上传是否使用cdn加速
//config.useCdnDomain = true;

let localFile = '/home/qill/音乐/死了都要爱.mp3'
let formUploader = new qiniu.form_up.FormUploader(config)
let putExtra = new qiniu.form_up.PutExtra();
let key = '死了都要爱.mp3'

// 文件上传
formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
  if (respErr) {
    throw respErr
  }

  if (respInfo.statusCode == 200) {
    console.log(respBody)
  } else {
    console.log(respInfo.statusCode)
    console.log(respBody)
  }
})
const qiniu = require('qiniu')

let accessKey = 'TQH16oTDMXh1nZgVjdBtdj-hHloZVbCawbOsamG0'
let secretKey = 'd5lswyGYlKbFMzmPLh-8drEPmkVcYXBAyzlrKSvB'
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

let config = new qiniu.conf.Config()

let bucketManager = new qiniu.rs.BucketManager(mac, config)

let publicBucketDomain = 'http://if-pbl.qiniudn.com'
let key = 'icon.jpg'

let publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key)
console.log(publicDownloadUrl)
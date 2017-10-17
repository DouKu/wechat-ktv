const qiniu = require('qiniu')

let accessKey = 'TQH16oTDMXh1nZgVjdBtdj-hHloZVbCawbOsamG0'
let secretKey = 'd5lswyGYlKbFMzmPLh-8drEPmkVcYXBAyzlrKSvB'
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

let config = new qiniu.conf.Config()

let bucketManager = new qiniu.rs.BucketManager(mac, config)

// 获取文件信息
bucketManager.stat('gyblog', '死了都要爱.mp3', (err, respBody, respInfo) => {
	if (err) {
		console.log(err)
	} else {
		if (respInfo.statusCode === 200) {
			console.log(respBody.hash);
      console.log(respBody.fsize);
      console.log(respBody.mimeType);
      console.log(respBody.putTime);
      console.log(respBody.type);
		} else {
      console.log(respInfo.statusCode);
      console.log(respBody.error);
    }
	}
})
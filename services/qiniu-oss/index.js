import qiniu from 'qiniu'
import nconf from 'nconf'
import crypto from 'crypto'
import request from 'request'
import Path from 'path'
import fs from 'fs'

qiniu.conf.ACCESS_KEY = nconf.get('qiniu').ACCESS_KEY
qiniu.conf.SECRET_KEY = nconf.get('qiniu').SECRET_KEY
const mac = new qiniu.auth.digest.Mac(nconf.get('qiniu').ACCESS_KEY, nconf.get('qiniu').SECRET_KEY)
const options = {
  scope: nconf.get('qiniu').Bucket_Name,
}
const putPolicy = new qiniu.rs.PutPolicy(options)

const getUptoken = (req, res, next) => {
  let key = crypto.createHash('md5').update(((new Date()) * 1 + Math.floor(Math.random() * 10).toString())).digest('hex') + '-' + req.query.fileName
  let url = nconf.get('qiniu').Domain
  let uptoken = new qiniu.rs.PutPolicy(nconf.get('qiniu').Bucket_Name + ':' + key)
  let token = uptoken.token()
  res.header("Cache-Control", "max-age=0, private, must-revalidate")
  res.header("Pragma", "no-cache")
  res.header("Expires", 0)
  if (token) {
    res.json({
      uptoken: token,
      key,
      url
    })
  }
}

/**
 * 上传文件到七牛云
 * @param {文件夹路径} dir 
 * @param {文件名} fileName 
 */
const uploadToQiniu = (dir, fileName) => {
  let uploadToken = putPolicy.uploadToken(mac)
  let config = new qiniu.conf.Config()
  // 空间对应的机房: 华南机房
  config.zone = qiniu.zone.Zone_z2;
  // 是否使用https域名
  //config.useHttpsDomain = true
  // 上传是否使用cdn加速
  //config.useCdnDomain = true
  let localFile = dir + '/' + fileName
  let formUploader = new qiniu.form_up.FormUploader(config)
  let putExtra = new qiniu.form_up.PutExtra()
  let bucketManager = new qiniu.rs.BucketManager(mac, config)
  let key = fileName
  // 文件上传
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        return reject(respErr)
      }
      let publicBucketDomain = 'http://os32fgzvj.bkt.clouddn.com'
      let publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key)
      console.log(fileName, ' 上传成功')
      return resolve(publicDownloadUrl)
    })
  })
}

/**
 * 检测文件
 * @param {string} fileName 
 */
const checkfile = fileName => {
	return new Promise((resolve, reject) => {
		try {
			let config = new qiniu.conf.Config()
			let bucketManager = new qiniu.rs.BucketManager(mac, config)
			let key = fileName
			bucketManager.stat(nconf.get('qiniu').Bucket_Name, key, (err, respBody, respInfo) => {
				if (err) {
					return reject(err)
				} else {
					if (respInfo.statusCode === 200) {
						return resolve(true)
					} else {
						return resolve(false)
					}
				}
			})
		} catch (err) {
			return reject(err)
		}
	})
}

/**
 * 文件下载
 */
const downloadFile = (url, filePath, fileName) => {
  return new Promise((resolve, reject) => {
    let stream = fs.createWriteStream(`${filePath}/${fileName}.mp3`);
    request(url).pipe(stream).on('close', err => {
      if(err) {
        return reject(err)
      }
      console.log('下载完成')
      return resolve()
    }); 
  })
}

export {
  getUptoken,
  uploadToQiniu,
  checkfile,
  downloadFile
}
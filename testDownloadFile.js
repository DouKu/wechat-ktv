import Promise from 'bluebird'
import fs from 'fs'
const request = require('request')
const downloadFile = async() => {
  const url = 'http://os32fgzvj.bkt.clouddn.com/Elvins.J%20-%20Conan%C2%A0Rock%C2%A0%28%E6%91%87%E6%BB%9A%E7%89%88%E5%90%8D%E4%BE%A6%E6%8E%A2%E6%9F%AF%E5%8D%97%E4%B8%BB%E9%A2%98%E6%9B%B2%29.mp3'
  const stream = request.get(url).pipe(fs.createWriteStream('./test.mp3'))
  stream.on('error', (error) => {
    console.log('error')
  })
  stream.on('finish', () => {
    console.log('finish')
  });
}

downloadFile()


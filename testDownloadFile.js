import Promise from 'bluebird'
import fs from 'fs'
import request from 'request'
import Path from 'path'
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

const test = async () => {
  await downloadFile('http://os32fgzvj.bkt.clouddn.com/Elvins.J%20-%20Conan%C2%A0Rock%C2%A0%28%E6%91%87%E6%BB%9A%E7%89%88%E5%90%8D%E4%BE%A6%E6%8E%A2%E6%9F%AF%E5%8D%97%E4%B8%BB%E9%A2%98%E6%9B%B2%29.mp3', `${Path.resolve(__dirname, './tempFiles')}`, 'test')
  console.log('完成')
}

test()

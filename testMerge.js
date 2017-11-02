const cp = require('child_process')

const mergeAudio = (audio1, audio2, output = 'output.mp3') => {
  return new Promise((resolve, reject) => {
    console.log(__dirname)
    cp.exec(`cd ${__dirname} && ffmpeg -i "concat:${audio1}|${audio2}" -acodec copy ${output}`, (err) => {
      if(err) {
        return reject(err)
      }
      console.log(output)
      return resolve(output)
    })
  })
}

try {
  mergeAudio('music1.mp3', 'music2.mp3')
} catch (error) {
  // console.log(error)  
}
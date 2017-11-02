const ffmpeg = require('fluent-ffmpeg')
const command = ffmpeg('./test.amr')
  .on('end', () => {
    console.log('file has been converted succesfully');
  })
  .on('error', err => {
    console.log('an error happened: ' + err.message);
  })
  .save('./content.mp3');


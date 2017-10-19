import mongoose from 'mongoose'
const Users = mongoose.model('Users')

const saveUser = data => {
  return new Users(data).save()
}

const findUsers = (filter, options={}) => {
  return Users.find(filter, null, options).select({
    access_token: 0,
    refresh_token: 0
  })
}

const findOneUser = filter => {
  return Users.findOne(filter).select({
    access_token: 0,
    refresh_token: 0
  })
}

const updateUser = (filter, data) => {
  return Users.findOneAndUpdate(filter, data).select({
    access_token: 0,
    refresh_token: 0
  })
}

const makeRandomSongPoint = (audioStr, lyric) => {
  return new Promise((resolve, reject) => {
    try {
      // 正则去除标点符号
      audioStr = audioStr.replace(/[!！,。，.\?？]/g, "")
      lyric = lyric.replace(/[!！,，.。\?？]/g, "")
      let re = new RegExp("(?=.*?)[^" + audioStr +"](?=.*?)|(?=.*?)[^" + lyric + "](?=.*?)", "g");
      let differentNum = 0;
      while (re.exec(audioStr + lyric)) differentNum++
      let proportion = ((audioStr + lyric).length - differentNum) / (audioStr + lyric).length;
      // 获取低分比较容易
      if (proportion > 0.4) {
        return resolve(proportion * 1500);
      } else {
        return resolve(proportion * 1000);
      }
    } catch (err) {
      return reject(err)
    }
  })
}

export {
  saveUser,
  findUsers,
	findOneUser,
	updateUser,
  makeRandomSongPoint
}
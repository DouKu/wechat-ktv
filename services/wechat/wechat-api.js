import WeChatAPI from 'wechat-api'
import mongoose from 'mongoose'
const AccessToken = mongoose.model('AccessToken');

import nconf from 'nconf'
const wechatAPI = new WeChatAPI(nconf.get('wechat:appId'), nconf.get('wechat:appSecret'), function (cb) {
  AccessToken.findOne({type: 'wechat'}).then(function (result) {
    if (!result) {
      return cb()
    }
    console.log('read token from mongoose:' + result.token)
    cb(null, result.token);
  }).catch(function (err) {
    cb(err);
  })
}, function (token, cb) {
  console.log('createToken:' + token)
  AccessToken.update({type: 'wechat'}, {token: token, updateAt: new Date()}, {upsert: true}).then(function (result) {
    cb(null, result);
  }).catch(function (err) {
    cb(err);
  })
});

export {
  wechatAPI
}

import nconf from 'nconf'
import Promise from 'bluebird'
const request = Promise.promisifyAll(require('request'));

const getToken = async (code) => {
  const url = `${nconf.get('wechat:baseUrl')}/sns/oauth2/access_token?appid=${nconf.get('wechat:appId')}&secret=${nconf.get('wechat:appSecret')}&code=${code}&grant_type=authorization_code`;
  const res = await request.getAsync({
    url,
    json: true
  })
  const body = res.body
  if (!body.access_token) {
    return Promise.reject(new Error(body.errcode +'/'+ body.errmsg))
  }
  return body
}
const getUserInfo =async (token, openid) => {
  const url = `${nconf.get('wechat:baseUrl')}/sns/userinfo?access_token=${token}&openid=${openid}&lang=zh_CN`
  const res = await request.getAsync({
    url,
    json: true
  })
  const body = res.body
  if(!body.openid) {
    return Promise.reject(new Error(body.errcode +'/'+ body.errmsg))
  }
  return body
}

export {
  getToken,
  getUserInfo
}
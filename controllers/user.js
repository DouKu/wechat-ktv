/**
 * 用户
 */
import { findUsers, saveUser, updateUser } from '../services/core/user-service'

/**
 * 根据微信返回信息保存用户信息 post
 * @param {} req 
 * @param {} res 
 * @param {} next 
 */
const saveUserMessage = async (req, res, next) => {
  try{
    await saveUser({
      openid: req.body.openid,
      nickname: req.body.nickname,
      sex: req.body.sex,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      headimgurl: req.body.headimgurl,
      privilege: req.body.privilege,
      access_token: req.body.access_token,
      refresh_token: req.body.refresh_token,
      totalScore: req.body.totalScore,
      realname: req.body.realname,
      phoneNumber: req.body.phoneNumber
    })
    return res.json({ code: 200, msg: "create user success!" })
  } catch (error) {
    return res.json({ code: 400, msg: error.message })
  }
}

/**
 * 更新用户信息 put
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateUser = async (req, res, next) => {
  try{
    const openid = req.params.openid
    await updateUser({openid: openid}, {$set: req.body})
    return res.json({ code: 200, msg: "update user by openid success" })
  } catch (error) {
    return res.json({ code: 400, msg: error.message })
  }
}

export {
  saveUserMessage,
  updateUser
}
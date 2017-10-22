import { saveUserMessage, updateUser } from '../controllers/user'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
  authRouter.post('/createUser', saveUserMessage)
  authRouter.put('/updateUser/:openid', updateUser)
}
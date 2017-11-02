import { getUsers, saveUserMessage, updateUserMessage } from '../controllers/user'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
  authRouter.get('/getUsers', getUsers)
  authRouter.post('/saveUserMessage', saveUserMessage)
  authRouter.put('/updateUserMessage/:openid', updateUserMessage)
}
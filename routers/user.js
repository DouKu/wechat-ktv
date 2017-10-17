import { getRank } from '../controllers/user'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
  authRouter.get('/user/getRank', getRank)
}
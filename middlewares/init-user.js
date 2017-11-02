import { findOneUser } from '../services/core/user-service'

export const initUser = async (req, res, next) => {
  if (req.body.openid || req.query.openid || req.params.openid) {
    const user = await findOneUser({ openid: req.body.openid || req.query.openid || req.params.openid })
    req.user = user
  }
  next()
}
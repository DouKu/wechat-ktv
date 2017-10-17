/**
 * 用户
 */
import { findUsers } from '../services/core/user-service'

const getRank = async (req, res, next) => {
  try {
    let rankUsers = await findUsers({}, { sort: {totalScore: -1}, limit: 10 })
    return res.json({ code:200, data: rankUsers })
  } catch (err) {
    return res.json({ code:400, msg: err.message })
  }
}

export {
  getRank
}
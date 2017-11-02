import {getUptoken} from '../services/qiniu-oss'
module.exports = (router, commonRouter, authRouter) => {
  authRouter.get('/uptoken', getUptoken);
}
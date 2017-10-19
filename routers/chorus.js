import nconf from 'nconf'
import { getChorusByUser, getChorus, postChorus, patchChorus } from '../controllers/chorus'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
	authRouter.get('/chorus', getChorusByUser)
	authRouter.get('/chorus/:id', getChorus)
	authRouter.post('/chorus', postChorus)
	authRouter.put('/chorus/:id', patchChorus)
}
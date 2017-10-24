import nconf from 'nconf'
import { getChoruses, getChorusByUser, getChorus, postChorus, patchChorus } from '../controllers/chorus'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
	authRouter.get('/chorus/rank', getChoruses)
	authRouter.get('/chorus', getChorusByUser)
	authRouter.get('/chorus/:id', getChorus)
	authRouter.post('/chorus', postChorus)
	authRouter.patch('/chorus/:id', patchChorus)
}
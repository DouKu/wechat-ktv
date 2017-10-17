import nconf from 'nconf'
import { postchorus } from '../controllers/chorus'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
	// authRouter.get('/chorus', getAllXinMusic)
	authRouter.post('/chorus', postchorus)
	// authRouter.put('/chorus', updateXinMusic)
}
import nconf from 'nconf'
import { postChrous } from '../controllers/chorus'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
	// authRouter.get('/chrous', getAllXinMusic)
	authRouter.post('/chrous', postChrous)
	// authRouter.put('/chrous', updateXinMusic)
}
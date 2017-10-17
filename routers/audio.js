import nconf from 'nconf'
import { getAllXinMusic, addXinMusic } from '../controllers/audio'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
	commonRouter.get('/audio', getAllXinMusic)
	commonRouter.post('/audio', addXinMusic)
}
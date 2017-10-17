import nconf from 'nconf'
import { getAllXinMusic, addXinMusic, updateXinMusic } from '../controllers/audio'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
	commonRouter.get('/audio', getAllXinMusic)
	commonRouter.post('/audio', addXinMusic)
	commonRouter.put('/audio', updateXinMusic)
}
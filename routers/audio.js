import nconf from 'nconf'
import { getAllXinMusic, addXinMusic, updateXinMusic } from '../controllers/audio'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
	authRouter.get('/audio', getAllXinMusic)
	authRouter.post('/audio', addXinMusic)
	authRouter.put('/audio', updateXinMusic)
}
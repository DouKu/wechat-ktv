import nconf from 'nconf'
import { getAllXinMusic, addXinMusic, updateXinMusic, getOneXinMusic } from '../controllers/audio'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
	authRouter.get('/audio', getAllXinMusic)
	authRouter.get('/audio/:id', getOneXinMusic)
	authRouter.post('/audio', addXinMusic)
	authRouter.put('/audio', updateXinMusic)
}
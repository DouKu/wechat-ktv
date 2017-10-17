import nconf from 'nconf'
import { getAllXinMusic } from '../controllers/audio'

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
	commonRouter.get('/audio', getAllXinMusic);
}
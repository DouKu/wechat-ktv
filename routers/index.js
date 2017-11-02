import { vertifyToken } from '../middlewares/auth-verification'
import { initUser } from '../middlewares/init-user'

class RouterIndex {
  constructor (express) {
    this._router = express.Router();
    this._authRouter = express.Router();
    this._commonRouter = express.Router();
    this._wechatRotuer = express.Router();
    this._authRouter.use(initUser)
    /**
     * 路由编写
     */
    // this._authRouter.use(vertifyToken);
    require('./qiniu-oss')(this._router, this._commonRouter, this._authRouter, this._wechatRotuer);
    require('./wechat')(this._router, this._commonRouter, this._authRouter, this._wechatRotuer);
    require('./audio')(this._router, this._commonRouter, this._authRouter, this._wechatRotuer);
    require('./chorus')(this._router, this._commonRouter, this._authRouter, this._wechatRotuer);
    require('./user')(this._router, this._commonRouter, this._authRouter, this._wechatRotuer);
  }

  /**
   * 资源路由 
   */
  router () {
    return this._router;
  }
  /**
   * 鉴权路由 
   */
  authRouter () {
    return this._authRouter;
  }
  /**
   * 普通路由
   */
  commonRouter () {
    return this._commonRouter;
  }
  /**
   * 微信路由
   */
  wechatRotuer() {
    return this._wechatRotuer;
  }
}

module.exports = RouterIndex;

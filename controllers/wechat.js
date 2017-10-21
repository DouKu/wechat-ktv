import jwt from 'jsonwebtoken'
import nconf from 'nconf'
import { getToken, getUserInfo} from '../services/wechat/wechat-sns'
import { saveUser, findOneUser } from '../services/core/user-service'
import { wechatAPI } from '../services/wechat/wechat-api'

const getJSConfig = (req, res, next) => {
  const jsApiList = [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'configWXDeviceWiFi',
    'getWXDeviceTicket',
    'openWXDeviceLib',
    'closeWXDeviceLib',
    'getWXDeviceInfos'
  ];
  const param = {
    debug: nconf.get('wechat:debug'), // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: nconf.get('wechat:appId'), // 必填，公众号的唯一标识
    jsApiList: jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    url: req.query.url
  }
  wechatAPI.getJsConfig(param, (err, result) => {
    if (err) {
      res.json({
        code: 400,
        msg: err
      })
    }
    res.json({
      code: 200,
      data: result
    });
  })
}

const exchangeToken = async (req, res, next) => {
  const code = req.body.code
  try {
    const body = await getToken(code)
    const refresh_token = body.refresh_token
    const access_token = body.access_token
    const openid = body.openid
    const userInfo = await getUserInfo(access_token, openid)
    const user = await findOneUser({ openid })
    if (!user) {
      await saveUser({
        ...userInfo,
        refresh_token,
        access_token
      })
    }
    const token = jwt.sign({
      user: JSON.parse(JSON.stringify(userInfo)),
      exp: Date.now()
    }, nconf.get('secret'))
    res.json({
      code: 200,
      msg: '微信登录成功',
      data: {
        openid,
        token
      }
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      code: 400,
      msg: error.message
    })
  }
}

export {
  exchangeToken,
  getJSConfig
}
import '../nconf'
import '../mongoose'
import mongoose from 'mongoose'
import { wechatAPI } from '../services/wechat/wechat-api'
import moment from 'moment'
const sendWxMsg = (openid, name) => {
  const text = `恭喜您，得到了5张优惠券！
领取人：${name}
赠品：消费满1万送1万；进口玻尿酸免费送；双眼皮特价2880元；假体隆鼻特价3800元；高端进口假体丰胸特价29800元。
领取时间：${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}
凭此信息可到本院使用享受优惠。使用时间截止至2017年11月30日。`
  wechatAPI.sendText(openid, text, (err, res) => {
    if (err) {
      console.log('error',  err)
    }
    console.log(res)
  })
}
sendWxMsg('oWU1Fw8DEz3GA6pyJEXAglmI-Ra4', 'Sky光裕')
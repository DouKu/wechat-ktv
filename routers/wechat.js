import { exchangeToken, getJSConfig } from '../controllers/wechat';
import nconf from 'nconf'
const crypto = require("crypto");

module.exports = (router, commonRouter, authRouter, wechatRouter) => {
  wechatRouter.post('/exchangeToken', exchangeToken);
  wechatRouter.get('/getJSConfig', getJSConfig);
  wechatRouter.get('/', function(req, res) {
    let signature = req.query.signature,
      timestamp = req.query.timestamp,
      nonce = req.query.nonce,
      echostr = req.query.echostr;
    let array = [nconf.get('wechat:token'), timestamp, nonce];
    array.sort();
    let tempStr = array.join("");
    const hashCode = crypto.createHash("sha1");
    let resultCode = hashCode.update(tempStr, "utf8").digest("hex");
    if (resultCode === signature) {
      res.send(echostr);
    } else {
      res.send("mismatch");
    }
  });
};

export default {
  port: 3001,
  mongodb: 'mongodb://localhost/meilai',
  host: '0.0.0.0',
  secret: 'meilai',
  qiniu: {
    ACCESS_KEY: 'TQH16oTDMXh1nZgVjdBtdj-hHloZVbCawbOsamG0',
    SECRET_KEY: 'd5lswyGYlKbFMzmPLh-8drEPmkVcYXBAyzlrKSvB',
    Bucket_Name: 'gyblog',
    Port: 80,
    Domain: 'http://os32fgzvj.bkt.clouddn.com/'
  },
  wechat: {
    baseUrl: 'https://api.weixin.qq.com',
    appId: 'wxed73c69d3bdf1dce',
    appSecret: 'd4624c36b6795d1d99dcf0547af5443d',
    scope: 'snapi_userinfo',
    state: 'state',
    token: 'meilaiToken',
    wechatDNS: 'http://znq.gzmylike.com',
    debug: false
  }
}
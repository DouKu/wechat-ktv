import nconf from 'nconf'
nconf.argv()

const CNF_PATH = nconf.get('CNF_PATH')
// 命令行参数CNF_PATH优先
// 环境变量NODE_ENV后备
// development作为NODE_ENV的默认参数

if (CNF_PATH) {
  // 参数传递配置文件的启动方式
  // node index.js --CNF_PATH=../test/config.coding.js
  module.exports = require(CNF_PATH)
} else {
  // 环境变量传递配置文件中缀的启动方式
  // export NODE_ENV=production && node index.js
  nconf.env()
  const NODE_ENV = nconf.get('NODE_ENV') || 'development'
  module.exports = require(`${__dirname}/config.${NODE_ENV}.js`)
}

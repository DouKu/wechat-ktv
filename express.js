import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'
import nconf from 'nconf'
import RouterIndex from './routers'
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const routerIndex = new RouterIndex(express);
app.use('/', routerIndex.router());
app.use('/api', routerIndex.commonRouter());
app.use('/api/auth', routerIndex.authRouter());
app.use('/api/wechat', routerIndex.wechatRotuer());

app.listen(nconf.get('port') || 3000, nconf.get('host'), () => {
  console.log(`Server running at http://${nconf.get('host')}:${nconf.get('port') || 3000}`);
});

import nconf from 'nconf'
import jwt from 'jsonwebtoken'
import Promise from 'bluebird'

export const vertifyToken = async (req, res, next) => {
  let token = null;
  let verify = Promise.promisify(jwt.verify);
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }
  if (!token) {
    res.status(401).end();
  }
  try {
    let decoded = await verify(token, nconf.get('secret'))
    if (decoded) {
      req.user = decoded.user
      next()
    }
  } catch (err) {
    res.status(401).end();
  }
}

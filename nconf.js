'use strict';
import config from './config'
import nconf from 'nconf'

nconf.overrides(config)

export default nconf

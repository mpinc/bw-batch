/**
 * Created by ling xue on 14-11-18.
 */

var sysConfig = require('../config/SystemConfig.js');


function createLogger(name){
    var log4js = require('log4js');
    log4js.configure(sysConfig.loggerConfig);
    var logger = log4js.getLogger(name);
    logger.setLevel('DEBUG');
    return logger;
}

///-- Exports

module.exports = {

    createLogger : createLogger
};

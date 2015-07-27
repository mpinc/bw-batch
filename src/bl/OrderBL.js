/**
 * Created by ling  xue  on 14-11-19.
 */
var orderDao = require('../dao/OrderDAO.js');
var systemDef = require('../util/SystemDef.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('StatDate.js');

function setOrderExpired(callback){
    var params ={};
    var currentDate = new Date();
    var expiredNum = currentDate.getTime() - systemDef.ORDER_EXPIRED_TIME;
    var expiredDate = new Date(expiredNum);
    params.expireDate = expiredDate;

    orderDao.doOrderExpired(params,function(err,result){
        logger.debug(' setOrderExpired ' );
        callback(err,result);
    })
}




module.exports = {
    setOrderExpired : setOrderExpired
}
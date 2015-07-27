/**
 * Created by ling xue on 15-7-27.
 */

var paymentDao = require('../dao/PaymentDao.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('PaymentDAO.js');


function autoAddPaymentStatByDay(params,callback){
    paymentDao.addPaymentStatByDay(params,function(error,result){
        logger.info(' autoAddPaymentStatByDay ' );
        callback(error,result);
    })
}

module.exports = {
    autoAddPaymentStatByDay :autoAddPaymentStatByDay
}
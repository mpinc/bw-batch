var db = require('../config/MysqlConnection.js');
var mdb = require('../config/MongodbConnection.js');
var wechatUtil = require('../util/WechatUtil.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('PaymentDAO.js');


function addPaymentStatByDay(params,callback){
    var query=' insert into stat_payment (date_id ,total_amount ,amount,fee ,order_count ) ' +
        ' select ? as date_id ,ifnull(sum(payment_actual),0) total_amount  , ' +
        ' (?*ifnull(sum(payment_actual),0)) as actual_amount,?*ifnull(sum(payment_actual),0) fee, ' +
        ' count(distinct(order_id)) order_count  from order_payment where date_id = ? ' ;

    var paramArr = [], i = 0;
    paramArr[i++] = params.dateId;
    paramArr[i++] = wechatUtil.WECHAT_PAYMENT_BACK_RATE;
    paramArr[i++] = wechatUtil.WECHAT_SERVICE_FEE_RATE;

    paramArr[i++] = params.dateId;
    db.dbQuery(query,paramArr,function(error,result){
        logger.debug(' addPaymentStatByDay ')
        return callback(error,result);
    });

}



module.exports = {
    addPaymentStatByDay : addPaymentStatByDay
}
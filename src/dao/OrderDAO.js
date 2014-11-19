/**
 * Created by ling xue on 14-11-18.
 */


var db = require('../config/MysqlConnection.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('OrderDAO.js');


function doOrderExpired(params,callback){
    var query='update order_info set status = 109 where (status<>101 or status<>109) and order_start < ?' ;
    var paramArray=[],i=0;
    paramArray[i]= params.expireDate;
    db.dbQuery(query,paramArray,function(error,result){
        logger.debug(' doOrderExpired ')
        return callback(error,result);
    });

}

module.exports = {
    doOrderExpired : doOrderExpired
}
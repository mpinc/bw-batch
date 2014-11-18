/**
 * Created by ling xue on 14-6-6.
 */

var customerDao = require('../dao/CustomerDAO.js');
var dateUtil = require('../util/DateUtil.js');

var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('CustomerCheckInStat.js');

function doCustomerCheckInStat(callback){
    var params = dateUtil.getDayRangeLong();
    customerDao.getCheckInCountByDay(params,function(err,record){
        logger.debug(' doCustomerCheckInStat ');
        callback(err,record);
    });

}

function saveCustomerCheckInRes(records,dateId,callback){
    for(var i= 0,j=records.length; i<j; i++){

        customerDao.saveCheckInCountByDay(records[i],dateId,function(err,result){
            if(err){
               logger.debug(' saveCustomerCheckInRes '+err.message);
               callback(err,null);
            }
        });
    }
    logger.debug(' saveCustomerCheckInRes ');
    callback(null,true);
}

module.exports = {
    doCustomerCheckInStat : doCustomerCheckInStat,
    saveCustomerCheckInRes : saveCustomerCheckInRes
}

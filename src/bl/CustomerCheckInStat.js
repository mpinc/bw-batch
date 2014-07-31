/**
 * Created by ling xue on 14-6-6.
 */

var customerDao = require('../dao/CustomerDAO.js');
var dateUtil = require('../util/DateUtil.js');

function doCustomerCheckInStat(callback){
    var params = dateUtil.getDayRangeLong();
    customerDao.getCheckInCountByDay(params,function(err,record){
        callback(err,record);
    });

}

function saveCustomerCheckInRes(records,dateId,callback){
    for(var i= 0,j=records.length; i<j; i++){

        customerDao.saveCheckInCountByDay(records[i],dateId,function(err,result){
            if(err){
               callback(err,null);
            }
        });
    }
    callback(null,true);
}

module.exports = {
    doCustomerCheckInStat : doCustomerCheckInStat,
    saveCustomerCheckInRes : saveCustomerCheckInRes
}

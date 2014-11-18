/**
 * Created by ling xue on 14-5-30.
 */
var menuItemDao = require('../dao/MenuItemDAO.js');
var dateUtil = require('../util/DateUtil.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('BizMenuStat.js');

function doMenuClickStat(callback){
    var params = dateUtil.getDayRangeLong();
    menuItemDao.getMenuViewByDay(params,function(err,record){
        logger.debug(' doMenuClickStat ');
        callback(err,record);

    });

}

function saveMenuViewResult(records,dateId,callback){
    for(var i= 0,j=records.length; i<j; i++){

        menuItemDao.saveMenuViewResult(records[i],dateId,function(err,result){
            if(err){
                logger.err(' saveMenuViewResult ' +err.message);
                callback(err,null);
            }
        });
    }
    logger.debug(' saveMenuViewResult ');
    callback(null,true);

}

function doMenuOrderStat(callback){
    var params = dateUtil.getDayRangeLong();
    menuItemDao.getMenuOrderByDay(params,function(err,record){
        logger.debug(' doMenuOrderStat ' );
        callback(err,record);

    });
}

function saveMenuOrderResult(records,dateId,callback){
    for(var i= 0,j=records.length; i<j; i++){

        menuItemDao.saveMenuOrderResult(records[i],dateId,function(err,result){
            if(err){
                logger.error(' saveMenuOrderResult ' + err.message);
                callback(err,null);
            }
        });
    }
    logger.debug(' saveMenuOrderResult ');
    callback(null,true);

}

module.exports = {
    doMenuClickStat : doMenuClickStat,
    saveMenuViewResult : saveMenuViewResult,
    doMenuOrderStat : doMenuOrderStat,
    saveMenuOrderResult : saveMenuOrderResult
}
/**
 * Created by ling xue on 14-6-11.
 */

var statDateDao = require('../dao/StatDateDAO.js');
var dateUtil = require('../util/DateUtil.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('StatDate.js');

function saveStatDate(callback){
    var dateObj = {};
    var today = new Date();
    dateObj.day = today.getDate();
    dateObj.month = today.getMonth()+1;
    dateObj.year = today.getFullYear();
    dateObj.week = dateUtil.getWeekByDate();
    dateObj.yearMonth = Number(dateObj.year+""+dateObj.month);
    dateObj.yearWeek = Number(dateObj.year+""+dateObj.week);
    statDateDao.insertNewDate(dateObj,function(err,result){
        logger.debug(' saveStatDate ' );
        callback(err,result);
    })

}

module.exports = {
    saveStatDate : saveStatDate
}
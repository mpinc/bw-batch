/**
 * Created by ling xue on 14-5-30.
 */
var menuItemDao = require('../dao/MenuItemDAO.js');
var dateUtil = require('../util/DateUtil.js');

function doMenuClickStat(callback){
    var params = dateUtil.getDayRangeLong();
    menuItemDao.getMenuViewByDay(params,function(err,record){
        callback(err,record);

    });

}

function saveMenuViewResult(records,dateId,callback){
    for(var i= 0,j=records.length; i<j; i++){

        menuItemDao.saveMenuViewResult(records[i],dateId,function(err,result){
            if(err){
                callback(err,null);
            }
        });
    }
    callback(null,true);

}

module.exports = {
    doMenuClickStat : doMenuClickStat,
    saveMenuViewResult : saveMenuViewResult
}
/**
 * Created by ling xue on 14-6-11.
 */

var db = require('../config/MysqlConnection.js');
var Seq = require('seq');

var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('StatDateDAO.js');

var insertNewDate = function(params,callback){

    var querySelect = "select * from date_dimension dd where " +
        "dd.day=? and dd.week=? and dd.month=? and dd.year=? and dd.year_month=? and dd.year_week=? "

    var query='insert into date_dimension (`day`,`week`,`month`,`year`,`year_month`,`year_week`) values (?,?,?,?,?,?);'
    var paramArray=[],i=0;
    paramArray[i++]=params.day;
    paramArray[i++]=params.week;
    paramArray[i++]=params.month;
    paramArray[i++]=params.year;
    paramArray[i++]=params.yearMonth;
    paramArray[i]=params.yearWeek;
    Seq().seq(function(){
        var that = this;
        db.dbQuery(querySelect,paramArray,function(error,rows){
            logger.debug(' insertNewDate ')
            if(rows != null && rows.length>0){
                logger.warn(' insertNewDate ' + 'failed')
                return callback(null,{success:false});

            }else{
                that();
            }

        });

    }).seq(function(){
            db.dbQuery(query,paramArray,function(error,rows){
                logger.debug(' insertNewDate ')
                callback(error,rows);

            });


        })


}

module.exports = {
    insertNewDate : insertNewDate
}
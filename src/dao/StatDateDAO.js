/**
 * Created by ling xue on 14-6-11.
 */

var db = require('../config/MysqlConnection.js');
var Seq = require('seq');

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
        db.getCon(function (err,con){
            con.query(querySelect, paramArray,function (error, rows) {
                if (error){
                    con.rollback();
                }
                con.release();
                if(rows != null && rows.length>0){
                    return callback(null,{success:false});

                }else{
                    that();
                }
            });
        });
    }).seq(function(){
            db.getCon(function (err,con){
                con.query(query, paramArray,function (error, result) {
                    if (error){
                        con.rollback();
                    }
                    con.release();
                    if (error){
                        return callback(error,null);
                    }else{
                        return callback(null,Number(result.insertId));
                    }
                });
            });
        })


}

module.exports = {
    insertNewDate : insertNewDate
}
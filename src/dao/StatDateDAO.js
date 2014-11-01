/**
 * Created by ling xue on 14-6-11.
 */

var db = require('../config/MysqlConnection.js');

var insertNewDate = function(params,callback){

    var query='insert into date_dimension (`day`,`week`,`month`,`year`,`year_month`,`year_week`) values (?,?,?,?,?,?);'
    var paramArray=[],i=0;
    paramArray[i++]=params.day;
    paramArray[i++]=params.week;
    paramArray[i++]=params.month;
    paramArray[i++]=params.year;
    paramArray[i++]=params.yearMonth;
    paramArray[i]=params.yearWeek;
    db.getCon(function (err,con){
        var dateTemp = new Date();
        console.log(dateTemp.toLocaleDateString(),"-",dateTemp.toLocaleTimeString() ,"--insert date id");
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

}

module.exports = {
    insertNewDate : insertNewDate
}
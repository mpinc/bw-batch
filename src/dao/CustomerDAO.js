/**
 * Created by ling xue on 14-5-30.
 */
var db = require('../config/MysqlConnection.js');
var mdb = require('../config/MongodbConnection.js');


/**
 * Get yesterday data that customer check in business count
 * From mongodb
 */
var getCheckInCountByDay = function(params,callback){

    mdb.getDb(function (error, db) {
        if (error) {
            callback(error , null);
        }
        db.collection('api_records').group({
                "params.bizId" : true
            },
            {
                "method" : "POST",
                "time":{$lte: params.end,$gt:params.start},
                "bizId" : null,
                "path" : "/cust/:custId/biz/:bizId/checkin"
            },
            {count:0},
            function (doc, out) {
                out.count +=1

            },
            function (out) {
                return out;
            },
            function(err, results) {
                mdb.closeDB();
                callback(err,results);

            });

    });
}


var saveCheckInCountByDay = function (params,dateId,callback){

    /*mdb.getDb(function (error, db) {
        if (error) {
            callback(error , null);
        }
        db.collection('checkInRecord').insert(records,function(err,result){
            mdb.closeDB();
            callback(err,result);
        });
    });*/

    var query='insert into stat_cust_checkin (biz_id,count,date_id) values(?,?,?);'
    var paramArray=[],i=0;
    paramArray[i++]=params.bizId;
    paramArray[i++]=params.count;
    paramArray[i]=dateId;
    db.getCon(function (err,con){
        //console.log(query);
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
    getCheckInCountByDay : getCheckInCountByDay,
    saveCheckInCountByDay : saveCheckInCountByDay
}
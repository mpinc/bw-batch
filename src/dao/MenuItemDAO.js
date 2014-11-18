/**
 * Created by ling xue on 14-5-30.
 */

var db = require('../config/MysqlConnection.js');
var mdb = require('../config/MongodbConnection.js');

var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('MenuItemDAO.js');
/**
 * Get yesterday data that customer view menu item detail
 * From mongodb
 */
var getMenuViewByDay = function(params,callback){



    mdb.getDb(function (error, db) {
        if (error) {
            callback(error , null);
        }
        db.collection('api_records').group(
            {
                "params.id" : true,
                "params.bizId" : true
            },
            {
                "method" : "GET",
                "time":{$lte: params.end,$gt:params.start},
                "bizId" : null,
                "path" : "/biz/:bizId/prod/:id"
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
                /*results.sort(function(a,b){
                    return b.count - a.count;
                });*/
                logger.debug(' getMenuViewByDay ');
                callback(err,results);


            });

    });



}

var saveMenuViewResult = function(params,dateId, callback){
    /*mdb.getDb(function (error, db) {
        if (error) {
            callback(error , null);
        }
        db.collection('menuViewRecord').insert(records,function(err,result){
            mdb.closeDB();
            callback(err,result);
        });
    });*/
    var query='insert into stat_menu_click (biz_id,product_id,count,date_id) values(?,?,?,?);'
    var paramArray=[],i=0;
    paramArray[i++]=params.bizId;
    paramArray[i++]=params.productId;
    paramArray[i++]=params.count;
    paramArray[i]=dateId;

    db.dbQuery(query,paramArray,function(error,result){
        logger.debug(' saveMenuViewResult ')
        return callback(error,result);
    });
    /*db.getCon(function (err,con){
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
    });*/
}
/**
 * Customer order menu statistics by day
 */
function getMenuOrderByDay(params,callback){
    mdb.getDb(function (error, db) {
        if (error) {
            callback(error , null);
        }
        db.collection('api_records').group(
            {
                "params.productId" : true,
                "params.bizId" : false

            },
            {
                "method" : "POST",
                "time":{$lte: params.end,$gt:params.start},
                "bizId" : null,
                "path" : "/biz/:bizId/prod/:productId/order"
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
                /*results.sort(function(a,b){
                 return b.count - a.count;
                 });*/
                logger.debug(' getMenuOrderByDay ');
                callback(err,results);


            });

    });
}

function saveMenuOrderResult(params,dateId, callback){
    var query='insert into stat_menu_order (biz_id,product_id,count,date_id) values(?,?,?,?);'
    var paramArray=[],i=0;
    paramArray[i++]=params.bizId;
    paramArray[i++]=params.productId;
    paramArray[i++]=params.count;
    paramArray[i]=dateId;

    db.dbQuery(query,paramArray,function(error,result){
        logger.debug(' saveMenuOrderResult ')
        return callback(error,result);
    });

    /*db.getCon(function (err,con){
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
    });*/
}

module.exports = {
    getMenuViewByDay : getMenuViewByDay,
    saveMenuViewResult : saveMenuViewResult,
    getMenuOrderByDay : getMenuOrderByDay,
    saveMenuOrderResult : saveMenuOrderResult
}
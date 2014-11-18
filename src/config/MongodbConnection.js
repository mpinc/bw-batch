/**
 * Created by ling xue on 14-5-29.
 */

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server ;
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('MongodbConnection.js');


var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
var db = null;
/*
mongoclient.open(function(err, mongoclient) {
    mongoclient.db("bizwise").open(function(err,mdb){
        db =mdb;
    });

})
*/


var getDB=function (callback){
    // Open the connection to the server
    if (db==null){
        logger.info(' getDb ' + 'attempt to create mongodb connection ')
        mongoclient.open(function(err, mongoclient) {
            if(err){
                logger.error(' getDb ' + err.message);
                return callback(err,null);
            }else{
                db=mongoclient.db("bizwise");
                return  callback(null,db);
            }

        })
    }else {
        callback(null, db);
    }

};

var closeDB = function(){
    //console.log('Close Db');
}

exports.getDb = getDB;

module.exports = {
    getDb: getDB,
    closeDB : closeDB
};

/**
 * Created by ling xue on 14-5-29.
 */

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server


var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
var db;
mongoclient.open(function(err, mongoclient) {
    mongoclient.db("bizwise").open(function(err,mdb){
        db =mdb;
    });

})

var getDB=function (callback){
    // Open the connection to the server
    callback(null,db);

};

var closeDB = function(){
    //console.log('Close Db');
}

exports.getDb = getDB;

module.exports = {
    getDb: getDB,
    closeDB : closeDB
};

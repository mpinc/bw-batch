/**
 * Created by ibm on 14-11-3.
 */

/**
 * Created by ling xue on 14-5-29.
 */

//for product
/*
 var mysqlConnectOptions ={
 user: 'root',
 password: 'Mission94539',
 database:'bw',
 host: 'bw.c9erfktsehne.us-west-1.rds.amazonaws.com'
 };
 */


//for staging
/*
 var mysqlConnectOptions ={
 user: 'root',
 password: 'Mission94539',
 database:'bw',
 host: 'bw.ca1khqs4nesh.us-west-1.rds.amazonaws.com'
 };
 */


var mysqlConnectOptions ={
    user: 'biz',
    password: 'wise',
    database:'bw',
    host: '127.0.0.1'
};

var mongodbConnectionOptions = {
    ipAdd : "localhost",
    port : 27017,
    dbName : 'bizwise'
};

function getMysqlOptions (){
    return mysqlConnectOptions;
}

function getMongodbOption(){
    return mongodbConnectionOptions
}
module.exports = {

    getMysqlOptions : getMysqlOptions ,
    getMongodbOption : getMongodbOption
}
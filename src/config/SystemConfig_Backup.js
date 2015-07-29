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

var mongoConfig = {
    connect : 'mongodb://127.0.0.1:27017/bizwise'
}

var logLevel = 'DEBUG';
var loggerConfig = {
    appenders: [
        { type: 'console' },
        {
             type: 'file',
             filename: '/var/log/bw-batch/bw.log',
             maxLogSize: '4m',
             backups:4
        }
    ],
    replaceConsole: true
}

function getMysqlOptions (){
    return mysqlConnectOptions;
}

var serverUrl = 'http://123.57.11.150';


module.exports = {

    getMysqlOptions : getMysqlOptions,
    mongoConfig : mongoConfig ,
    loggerConfig : loggerConfig.appenders,
    logLevel :logLevel ,
    serverUrl : serverUrl
}
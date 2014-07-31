/**
 * Created by ling xue on 14-5-29.
 */

var mysql = require('mysql');
var sysConf = require('./SystemConfig.js');

var pool  = mysql.createPool(sysConf.getMysqlOptions());

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

exports.getCon = getConnection;

module.exports = {
    getCon: getConnection
};

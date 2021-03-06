/**
 * Created by ling xue on 14-5-29.
 */

var later = require('later');
var Seq = require('seq');
var dataUtil = require('./util/DateUtil.js');
var bizMenuStat = require('./bl/BizMenuStat.js');
var customerCheckInStat = require('./bl/CustomerCheckInStat.js');
var orderBL = require('./bl/OrderBL.js');
var paymentBL = require('./bl/PaymentBL.js');
var statDate = require('./bl/StatDate.js');
var nodeRequest = require('request');
var sysConfig = require('./config/SystemConfig.js');
var serverLogger = require('./util/ServerLogger.js');
var logger = serverLogger.createLogger('TimerStat.js');

later.date.localTime();

var basic = {h:[0],m: [15],s:[10]};
var composite = [basic];
console.log('Bw batch start at '+ (new Date()).toLocaleString())
/*var basic0 = {s:[55]};
var basic1 = {s:[15]};
var basic2 = {s:[35]};
var basic3 = {s:[25]};
var basic4 = {s:[45]};
var basic5 = {s:[5]};
var composite = [basic0,basic1,basic2,basic3,basic5];*/

var sched =  {
    schedules:composite
};

 try{

    later.setInterval(function() {
        logger.info("Begin to execute batch job !")
        var dateKey ;
        Seq().seq(function(){
            var that = this;
            logger.debug("init create business index")
            nodeRequest.get(sysConfig.serverUrl+'/api/cust/do/createWechatBizIndex', null,function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    //console.log("create business index") ;
                    logger.info("create business index success")
                }else{
                    //console.log(body);
                    logger.error("create business index false")
                }
                that();
            });

        }).seq(function(){
                var that = this;

                nodeRequest.get(sysConfig.serverUrl+'/api/cust/do/createProdIndex', null,function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        //console.log("create product index") ;
                        logger.info("create product index success")
                    }else{
                        //console.log(body);
                        logger.info("create product index false")
                    }
                    that();
                });
            }).seq(function(){
                var that = this;
                /*orderBL.setOrderExpired(function(err,result){
                    if(err){
                        logger.error(err.message)

                    }else{
                        logger.info(' SetOrderExpired ' + result.affectedRows +" orders is update to expired");
                    }
                    that();
                })*/
                that();

            }).seq(function() {
                var that = this;
                statDate.saveStatDate(function(err,result){
                    if(err){
                        logger.error(err.message)
                        throw err;
                    }else{
                        dateKey = result.insertId;
                    }
                    that();
                })
            }).seq(function(){
                //Save all payment by day
                var that = this;
                paymentBL.autoAddPaymentStatByDay({dateId : parseInt(dateKey)-1},function(error,result){
                    if(error){
                        logger.error(error.message)
                        throw error;
                    }else{
                        if(result && result.affectedRows >0){
                            logger.info("Add payment stat success "+ dateKey);
                        }else{
                            logger.warn("Add payment stat failed "+ dateKey);
                        }
                        that();
                    }
                })
            }).seq(function(){
                var that = this;
                /*bizMenuStat.doMenuClickStat(function(err,records){
                    if(err){
                        logger.error(err.message)
                        throw err;
                    }else{
                        var statTime = dataUtil.getLastDayLong();
                        var menuItemArray = [];
                        if(records != null && records.length >0){
                            for(var i = 0,j=records.length;i<j;i++){
                                var menuItemObj = {};
                                //console.log(records[i]);
                                menuItemObj.bizId = records[i]['params.bizId'];
                                menuItemObj.productId = records[i]['params.id'];
                                menuItemObj.count = records[i].count;
                                menuItemObj.statTime = statTime;
                                menuItemArray.push(menuItemObj);
                            }
                        }
                        if(menuItemArray != null && menuItemArray.length >0){
                            bizMenuStat.saveMenuViewResult(menuItemArray,dateKey,function(err,result){
                                if(err){
                                    logger.error(err.message)
                                    throw err;
                                }
                            });
                            //console.log(menuItemArray);
                        }
                    }
                    that();
                });*/
                that();
        }).seq(function(){
                var that = this;
                /*bizMenuStat.doMenuOrderStat(function(err,records){
                    if(err){
                        logger.error(err.message)
                        throw err;
                    }else{
                        var statTime = dataUtil.getLastDayLong();
                        var menuItemArray = [];
                        if(records != null && records.length >0){
                            for(var i = 0,j=records.length;i<j;i++){
                                var menuItemObj = {};
                                //console.log(records[i]);
                                menuItemObj.bizId = records[i]['params.bizId'];
                                menuItemObj.productId = records[i]['params.productId'];
                                menuItemObj.count = records[i].count;
                                menuItemObj.statTime = statTime;
                                menuItemArray.push(menuItemObj);
                            }
                        }
                        if(menuItemArray != null && menuItemArray.length >0){
                            bizMenuStat.saveMenuOrderResult(menuItemArray,dateKey,function(err,result){
                                if(err){
                                    logger.error(err.message)
                                    throw err;
                                }
                            });
                            //console.log(menuItemArray);
                        }
                    }
                    that();
                });*/
                that();
            }).seq(function(){
                /*customerCheckInStat.doCustomerCheckInStat(function(err,records){
                    if(err){
                        throw err;
                        logger.error(err.message)
                    }else{
                        var statTime = dataUtil.getLastDayLong();
                        var checkInCountArray = [];
                        if(records != null && records.length >0){
                            for(var i = 0,j=records.length;i<j;i++){
                                var checkInCountObj = {};
                                //console.log(records[i]);
                                checkInCountObj.bizId = records[i]['params.bizId'];
                                checkInCountObj.count = records[i].count;
                                checkInCountObj.statTime = statTime;
                                checkInCountArray.push(checkInCountObj);
                            }
                        }
                        if(checkInCountArray != null && checkInCountArray.length >0){
                            customerCheckInStat.saveCustomerCheckInRes(checkInCountArray,dateKey,function(err,result){
                                if(err){
                                    logger.error(err.message)
                                    throw err;
                                }
                            });
                        }
                    }
                    return ;
                });*/

        });


    }, sched);
}catch(err){
    logger.error(err.message)
    console.log("Catch Exception: "+err);
}


/*var dateObj = {};
var today = new Date();
dateObj.day = today.getDate();
dateObj.month = today.getMonth()+1;
dateObj.year = today.getFullYear();
dateObj.week = dataUtil.getWeekByDate();
dateObj.yearMonth = Number(dateObj.year+""+dateObj.month);
dateObj.yearWeek = Number(dateObj.year+""+dateObj.week);
console.log(dateObj);*/
/*
later.setInterval(function() {
    bizMenuStat.doMenuOrderStat(function(error,data){
        console.log(data);
    });
}, sched);
*/




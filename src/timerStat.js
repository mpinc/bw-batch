/**
 * Created by ling xue on 14-5-29.
 */

var later = require('later');
var Seq = require('seq');
var dataUtil = require('./util/DateUtil.js');
var bizMenuStat = require('./bl/BizMenuStat.js');
var customerCheckInStat = require('./bl/CustomerCheckInStat.js');
var statDate = require('./bl/StatDate.js');
var nodeRequest = require('request');

later.date.localTime();
var basic = {h:[1],m: [10],s:[10]};
var composite = [basic];

/*
var basic0 = {s:[55]};
var basic1 = {s:[15]};
var basic2 = {s:[35]};
var basic3 = {s:[25]};
var basic4 = {s:[45]};
var basic5 = {s:[5]};
var composite = [basic0,basic1,basic2,basic3,basic5];
*/

var sched =  {
    schedules:composite
};

 try{
    later.setInterval(function() {

        var dateKey ;
        Seq().seq(function(){
            var that = this;
            console.log("init create business index")
            nodeRequest.get('http://127.0.0.1:8080/cust/do/createBizIndex', null,function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("create business index") ;
                }else{
                    console.log(body);
                }
                that();
            });

        }).seq(function(){
                var that = this;

                nodeRequest.get('http://127.0.0.1:8080/cust/do/createProdIndex', null,function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log("create product index") ;
                    }else{
                        console.log(body);
                    }
                    that();
                });
            }).seq(function() {
                var that = this;
                statDate.saveStatDate(function(err,result){
                    if(err){
                        throw err;
                    }else{
                        dateKey = result;
                    }
                    that();
                })
            }).seq(function(){
            var that = this;
            bizMenuStat.doMenuClickStat(function(err,records){
                if(err){
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
                                throw err;
                            }
                        });
                        console.log(menuItemArray);
                    }
                }
                that();
            });
        }).seq(function(){
                var that = this;
                bizMenuStat.doMenuOrderStat(function(err,records){
                    if(err){
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
                                    throw err;
                                }
                            });
                            console.log(menuItemArray);
                        }
                    }
                    that();
                });
            }).seq(function(){
            customerCheckInStat.doCustomerCheckInStat(function(err,records){
                if(err){
                    throw err;
                    console.log(err.message);
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
                                throw err;
                            }
                        });
                    }
                }
                return ;
            });

        });


    }, sched);
}catch(err){
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




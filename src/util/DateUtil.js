/**
 * Created by ling xue on 14-5-30.
 */

var moment = require('moment');
function getDayRangeLong(){
    var currentDate = new Date();
    var currentDateStr = moment(currentDate).format("YYYY-MM-DD");
    var currentDayLong = new Date(currentDateStr).getTime();
    var dayLong  = 24*60*60*1000;
    var yesterdayDayLong = currentDayLong -dayLong;
    var dayRangeObj = {};
    dayRangeObj.start = yesterdayDayLong;
    dayRangeObj.end = currentDayLong ;
    return dayRangeObj;

}
function padLeft(str,lenght){
    if(str.length >= lenght)
        return str;
    else
        return padLeft("0" +str,lenght);
}

function getLastDayLong(){
    var currentDate = new Date();
    var currentDateStr = moment(currentDate).format("YYYY-MM-DD");
    var currentDayLong = new Date(currentDateStr).getTime();
    var dayLong  = 23*60*60*1000;
    var yesterdayDayLong = currentDayLong -dayLong;
    return yesterdayDayLong;
}


function getWeekByDate(){
    var d1 = new Date();
    var d2 = new Date();
    d2.setMonth(0);
    d2.setDate(1);
    d2.setDate(7-d2.getDay());
    var rq = d1-d2;
    var s1 = Math.ceil(rq/(24*60*60*1000));
    var s2 = Math.ceil(s1/7);
    return s2+1;
}
module.exports = {
    getDayRangeLong : getDayRangeLong,
    getLastDayLong : getLastDayLong,
    getWeekByDate : getWeekByDate,
    padLeft :padLeft
}
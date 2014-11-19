/**
 * Created by ling xue on 14-11-19.
 */


var ORDER_EXPIRED_TIME = 24*60*60*1000;

/**
 * The module for category value
 * @type {number}
 */

//Order status category
var LOV_CATEGORY_ORDER_STATUS = 1 ;
//Menu Item status category
var LOV_CATEGORY_ITEM_STATUS = 2 ;


/**
 * The module for order status value
 * @type {number}
 */

//customer submited the order
var ORDER_STATUS_SUBMITTED = 100 ;
//customer or business canceled order
var ORDER_STATUS_CANCELLED = 101 ;
//business confire the order
var ORDER_STATUS_CONFIRMED = 102 ;
//business set order in progress
var ORDER_STATUS_PROGRESS = 103 ;
//business Completed the order
var ORDER_STATUS_COMPELETED = 104 ;
//System set the order expired
var ORDER_STATUS_EXPIRED = 109 ;

/**
 * The module for menu item in order status value
 * @type {number}
 */

//The item pending ,the order not in progress
var ITEM_STATUS_PENDING = 201 ;
//The item is sent to kicthen ,the order in progress
var ITEM_STATUS_KICTHEN = 202 ;
//The item is cancelled
var ITEM_STATUS_CANCELLED = 203 ;
//The item is served
var ITEM_STATUS_SERVED = 204 ;



/**
 * The module for business table status value
 * @type {number}
 */

//The table status have no order
var TABLE_STATUS_OPEN  =300 ;
//The table has been ordered
var TABLE_STATUS_RESERVED  =301 ;
//The table have customer seat now
var TABLE_STATUS_SEATED  =302 ;
//The table is cleaning up now
var TABLE_STATUS_CLEAN  =303 ;

/**
 * The module for business table type value
 * @type {number}
 */
//The table is Dispersed
var TABLE_TYPE_DISPERSED  =400 ;
//The table is in separate room
var TABLE_STATUS_SEPARATE  =401 ;



module.exports = {
    ORDER_EXPIRED_TIME : ORDER_EXPIRED_TIME,
    LOV_CATEGORY_ORDER_STATUS:LOV_CATEGORY_ORDER_STATUS,
    LOV_CATEGORY_ITEM_STATUS : LOV_CATEGORY_ITEM_STATUS,
    ORDER_STATUS_SUBMITTED : ORDER_STATUS_SUBMITTED,
    ORDER_STATUS_CANCELLED : ORDER_STATUS_CANCELLED,
    ORDER_STATUS_CONFIRMED: ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_PROGRESS : ORDER_STATUS_PROGRESS,
    ORDER_STATUS_COMPELETED : ORDER_STATUS_COMPELETED,
    ORDER_STATUS_EXPIRED : ORDER_STATUS_EXPIRED ,
    ITEM_STATUS_PENDING : ITEM_STATUS_PENDING,
    ITEM_STATUS_KICTHEN : ITEM_STATUS_KICTHEN,
    ITEM_STATUS_CANCELLED : ITEM_STATUS_CANCELLED,
    ITEM_STATUS_SERVED : ITEM_STATUS_SERVED ,
    TABLE_STATUS_OPEN : TABLE_STATUS_OPEN ,
    TABLE_STATUS_RESERVED : TABLE_STATUS_RESERVED ,
    TABLE_STATUS_SEATED : TABLE_STATUS_SEATED ,
    TABLE_STATUS_CLEAN : TABLE_STATUS_CLEAN ,
    TABLE_TYPE_DISPERSED : TABLE_TYPE_DISPERSED ,
    TABLE_STATUS_SEPARATE : TABLE_STATUS_SEPARATE
}
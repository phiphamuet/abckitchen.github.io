/**
 * Created by Phi on 5/31/2015.
 */
var async=require('async');
async.waterfall([
    function(cb){
        setTimeout(
            function(){
                console.log("doi 5s nhe");
                cb("xong 5s");
            }
            ,5000);
    }
],function(param){
    console.log(param);

});
console.log("toi chay truoc")
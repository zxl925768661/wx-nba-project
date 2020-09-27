// var http = require('http');
var https = require('https');
const request = function (opt, cb) {
    return https.request(opt, function (response) {
        console.log('STATUS:' + response.statusCode);
        console.log('HEADERS:' + JSON.stringify(response.headers));
        var renderData = ''
        response.setEncoding('utf8');
        response.on('data',function(body){
            renderData+=body;
        });
        response.on('end',function(){
            //请求结束
            console.log('end', renderData);
            cb(renderData);
            // res.render('index',JSON.parse(renderData));
        });
        response.on('error',function(e){
            if(e){
                console.log(e);
            }
        })
    });
};
module.exports = request;
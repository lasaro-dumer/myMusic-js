exports.index = function(req, res){
    res.send('oi')
}

var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    util = require('util');
exports.stream = function(req,res){
    var filePath = '.\\musics\\04_Adrenaline.mp3';
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}

var http = require('http'),
    fs = require('fs'),
    path = require('path')
    util = require('util');

http.createServer(function(req, res) {
    var filePath = 'musics\\04_Adrenaline.mp3';
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
       "Content-Type": "audio/mpeg",
      'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
})
.listen(2000);
console.log('Listenning');

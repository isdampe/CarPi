//Ideally, this is run on a remote server.
//It should store information in a database.

var http = require('http');

http.createServer(function (req, res) {

  if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            console.log("Body: " + body);
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('1');
   }

}).listen(6668);
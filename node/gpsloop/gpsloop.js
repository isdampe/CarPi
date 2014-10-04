//Device config.
var updateServerEvery = 30;			//Update the last location to server every 30 seconds.
var writeOutputBufferEvery = 60;	//Save to HDD every 60 seconds.
var outputFilePath = "/home/pi/carpi/gps-history/";
var serverHost = "192.168.1.25";
var serverPort = 6668;

//Init GPSD link.
var bancroft = require("bancroft");
var http = require("http");
var fs = require("fs");
var querystring = require('querystring');

var currentLocation = {};
var locationBuffer = [];
var serverIp = null;

var gpsd = new bancroft();

gpsd.on('connect', function(){
	console.log("Attached to GPSD interface");
});

gpsd.on('location', function (location) {
  console.log("GPSD/Bancroft hints at new location\nUpdating buffer.");
  currentLocation = location;
  locationBuffer.push( location );
});

setInterval(function(){

	//Every 30 seconds, attempt to send the latest location to
	//The server.

	var post_data = querystring.stringify({
		'loc': JSON.stringify(currentLocation)
	});

	console.log(post_data);

	var postOptions = {
		host: serverHost,
		port: serverPort,
		path: "/gps",
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post_data.length
		}
	}

	// Set up the request
	var post_req = http.request(postOptions, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});

	post_req.on('error', function(err){
		console.log("Error posting to server, " + err);
	});

	// post the data
	post_req.write(post_data);
	console.log("Sent request");
	post_req.end();

},1000*updateServerEvery);

setInterval(function(){

	if( locationBuffer.length < 1 ) {
		console.log("No buffer to write to disk.");
		return;
	}

	//Every 60 seconds, write the contents of locationBuffer
	//to a file.
	var date = new Date();
	var currentMonth = date.getMonth();
	var currentYear = date.getFullYear();

	var currentFile = currentMonth + "-" + currentYear + ".csv";

	console.log("Write RAM buffer to disk history, " + currentFile);

	var outputBuffer = JSON.stringify( locationBuffer, null, 0 ) + "\n";

	//Actually write the changes.
	fs.appendFile( outputFilePath + currentFile, outputBuffer, function(err){
		if ( err ) {
			console.log("Error writing to file " + outputFilePath + currentFile );
			console.log(err);
		} else {
			console.log("Successfully wrote to disk.");
			console.log("Clearing location memory buffer.");
			locationBuffer = [];
		}

	} );


}, 1000*writeOutputBufferEvery);

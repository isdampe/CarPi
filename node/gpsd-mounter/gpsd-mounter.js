var exec = require('child_process').exec;
var gpsdStatus = 0;				//Unknown.
var gpsLoop = 0;
var pathToGpsLoop = "/home/pi/carpi/node/gpsloop/gpsloop.js";
//Find the device.

function gpsdRunning() {

	//Checks if GPSD is running.
	var result = exec("ps aux | grep 'gpsd /dev'", function( err, stdout, code ){

		if( err ) {
			console.log("Error executing child process");
			return;
		}

		var splitArr = stdout.split("\n");
		if ( splitArr.length > 3 ) {
			gpsdStatus = 1; //Running
		} else {
			gpsdStatus = -1;
		}

	});

}

function startGpsDevice() {

	if ( gpsLoop !== 0 ) {
		console.log("Killing old loop process" + gpsLoop);
		//Kill the old process.
		exec("kill " + gpsLoop, function(err,stdout,code){return;});
		launchLoopProc();

	}

	//Tries to find gps device.
	exec("ls /sys/class/tty | grep USB", function( err, stdout, code ){

		var device = stdout.replace("\n","");
		console.log("Found device " + device);

		exec("gpsd /dev/" + device, function( err, stdout, code ){
			if ( err ) {
				console.log("Error launching gpsd");
			}
		});

	});

}

function launchLoopProc() {

	var proc = exec("node " + pathToGpsLoop + " &> /dev/null &", function( err, stdout, code ){
		if ( err ) {
			console.log("Error executing node gpsloop.");
		}
	});

	gpsLoop = proc.pid;
	console.log("Launched node gpsloop, proc id " + gpsLoop);

}

setInterval(function(){

	gpsdRunning();

},5000);

setInterval(function() {

	switch( gpsdStatus ) {

		case 0:
			console.log("Awaiting status...");
		break;
		case 1:
			console.log("GPSD running...");

			if ( gpsLoop === 0 ) {
				//We should launch the other node script.
				launchLoopProc();
			}

		break;
		case -1:
			console.log("GPSD not running. We should start it.");
			startGpsDevice();
		break;

	}

}, 10000);
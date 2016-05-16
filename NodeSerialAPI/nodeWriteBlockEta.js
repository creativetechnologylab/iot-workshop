/*
 * Get current eta to next bitcoin block and change light accordingly.
 * Heavily modifed from: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-control-of-an-arduino/
 *
 * @author Gareth Foote
 */

// include the serialport library
var serialport = require('serialport');
// make a local instance of serial
var SerialPort = serialport.SerialPort;
// get the port name from the command line
var portName = process.argv[2];
var portConfig = {
  baudRate: 9600
};
// the brightness to send for the LED
var brightness = 0;
// open the serial port:
var myPort = new SerialPort(portName, portConfig);
// Make a request object for HTTP request.
var request = require('request');

// Listening for 'open' event and then calling function 'openPortHandler'
myPort.on('open', openPortHandler);

function openPortHandler(){
  console.log('port open');
  console.log('baud rate: ' + myPort.options.baudRate);
  // set an interval to update the brightness.
  setInterval(getBlockCountdown, 1000);
}

function getBlockCountdown(){
  // Make a request to the API. Uses an anonymous function.
  request('https://blockchain.info/q/eta', function(error, response, body){
     if(error || response.statusCode == 200){
       return;
     }
     var eta = Math.round(body);
     if(eta > 255 || eta < 0){
       eta = 0;
     } else {
       eta = 255 - eta;
     }
     // Convert the value to an ASCII string before sending it.
     myPort.write(eta.toString());
     console.log('Writing ' + eta + ' to the serial port (' + body + ')');
  });
}

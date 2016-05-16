/*
 * Write data to serial port. Adapted from ITP NYU PhysComp unit
 * https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-control-of-an-arduino/
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

// Listening for 'open' event and then calling function 'openPortHandler'
myPort.on('open', openPortHandler);

function openPortHandler(){
  console.log('Port open');
  console.log('Baud rate: ' + myPort.options.baudRate);

  // Set an interval to update the brightness every X milliseconds
  setInterval(sendData, 100);
}

function sendData(){
  // increment brightness by 10 points. Reset if > 255.
  if (brightness < 255) {
    brightness = brightness + 10;
  } else {
    brightness = 0;
  }
  // Convert the value to an ASCII string before sending it.
  myPort.write(brightness.toString());
  console.log('Sending ' + brightness + ' out the serial port');
}

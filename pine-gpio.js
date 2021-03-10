var exec = require('child_process').exec;

const gpio_path = "/sys/class/gpio/";
const HIGH = 1;
const LOW = 0;

const PI2 = "PI2";
const EULER = "EULER";

const P5V = "5V";
const P3V = "3.3V";
const GND = "GND";
const DCI = "DCIN";
const NUL = "NULL";

exports.Pin = class Pin {
  constructor(number,direction) {
    this.pinNumber = number;
    this.direction = direction;
    this.initialize(number,direction);
    console.log(number);
  }

  initialize(number, direction) {
    exec('echo '+ number +' > '+ gpio_path + 'export',
    function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
    exec('echo '+ direction +' > '+ gpio_path + 'gpio'+ number +"/direction",
    function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
    this.digitalWrite(0);
  }

  uninitialize(number) {
    exec('echo '+ 0 +' > '+ gpio_path + 'gpio'+ number +"/value",
    function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
    exec('echo '+ number +' > '+ gpio_path + 'unexport',
    function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
  }

  digitalWrite(value) {
    if (value == HIGH || value == LOW) {
      exec('echo '+ value +' > '+ gpio_path + 'gpio'+ this.pinNumber +"/value",
      function (error, stdout, stderr) {
          //console.log('stdout: ' + stdout);
          //console.log('stderr: ' + stderr);
          if (error !== null) {
               console.log('exec error: ' + error);
          }
      });
    } else {
      return -1;
    }
  }
}


//http://joey.hazlett.us/pine64/pine64_pins.html
//http://forum.pine64.org/attachment.php?aid=13

const piPins = [
    P3V, P5V,
    227, P5V,
    226, GND,
    362, 32,
    GND, 33,
     71, 72,
    233, GND,
     76, 77,
    P3V, 78,
     64, GND,
     65, 79,
     66, 67,
    GND, 231,
    361, 360,
    229, GND,
    230, 68,
     69, GND,
     73, 70,
     80, 74,
    GND, 75
  ];

const eulerPins = [
    P3V, DCI,
    NUL, DCI,
    NUL, GND,
    363, P5V,
    GND, 232,
     35,  36,
     37, GND,
     38,  39,
    P3V, 100,
     98, GND,
     99, 101,
     97,  96,
    GND, 102,
     34, 103,
     40,  41,
    NUL, NUL,
    NUL, GND
  ];

exports.getPin = function(bus,pin) {
  gpio = NUL;
  if (bus == PI2) {
    gpio = piPins[pin-1];
    console.log(gpio);
  } else if (bus == EULER) {
    gpio = eulerPins[pin-1];
  }
  if (gpio == P3V || gpio == P5V || gpio == GND || gpio == DCI || gpio == NUL) {
    return -1;
  } else {
    return gpio;
  }
}

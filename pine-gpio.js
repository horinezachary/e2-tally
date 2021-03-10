var exec = require('child_process').exec;

const gpio_path = "/sys/class/gpio/";
const HIGH = 1;
const LOW = 0;

class Pin {
  constructor(number,direction) {
    this.pinNumber = number;
    this.direction = direction;
    this.initialize(number,direction);
  }

  initialize(number, direction) {
    exec('echo '+ number +' > '+ gpio_path + 'export',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
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

module.exports = Pin;

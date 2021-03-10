var EventMaster = require('barco-eventmaster');
var Gpio = require('./pine-gpio.js').Pin;
var getPin = require('./pine-gpio.js').getPin;
const localIp = "192.168.2.109" //getIP();
console.log(localIp);
const port = 4897;

var GPIO11 = new Gpio(getPin(11), 'out');
GPIO11.digitalWrite(1);
var GPIO13 = new Gpio(getPin(13), 'out');
GPIO13.digitalWrite(1);
var GPIO15 = new Gpio(getPin(15), 'out');
GPIO15.digitalWrite(1);

/*
// Change this ip to your own E2/S3 IP
var em = new EventMaster('10.0.0.1');

//port: 9999

// Get all preset names
em.listPresets(-1, -1, function(err, presets) {
    if (err !== null) {
        console.log("Current presets");
        console.log(presets);
    }
    else {
        console.log(err);
        throw "Something went wrong with the event master request";
    }
});

em.listSources(0, function(err, sources) {
  console.log(sources);
});
*/

/* notificationTypes
  ◦ ScreenDestChanged
  ◦ AUXDestChanged
  ◦ FrameChanged
  ◦ NativeRateChanged
  ◦ InputCfgChanged
  ◦ SourceChanged
  ◦ BGSourceChanged
  ◦ PresetChanged
  ◦ StillChanged
  ◦ OutputCfgChanged
  ◦ CueChanged
*/
/*
em.subscribe(localIp, port, ["ScreenDestChanged","FrameChanged"], function(err, response) {
  console.log(sources);
});

return self;
*/

/*
function getIP() {
  const { networkInterfaces } = require('os');

  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
          if (net.family === 'IPv4' && !net.internal) {
              if (!results[name]) {
                  results[name] = [];
              }
              results[name].push(net.address);
          }
      }
  }
  return results[0];
}*/

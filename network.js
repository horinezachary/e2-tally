const Evilscan = require('evilscan');

function evilScan(ip_range, port, callback) {
  let open = [];
  const options = {
      target:ip_range,
      port:port,
      status:'O', // Timeout, Refused, Open, Unreachable
      banner:false
  };

  new Evilscan(options, (err, scan) => {
    if (err) {
      console.log(err);
      return;
    }
    scan.on('result',data => {
        // fired when item is matching options
        //console.log(data);
        open.push(data);
    });
    scan.on('error', err => {
        throw new Error(data.toString());
        reject(err.toString());
    });
    scan.on('done', () => {
        // finished !
        callback(open);
    });
    scan.run();
  });
}



exports.scan = function(ip_range,port) {
  return new Promise((resolve, reject) => {
    evilScan(ip_range,port, (open) => {
      resolve(open);
    });
  });
}

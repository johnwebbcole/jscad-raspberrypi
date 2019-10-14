function main() {
  util.init(CSG, { debug: 'jscadRPi*' });

  var pi = RaspberryPi.Spacer({ hollow: false });

  return pi.Center();
}

// include:js
// endinject

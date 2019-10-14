function main() {
  util.init(CSG, { debug: 'jscadRPi*,jscadUtils:group' });

  var pi = RaspberryPi.PiTFT24();

  return pi.combine().Center();
}

// include:js
// endinject

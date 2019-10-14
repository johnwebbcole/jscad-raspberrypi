function main() {
  util.init(CSG, { debug: 'jscadRPi*,jscadUtils:util' });

  var pi = RaspberryPi.PiTFT22();

  return pi.combine().Center();
}

// include:js
// endinject

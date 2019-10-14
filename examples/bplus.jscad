function main() {
  util.init(CSG, { debug: 'jscadRPi*,jscadUtils:util' });

  var pi = RaspberryPi.BPlus();

  return pi.combine().Center();
}

// include:js
// endinject

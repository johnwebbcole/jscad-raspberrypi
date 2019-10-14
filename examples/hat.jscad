function main() {
  util.init(CSG, { debug: 'jscadRPi*,jscadUtils:util' });

  var pi = RaspberryPi.Hat();

  return pi.combine().Center();
}

// include:js
// endinject

function main() {
  util.init(CSG, { debug: 'jscadRPi*,jscadUtils:util' });

  var pi = RaspberryPi.HatStandoff();

  return pi.Center();
}

// include:js
// endinject

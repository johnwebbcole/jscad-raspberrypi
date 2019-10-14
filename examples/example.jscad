function main() {
  util.init(CSG);

  var pi = RaspberryPi.BPlus().align('mb', util.unitCube(), 'xy');

  /**
   * Add a spacer to support the screen.
   */
  pi.add(RaspberryPi.Spacer({}, pi.parts.mb), 'spacer');

  /**
   * Add the screen and align it with the pi and the top of the spacer.
   */
  pi.add(
    RaspberryPi.PiTFT24({}, pi.parts.mb).snap(
      'mb',
      pi.parts.spacer,
      'z',
      'outside-'
    ),
    'screen'
  );
  return pi.combineAll();
}

// include:js
// endinject

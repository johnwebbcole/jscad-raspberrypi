import { parts as Parts, Group, Debug } from '@jwc/jscad-utils';
import Hat from './hat';
import { LeftSide } from './boardutils';
import { booleanOps } from '@jscad/scad-api';
const { union } = booleanOps;
const debug = Debug('jscadRPi:PiTFT24');

/** @typedef {typeof import("@jwc/jscad-utils/src/group").JsCadUtilsGroup} JsCadUtilsGroup */

/**
 * Returns an Adafruit PiTFT 2.4 Hat with buttons.
 * ![PiTFT 2.4 example](../images/pitft24.png)
 * @function PiTFT24
 * @param  {Object} [options] An options object.
 * @param  {number} [options.buttonCapHeight=4] The button cap height.
 * @param  {number} [options.capBaseHeight=1] The base of the button cap height.
 * @param  {number} [options.buttonWireYOffset=5] The offset of the wire connecting the buttons.
 * @param  {number} [options.clearance=0.9] The clearance between the buttons and their holes.
 * @param  {CSG} [pi]      A RaspberryPi CSG object to align the PiTFT24 object to.
 * @return {JsCadUtilsGroup} A group object with all of the parts for a PiTFT24.
 * 
export default function PiTFT24(options = {}, pi) {
 * @exports BPlus
 * @memberof! RaspberryPi
 * 
 * @example
 function main() {
  util.init(CSG);

  var pi = RaspberryPi.BPlus().align('mb', util.unitCube(), 'xy');

  pi.add(RaspberryPi.Spacer({}, pi.parts.mb), 'spacer');

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
 */
export default function PiTFT24(options = {}, pi) {
  var hiddenPart = true;
  options = Object.assign(options, {
    buttonCapHeight: 4,
    capBaseHeight: 1,
    buttonWireYOffset: 5,
    clearance: 0.9
  });

  debug('PiTFT24', options);
  var hat = Hat(pi);
  var mb = hat.parts.mb;
  var group = Group();
  group.add(hat.parts.mb, 'mb');
  group.add(hat.parts.gpio, 'gpio');
  group.holes = hat.holes;

  // var gpio = hat.parts.gpio;
  var sink = 0; // lower the lcd bevel above actual position, and raise LCD up so cases will mould around the lcd better

  var lcd = Parts.Cube([50, 40, 3.72]).color('black');
  group.add(
    lcd
      .translate(lcd.calcSnap(mb, 'xy', 'inside-'))
      .translate(lcd.calcSnap(mb, 'z', 'outside-'))
      .translate([7, 0, 0])
      .translate(lcd.calcmidlineTo('y', 28.32)),
    'lcd'
  );

  // var lcdbevel = LeftSide(Parts.Cube([60, 42, (5.3 - 1.62) - sink]), mb)
  //     .snap(mb, 'z', 'outside-')
  //     .translate([4.5, 7, 0])
  //     .color('white');
  //
  var lcdbevel = Parts.Cube([60, 42, 5.3 - 1.62 - sink]).color('white');

  group.add(
    lcdbevel
      .translate(lcdbevel.calcSnap(mb, 'xy', 'inside-'))
      .translate(lcdbevel.calcSnap(mb, 'z', 'outside-'))
      .translate([4.5, 7, 0]),
    'lcdbevel'
  );

  var buttonBase = Parts.Cube([6.1, 3.5, 3.55])
    .color('beige')
    .snap(mb, 'z', 'outside-')
    .snap(mb, 'xy', 'inside-')
    .midlineTo('y', 2.5);

  var button = buttonBase.union(
    Parts.Cube([3, 1.5, 0.5])
      .color('white')
      .snap(buttonBase, 'z', 'outside-')
      .align(buttonBase, 'xy')
  );

  var buttons = [12.39, 12.39 + 10, 12.39 + 20, 12.39 + 30, 12.39 + 40].map(
    function(midpoint) {
      return button.midlineTo('x', midpoint);
    }
  );

  group.add(Group('1,2,3,4,5', buttons), 'buttons', false, 'button');

  var capBaseHeight = options.capBaseHeight;
  var buttonCapBase = Parts.Cube([6.6, 4, capBaseHeight]).color('blue');
  var buttonCapTop = Parts.Cube([
    6.1,
    3.5,
    options.buttonCapHeight - capBaseHeight
  ])
    .snap(buttonCapBase, 'z', 'outside-')
    .align(buttonCapBase, 'xy')
    .fillet(1, 'z+')
    .color('deepskyblue');

  var buttonCaps = buttons.map(function(button) {
    return union([buttonCapBase, buttonCapTop])
      .snap(button, 'z', 'outside-')
      .align(button, 'xy');
  });

  group.add(union(buttonCaps), 'buttonCaps', hiddenPart);

  group.add(
    union(
      buttonCaps.map(function(button) {
        return union([
          buttonCapBase
            .align(button, 'xy')
            .snap(button, 'z', 'inside-')
            .enlarge([options.clearance, options.clearance, 1]),
          Parts.Cube([6.1, 3.5, options.buttonCapHeight - capBaseHeight])
            .align(button, 'xy')
            .snap(button, 'z', 'inside-')
            .enlarge([options.clearance, options.clearance, 1])
        ]);
      })
    ),
    'buttonCapClearance',
    hiddenPart
  );

  var bwthickness = options.capBaseHeight;
  var connector = LeftSide(
    Parts.Cube([bwthickness, options.buttonWireYOffset, bwthickness]),
    mb
  )
    .snap(buttonCaps[0], 'z', 'inside-')
    .snap(buttonCaps[0], 'y', 'outside+')
    .color('blue');

  var buttonWire = Parts.Cube([40, bwthickness, bwthickness])
    .snap(buttonCaps[0], 'x', 'center-')
    .snap(buttonCaps[0], 'z', 'inside-')
    .snap(connector, 'y', 'inside-')
    .color('blue');
  group.add(union(buttonWire), 'buttonWire', hiddenPart);

  var buttonWireConnector = buttonCaps.map(function(buttonCap) {
    return connector.align(buttonCap, 'x');
  });
  group.add(union(buttonWireConnector), 'buttonWireConnector', hiddenPart);

  var buttonWireClearance = union(
    buttonWireConnector.map(function(connector) {
      return connector.enlarge([
        options.clearance,
        options.clearance,
        options.buttonCapHeight
      ]);
    })
  )
    .union(
      buttonWire.enlarge([
        options.clearance,
        options.clearance,
        options.buttonCapHeight
      ])
    )
    .snap(buttonWire, 'z', 'inside+')
    .color('red');
  group.add(buttonWireClearance, 'buttonWireClearance', hiddenPart);

  group.add(
    Parts.Cube([15, 33, 7])
      .snap(mb, 'x', 'inside-')
      .snap(mb, 'z', 'outside+')
      .align(mb, 'y')
      .color('red'),
    'gpio2',
    hiddenPart
  );

  return group;
}

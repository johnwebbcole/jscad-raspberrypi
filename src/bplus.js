import { array, Debug, Group, parts as Parts, util } from '@jwc/jscad-utils';
import { RightSide } from './boardutils';
import * as BPlusMounting from './bplus-mounting';
import * as RPiParts from './rpi-parts';
const debug = Debug('jscadRPi:BPlus');

/**
 * Returns a complete RaspberryPi B Plus model.
 * ![bplus example](../images/bplus.png)
 * @param  {number} [model=2] The type of B model to create.
 * @param  {object} [options] An options object.
 * @param  {object} [options.clearance=5] An options object.
 * @return {Group} {description}
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
export default function BPlus(model = 2, options) {
  var { clearance } = Object.assign({ clearance: 5 }, options);
  model = !model ? 2 : model === true ? 3 : model;
  debug('BPlus model:', model);
  var mb = RPiParts.BPlusMotherboard(model == 4 ? 3 : 2);

  var group = Group('mb', mb);

  /**
   * Model 1, 2, 3
   */
  if (model < 4) {
    // Right side parts
    group.add(
      RightSide(RPiParts.EthernetJack(), mb).midlineTo('y', 10.25),
      'ethernet'
    );
    debug('mb', mb);

    var usb = RPiParts.UsbJack();
    var usbTranslation = array.add(
      usb.parts.flange.calcSnap(mb, 'x', 'inside+'),
      [2, 0, 0],
      usb.parts.body.calcSnap(mb, 'y', 'inside-'),
      usb.parts.body.calcSnap(mb, 'z', 'outside-')
    );

    debug(
      'usbTranslation',
      usbTranslation,
      util.calcmidlineTo(usb.parts.body, 'y', 29)
    );
    group.add(
      usb
        .clone()
        .translate(usbTranslation)
        .translate(util.calcmidlineTo(usb.parts.body, 'y', 29)),
      'usb1',
      false,
      'usb1'
    );

    group.add(
      usb
        .clone()
        .translate(usbTranslation)
        .translate(util.calcmidlineTo(usb.parts.body, 'y', 47)),
      'usb2',
      false,
      'usb2'
    );

    group.add(
      RPiParts.MicroUsb()
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 10.6)
        .translate([0, -2, 0]),
      'microusb'
    );

    group.add(
      RPiParts.Hdmi()
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 32)
        .translate([0, -2, 0]),
      'hdmi'
    );
    group.add(
      RPiParts.AvJack()
        .snap('block', mb, 'z', 'outside-')
        .midlineTo('block', 'x', 53.5),
      'avjack',
      false,
      'avjack'
    );

    group.add(
      RPiParts.Ribbon().snap(mb, 'z', 'outside-').midlineTo('x', 45),
      'camera'
    );

    group.add(
      RPiParts.Ribbon()
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 3.5)
        .midlineTo('y', 28),
      'display'
    );

    group.add(
      RPiParts.Gpio()
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 32.5)
        .midlineTo('y', 52.5),
      'gpio'
    );

    if (model == 3) {
      group.add(
        RPiParts.BoardLed()
          .snap(mb, 'z', 'outside-')
          .midlineTo('x', 1.1)
          .midlineTo('y', 7.9)
          .color('lightgreen'),
        'activityled'
      );
      group.add(
        RPiParts.BoardLed()
          .snap(mb, 'z', 'outside-')
          .midlineTo('x', 1.1)
          .midlineTo('y', 11.5)
          .color('red'),
        'powerled'
      );
    } else {
      group.add(
        RPiParts.BoardLed()
          .snap(mb, 'z', 'outside-')
          .translate([1, 43.5, 0])
          .color('lightgreen'),
        'activityled'
      );
      group.add(
        RPiParts.BoardLed()
          .snap(mb, 'z', 'outside-')
          .translate([1, 46, 0])
          .color('red'),
        'powerled'
      );
    }
  } else {
    /**
     * Model 4
     */
    group.add(
      RightSide(Parts.Cube([21.5, 16.5, 13.5]).color('lightgray'), mb)
        .translate([1, 0, 0])
        .midlineTo('y', 45.75),
      'ethernet'
    );

    group.add(
      Parts.Cube([clearance, 16.5, 13.5])
        .align(group.parts.ethernet, 'yz')
        .snap(group.parts.ethernet, 'x', 'outside-')
        .color('red'),
      'clearance-ethernet',
      true,
      'clearance'
    );

    var usb = Group();
    usb.add(
      Parts.Cube([17, 13.1, 15])
        .snap(group.parts.ethernet, 'x', 'inside+', -1)
        .snap(mb, 'z', 'outside-')
        .color('lightgray'),
      'body'
    );

    usb.add(
      Parts.Cube([1, 15, 16])
        .snap(usb.parts.body, 'x', 'outside-')
        .align(usb.parts.body, 'yz')
        .color('lightgray'),
      'flange'
    );

    group.add(
      usb
        .clone()
        // .translate(usbTranslation)

        .translate(util.calcmidlineTo(usb.parts.body, 'y', 27)),
      'usb1',
      false,
      'usb1'
    );

    group.add(
      Parts.Cube([clearance, 15, 16])
        .align(group.parts.usb1, 'yz')
        .snap(group.parts.usb1, 'x', 'outside-')
        .color('red'),
      'clearance-usb1',
      true
    );

    group.add(
      usb
        .clone()
        // .translate(usbTranslation)
        .translate(util.calcmidlineTo(usb.parts.body, 'y', 9)),
      'usb2',
      false,
      'usb2'
    );

    group.add(
      Parts.Cube([clearance, 15, 16])
        .align(group.parts.usb2, 'yz')
        .snap(group.parts.usb2, 'x', 'outside-')
        .color('red'),
      'clearance-usb2',
      true
    );

    group.add(
      Parts.Cube([10, 7.5, 3.2])
        .snap(usb.parts.body, 'y', 'inside-', -1)
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 3.5 + 7.7)
        .color('lightgray'),
      'usbc'
    );

    group.add(
      Parts.Cube([10, clearance, 3.2])
        .align(group.parts.usbc, 'xz')
        .snap(group.parts.usbc, 'y', 'outside+')
        .color('red'),
      'clearance-usbc',
      true
    );

    group.add(
      Parts.Cube([7, 7.5, 3])
        .snap(usb.parts.body, 'y', 'inside-', -1)
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 3.5 + 7.7 + 14.8)
        .color('lightgray'),
      'hdmi1'
    );

    group.add(
      Parts.Cube([7, clearance, 3])
        .align(group.parts.hdmi1, 'xz')
        .snap(group.parts.hdmi1, 'y', 'outside+')
        .color('red'),
      'clearance-hdmi1',
      true
    );

    group.add(
      Parts.Cube([7, 7.5, 3])
        .snap(usb.parts.body, 'y', 'inside-', -1)
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 3.5 + 7.7 + 14.8 + 13.5)
        .color('lightgray'),
      'hdmi2'
    );

    group.add(
      Parts.Cube([7, clearance, 3])
        .align(group.parts.hdmi2, 'xz')
        .snap(group.parts.hdmi2, 'y', 'outside+')
        .color('red'),
      'clearance-hdmi2',
      true
    );

    group.add(
      RPiParts.AvJack()
        .snap('block', mb, 'z', 'outside-')
        .midlineTo('block', 'x', 3.5 + 7.7 + 14.8 + 13.5 + 7 + 7.5),
      'avjack',
      false,
      'avjack'
    );

    group.add(
      Parts.Cylinder(6, clearance)
        .rotateX(90)
        .align(group.parts.avjack, 'xz')
        .snap(group.parts.avjack, 'y', 'outside+')
        .color('red'),
      'clearance-avjack',
      true
    );

    group.add(
      RPiParts.Ribbon()
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 3.5 + 7.7 + 14.8 + 13.5 + 7),
      'camera'
    );

    group.add(
      RPiParts.Ribbon()
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 4)
        .midlineTo('y', 24.5 + 3.5),
      'display'
    );

    group.add(
      RPiParts.Gpio()
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 29 + 3.5)
        .midlineTo('y', 56 - 3.5),
      'gpio'
    );

    group.add(
      RPiParts.BoardLed()
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 1.1)
        .midlineTo('y', 8)
        .color('lightgreen'),
      'activityled'
    );
    group.add(
      RPiParts.BoardLed()
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 1.1)
        .midlineTo('y', 12)
        .color('red'),
      'powerled'
    );
  }

  group.add(
    Parts.Cube([15.2, 12, 1.5])
      .snap(mb, 'z', 'outside+')
      .midlineTo('y', 28)
      .translate([-2.5, 0, 0])
      .color('silver'),
    'microsd'
  );

  group.holes = BPlusMounting.holes(mb).array();

  group.add(group.holes[0], 'hole1', true);
  group.add(group.holes[1], 'hole2', true);
  group.add(group.holes[2], 'hole3', true);
  group.add(group.holes[3], 'hole4', true);

  return group;
}

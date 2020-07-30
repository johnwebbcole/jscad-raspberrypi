import { parts as Parts, util, array, Group, Debug } from "@jwc/jscad-utils";
import { RightSide } from "./boardutils";
import * as RPiParts from "./rpi-parts";
import * as BPlusMounting from "./bplus-mounting";
const debug = Debug("jscadRPi:BPlus");

/**
 * Returns a complete RaspberryPi B Plus model.
 * ![bplus example](../images/bplus.png)
 * @param  {boolean} [three=false] Return a RasberryPi 3 model if true
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
export default function BPlus(model) {
  model = !model ? 2 : model === true ? 3 : model;
  debug("BPlus model:", model);
  var mb = RPiParts.BPlusMotherboard();

  var group = Group("mb", mb);
  // Right side parts
  group.add(
    RightSide(RPiParts.EthernetJack(), mb).midlineTo("y", 10.25),
    "ethernet"
  );
  debug("mb", mb);

  var usb = RPiParts.UsbJack();
  var usbTranslation = array.add(
    usb.parts.flange.calcSnap(mb, "x", "inside+"),
    [2, 0, 0],
    usb.parts.body.calcSnap(mb, "y", "inside-"),
    usb.parts.body.calcSnap(mb, "z", "outside-")
  );

  debug(
    "usbTranslation",
    usbTranslation,
    util.calcmidlineTo(usb.parts.body, "y", 29)
  );
  group.add(
    usb
      .clone()
      .translate(usbTranslation)
      .translate(util.calcmidlineTo(usb.parts.body, "y", 29)),
    "usb1",
    false,
    "usb1"
  );

  group.add(
    usb
      .clone()
      .translate(usbTranslation)
      .translate(util.calcmidlineTo(usb.parts.body, "y", 47)),
    "usb2",
    false,
    "usb2"
  );

  group.add(
    RPiParts.MicroUsb()
      .snap(mb, "z", "outside-")
      .midlineTo("x", 10.6)
      .translate([0, -2, 0]),
    "microusb"
  );

  group.add(
    RPiParts.Hdmi()
      .snap(mb, "z", "outside-")
      .midlineTo("x", 32)
      .translate([0, -2, 0]),
    "hdmi"
  );

  group.add(
    RPiParts.AvJack()
      .snap("block", mb, "z", "outside-")
      .midlineTo("block", "x", 53.5),
    "avjack",
    false,
    "avjack"
  );

  group.add(
    RPiParts.Ribbon().snap(mb, "z", "outside-").midlineTo("x", 45),
    "camera"
  );

  group.add(
    RPiParts.Ribbon()
      .snap(mb, "z", "outside-")
      .midlineTo("x", 3.5)
      .midlineTo("y", 28),
    "display"
  );

  group.add(
    RPiParts.Gpio()
      .snap(mb, "z", "outside-")
      .midlineTo("x", 32.5)
      .midlineTo("y", 52.5),
    "gpio"
  );

  // var led: {
  //   three: { green: {x: 1.1, y: 7.9}},
  //   two: { green: {x: 1.1, y: 7.9}}
  // }
  if (model == 3) {
    group.add(
      RPiParts.BoardLed()
        .snap(mb, "z", "outside-")
        .midlineTo("x", 1.1)
        .midlineTo("y", 7.9)
        .color("lightgreen"),
      "activityled"
    );
    group.add(
      RPiParts.BoardLed()
        .snap(mb, "z", "outside-")
        .midlineTo("x", 1.1)
        .midlineTo("y", 11.5)
        .color("red"),
      "powerled"
    );
  } else {
    group.add(
      RPiParts.BoardLed()
        .snap(mb, "z", "outside-")
        .translate([1, 43.5, 0])
        .color("lightgreen"),
      "activityled"
    );
    group.add(
      RPiParts.BoardLed()
        .snap(mb, "z", "outside-")
        .translate([1, 46, 0])
        .color("red"),
      "powerled"
    );
  }

  group.add(
    Parts.Cube([15.2, 12, 1.5])
      .snap(mb, "z", "outside+")
      .midlineTo("y", 28)
      .translate([-2.5, 0, 0])
      .color("silver"),
    "microsd"
  );

  group.holes = BPlusMounting.holes(mb).combine();

  return group;
}

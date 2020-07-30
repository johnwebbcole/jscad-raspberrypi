/* eslint-disable */
var RaspberryPi;
function initJscadRPi() {
  var Debug = util.Debug;
  var debug = Debug('jscadRPi:initJscadRPi');
  var jsCadCSG = { CSG, CAG };
  var scadApi = {
    vector_text,
    rectangular_extrude,
    vector_char,
    primitives3d: {
      cube,
      sphere,
      cylinder
    },
    extrusions: {
      rectangular_extrude
    },
    text: {
      vector_text,
      vector_char
    },
    booleanOps: {
      union
    }
  };
  var jscadUtils = {
    util,
    Debug,
    parts: Parts,
    Group,
    array,
    triUtils
  };
  // include:compat
  // ../dist/index.js
/* 
 * @jwc/jscad-raspberrypi version 2.0.0 
 * https://gitlab.com/johnwebbcole/jscad-raspberrypi
 */
var jscadRPi = (function (exports, jscadUtils, jsCadCSG, scadApi) {
  'use strict';

  jsCadCSG = jsCadCSG && jsCadCSG.hasOwnProperty('default') ? jsCadCSG['default'] : jsCadCSG;
  var scadApi__default = 'default' in scadApi ? scadApi['default'] : scadApi;

  var CSG$1 = jsCadCSG.CSG;
  var union = scadApi__default.booleanOps.union;
  function RightSide(o, mb) {
    return o.translate(jscadUtils.array.add(o.calcSnap(mb, 'z', 'outside-'), o.calcSnap(mb, 'x', 'inside+'), o.calcSnap(mb, 'y', 'inside-'), [2, 0, 0]));
  }
  function LeftSide(o, mb) {
    return o.translate(calcLeftSide(o, mb));
  }
  function calcLeftSide(o, mb) {
    return jscadUtils.array.add(o.calcSnap(mb, 'z', 'outside-'), o.calcSnap(mb, 'xy', 'inside+'));
  }

  function BPlusMotherboard() {
    return jscadUtils.parts.Board(85, 56, 2, 1.32).color('green', 0.75);
  }
  function MountingHole(diameter, height) {
    var r = (diameter || 2.8) / 2;
    var h = (height || 4) / 2;
    return CSG.cylinder({
      start: [0, 0, -h],
      end: [0, 0, h],
      radius: r
    }).color('orange');
  }
  function Mountingpad(radius, height) {
    var r = (radius || 6.2) / 2;
    var h = (height || 1.5) / 2;
    return CSG.cylinder({
      start: [0, 0, -h],
      end: [0, 0, h],
      radius: r
    }).color('yellow');
  }
  function EthernetJack() {
    var r = jscadUtils.array.div([21.24, 15.88, 13.475], 2);
    return CSG.cube({
      center: [0, 0, 0],
      radius: r
    }).color('lightgray');
  }
  function UsbJack() {
    var jack = jscadUtils.Group('body', jscadUtils.parts.Cube([16.4, 13.36, 17.0 - 1.5]).color('lightgray'));
    jack.add(jscadUtils.parts.Cube([0.75, 15.3, 17.68 - 1.5]).align(jack.parts.body, 'yz').snap(jack.parts.body, 'x', 'outside-').color('lightgray'), 'flange');
    return jack;
  }
  function MicroUsb() {
    return jscadUtils.parts.Cube([7.59, 5.7, 2.64]).color('lightgray');
  }
  function Hdmi() {
    return jscadUtils.parts.Cube([15, 11.57, 7.4]).color('lightgray');
  }
  function AvJack() {
    var block = jscadUtils.parts.Cube([6.9, 12.47, 5.6]).color('lightgray');
    var cyl = jscadUtils.parts.Cylinder(6, 2).rotateX(90).align(block, 'xz').snap(block, 'y', 'outside+').color('black');
    return jscadUtils.Group('block,cylinder', [block, cyl]);
  }
  function Ribbon() {
    return jscadUtils.parts.Cube([3, 22.4, 5.7]).color('gray');
  }
  function Gpio(mb) {
    var gpio = jscadUtils.parts.Cube([50.64, 5, 8.72]).color('gray');
    return mb ? gpio.snap(mb, 'xy', 'inside-').snap(mb, 'z', 'outside-').midlineTo('x', 32.5).midlineTo('y', 52.5) : gpio;
  }
  function BoardLed() {
    return jscadUtils.parts.Cube([1, 2, 0.7]);
  }

  var debug = jscadUtils.Debug('jscadRPi:BPlusMounting');
  function holes(mb) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options = Object.assign(options, {
      height: 8
    });
    debug('holes', mb, options); // var hole = LeftSide(MountingHole(options && options.diameter || undefined, options && options.height || 8), mb);

    var hole = MountingHole(options.diameter, options.height).snap(mb, 'xy', 'inside-').align(mb, 'z');
    var holes = [hole.midlineTo('x', 3.5).midlineTo('y', 3.5), hole.midlineTo('x', 61.5).midlineTo('y', 3.5), hole.midlineTo('x', 3.5).midlineTo('y', 52.5), hole.midlineTo('x', 61.5).midlineTo('y', 52.5)];
    return jscadUtils.Group('hole1,hole2,hole3,hole4', holes);
  }
  /**
   * Create mounting pads for a Raspberry PI model B.
   * @function pads
   * @param  {CSG} [mb]      A pi `mb` object to align to.
   * @param  {object} [options] An options object.
   * @param  {string} [options.snap="outside-"] An options object.
   * @param  {number} [options.height=4] An options object.
   * @return {JsCadUtilsGroup} {description}
   */

  function pads(mb) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options = Object.assign({
      snap: 'outside-',
      height: 4
    }, options);
    var pad = Mountingpad(undefined, options.height).snap(mb, 'z', options.snap).snap(mb, 'xy', 'inside-');
    var pads = [pad.midlineTo('x', 3.5).midlineTo('y', 3.5), pad.midlineTo('x', 61.5).midlineTo('y', 3.5), pad.midlineTo('x', 3.5).midlineTo('y', 52.5), pad.midlineTo('x', 61.5).midlineTo('y', 52.5)]; // var b = mb.getBounds();

    return jscadUtils.Group('pad1,pad2,pad3,pad4', pads); // });
  }
  var BPlusMounting = {
    holes: holes,
    pads: pads
  };

  var debug$1 = jscadUtils.Debug("jscadRPi:BPlus");
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

  function BPlus(model) {
    model = !model ? 2 : model === true ? 3 : model;
    debug$1("BPlus model:", model);
    var mb = BPlusMotherboard();
    var group = jscadUtils.Group("mb", mb); // Right side parts

    group.add(RightSide(EthernetJack(), mb).midlineTo("y", 10.25), "ethernet");
    debug$1("mb", mb);
    var usb = UsbJack();
    var usbTranslation = jscadUtils.array.add(usb.parts.flange.calcSnap(mb, "x", "inside+"), [2, 0, 0], usb.parts.body.calcSnap(mb, "y", "inside-"), usb.parts.body.calcSnap(mb, "z", "outside-"));
    debug$1("usbTranslation", usbTranslation, jscadUtils.util.calcmidlineTo(usb.parts.body, "y", 29));
    group.add(usb.clone().translate(usbTranslation).translate(jscadUtils.util.calcmidlineTo(usb.parts.body, "y", 29)), "usb1", false, "usb1");
    group.add(usb.clone().translate(usbTranslation).translate(jscadUtils.util.calcmidlineTo(usb.parts.body, "y", 47)), "usb2", false, "usb2");
    group.add(MicroUsb().snap(mb, "z", "outside-").midlineTo("x", 10.6).translate([0, -2, 0]), "microusb");
    group.add(Hdmi().snap(mb, "z", "outside-").midlineTo("x", 32).translate([0, -2, 0]), "hdmi");
    group.add(AvJack().snap("block", mb, "z", "outside-").midlineTo("block", "x", 53.5), "avjack", false, "avjack");
    group.add(Ribbon().snap(mb, "z", "outside-").midlineTo("x", 45), "camera");
    group.add(Ribbon().snap(mb, "z", "outside-").midlineTo("x", 3.5).midlineTo("y", 28), "display");
    group.add(Gpio().snap(mb, "z", "outside-").midlineTo("x", 32.5).midlineTo("y", 52.5), "gpio"); // var led: {
    //   three: { green: {x: 1.1, y: 7.9}},
    //   two: { green: {x: 1.1, y: 7.9}}
    // }

    if (model == 3) {
      group.add(BoardLed().snap(mb, "z", "outside-").midlineTo("x", 1.1).midlineTo("y", 7.9).color("lightgreen"), "activityled");
      group.add(BoardLed().snap(mb, "z", "outside-").midlineTo("x", 1.1).midlineTo("y", 11.5).color("red"), "powerled");
    } else {
      group.add(BoardLed().snap(mb, "z", "outside-").translate([1, 43.5, 0]).color("lightgreen"), "activityled");
      group.add(BoardLed().snap(mb, "z", "outside-").translate([1, 46, 0]).color("red"), "powerled");
    }

    group.add(jscadUtils.parts.Cube([15.2, 12, 1.5]).snap(mb, "z", "outside+").midlineTo("y", 28).translate([-2.5, 0, 0]).color("silver"), "microsd");
    group.holes = holes(mb).combine();
    return group;
  }

  /** @typedef {typeof import("@jwc/jscad-utils/src/group").JsCadUtilsGroup} JsCadUtilsGroup */

  /**
   * Returns a Raspberry Pi camera v1 group.
   * ![camera v1 example](../images/camerav1.png)
   * @function CameraModuleV1
   * @return {JsCadUtilsGroup} {description}
   * @exports CameraModuleV1
   * @memberof RaspberryPi
   */

  function CameraModuleV1() {
    var t = 1.1;
    var height = {
      sensor: 5.9 - t,
      board: t
    };
    var g = jscadUtils.Group();
    g.add(jscadUtils.parts.Cube([24, 25, t]).Center().color('green', 0.75), 'board');

    function Hole(x, y) {
      return jscadUtils.parts.Cylinder(2.2, t).snap(g.parts.board, 'xy', 'inside-').midlineTo('x', x).midlineTo('y', y);
    }

    g.holes = [Hole(2, 2).color('yellow'), Hole(2, 23), Hole(12.5 + 2, 2), Hole(12.5 + 2, 23)];
    g.add(jscadUtils.Group('hole0,hole1,hole2,hole3', g.holes), 'hole', false, 'holes');
    var mounts = g.holes.reduce(function (m, h, i) {
      m["mount".concat(i)] = jscadUtils.parts.Cylinder(4, 2).align(h, 'xy').snap(g.parts.board, 'z', 'outside-');
      return m;
    }, {});
    g.add(jscadUtils.Group(mounts), 'mounts', true, 'mounts');
    var pins = g.holes.reduce(function (m, h, i) {
      m["pin".concat(i)] = jscadUtils.parts.Cylinder(jscadUtils.util.nearest.under(1.5), height.board).align(h, 'xy').align(g.parts.board, 'z');
      return m;
    }, {});
    g.add(jscadUtils.Group(pins), 'pins', true, 'pins');
    g.add(jscadUtils.parts.Cube([8.5, 8.5, 2]).snap(g.parts.board, 'xy', 'inside-').snap(g.parts.board, 'z', 'outside-').midlineTo('x', 12.5 + 2).midlineTo('y', 8.5 + 4).color('black'), 'sensor');
    g.add(jscadUtils.parts.Cube([8.5, 8.5, height.sensor - 2]).align(g.parts.sensor, 'xy').snap(g.parts.sensor, 'z', 'outside-').color('gray'), 'lense'); // var lenseribbon = Parts.Cube([7.56, 10, 2])
    //   .snap(board, 'z', 'outside-')
    //   .midlineTo('x', 12.5)
    //   .snap(lense, 'y', 'outside-')
    //   .setColor(0.25, 0.25, 0, 0.5);

    g.add(jscadUtils.parts.Cube([7.56, 10, 2.65 - t]).snap(g.parts.board, 'z', 'outside-').align(g.parts.lense, 'y', 'inside-').snap(g.parts.lense, 'x', 'outside+', -1).color('gray'), 'lenseribbon');
    g.add(jscadUtils.parts.Cube([5.5, 17, 3]).snap(g.parts.board, 'x', 'inside+').snap(g.parts.board, 'y', 'inside-').snap(g.parts.board, 'z', 'outside+').midlineTo('y', 12.5), 'ribbon');
    g.add(jscadUtils.parts.RoundedCube(24 - 5.5, 25, 2.5 - t, 2).snap(g.parts.board, 'xy', 'inside-').snap(g.parts.board, 'z', 'outside+').subtract(g.holes.map(function (hole) {
      return hole.enlarge(3, 3, 5);
    })).color('red'), 'bottom-nogo');
    g.add(g.parts.ribbon.enlarge(2, -1, -1).snap(g.parts.ribbon, 'x', 'outside-').color('red'), 'ribbon-nogo');
    return g;
  }

  /** @typedef {typeof import("@jwc/jscad-utils/src/group").JsCadUtilsGroup} JsCadUtilsGroup */

  /**
   * Returns a Raspberry Pi camera v2 group.
   * ![camera v1 example](../images/camerav2.png)
   * @function CameraModuleV2
   * @return {JsCadUtilsGroup} {description}
   */

  function CameraModuleV1$1() {
    var t = 1.1;
    var height = {
      sensor: 4 - t,
      board: t
    };
    var g = jscadUtils.Group();
    g.add(jscadUtils.parts.RoundedCube(23.862, 25, t, 2).Center().color('green', 0.75), 'board');

    function Hole(x, y) {
      return jscadUtils.parts.Cylinder(2.2, t).snap(g.parts.board, 'xy', 'inside-').midlineTo('x', x).midlineTo('y', y);
    }

    g.holes = [Hole(2, 2).color('yellow'), Hole(2, 23), Hole(14.5, 2), Hole(14.5, 23)];
    g.add(jscadUtils.Group('hole0,hole1,hole2,hole3', g.holes), 'hole', false, 'holes');
    var mounts = g.holes.reduce(function (m, h, i) {
      m["mount".concat(i)] = jscadUtils.parts.Cylinder(4, height.sensor).align(h, 'xy').snap(g.parts.board, 'z', 'outside-');
      return m;
    }, {});
    g.add(jscadUtils.Group(mounts), 'mounts', true, 'mounts');
    var pins = g.holes.reduce(function (m, h, i) {
      m["pin".concat(i)] = jscadUtils.parts.Cylinder(jscadUtils.util.nearest.under(1.5), height.board).align(h, 'xy').align(g.parts.board, 'z');
      return m;
    }, {});
    g.add(jscadUtils.Group(pins), 'pins', true, 'pins');
    g.add(jscadUtils.parts.Cube([8.5, 8.5, height.sensor]).snap(g.parts.board, 'xy', 'inside-').snap(g.parts.board, 'z', 'outside-').midlineTo('x', 14.5).midlineTo('y', 12.5).color('black'), 'sensor');
    g.add(jscadUtils.parts.Cylinder(7.3, 1.6).align(g.parts.sensor, 'xy').snap(g.parts.sensor, 'z', 'outside-').color('gray'), 'lense');
    g.add(jscadUtils.parts.Cube([4, 9, 2.65 - t]).snap(g.parts.board, 'xy', 'inside-').snap(g.parts.board, 'z', 'outside-').midlineTo('x', 4.7).midlineTo('y', 13.8).stretch('x', 4).color('gray'), 'lenseribbon');
    g.add(jscadUtils.parts.Cube([5.5, 20.8, 3.55 - t]).snap(g.parts.board, 'x', 'inside+').snap(g.parts.board, 'y', 'inside-').snap(g.parts.board, 'z', 'outside+').midlineTo('y', 12.5), 'ribbon');
    g.add(jscadUtils.parts.RoundedCube(23.862 - 5.5, 25, 2.5 - t, 2).snap(g.parts.board, 'xy', 'inside-').snap(g.parts.board, 'z', 'outside+').subtract(g.holes.map(function (hole) {
      return hole.enlarge(3, 3, 5);
    })).color('red'), 'bottom-nogo');
    g.add(g.parts.ribbon.enlarge(2, -1, -1).snap(g.parts.ribbon, 'x', 'outside-').color('red'), 'ribbon-nogo');
    return g;
  }

  var union$1 = scadApi.booleanOps.union;
  /** @typedef {typeof import("@jwc/jscad-utils/src/group").JsCadUtilsGroup} JsCadUtilsGroup */

  /**
   * Returns an empty Pi Hat.
   * ![hat example](../images/hat.gif)
   * @function Hat
   * @param  {CSG} [pi] A CSG object, intended to be a RaspberryPi CSG to align the Hat with.
   * @return {JsCadUtilsGroup} A group object with the `mb`, `gpio` and `holes` for a blank RPi hat.
   */

  function Hat(pi) {
    var hat = jscadUtils.Group();
    hat.add(jscadUtils.parts.Board(65.02, 56.39, 3.56, 1.62).color('darkgreen', 0.75), 'mb'); // if (pi) {
    //   mb = mb.translate(mb.calcSnap(pi, 'xy', 'inside-'));
    // }

    var hole = MountingHole().snap(hat.parts.mb, 'xy', 'inside-');
    var holes = union$1(hole.midlineTo('x', 3.56).midlineTo('y', 3.56), hole.midlineTo('x', 61.47).midlineTo('y', 3.56), hole.midlineTo('x', 3.56).midlineTo('y', 52.46), hole.midlineTo('x', 61.47).midlineTo('y', 52.46));
    hat.add(Gpio(hat.parts.mb).snap(hat.parts.mb, 'z', 'outside+'), 'gpio'); // var gpio = Gpio(mb).snap(mb, 'z', 'outside+');
    // var hat = Group('mb,gpio', [mb, gpio]);

    hat.holes = holes;

    if (pi) {
      hat.translate(hat.parts.mb.calcSnap(pi, 'xy', 'inside-')).translate(hat.parts.gpio.calcSnap(pi, 'z', 'outside-'));
    }

    return hat;
  }

  /** @typedef {typeof import("@jwc/jscad-utils/src/group").JsCadUtilsGroup} JsCadUtilsGroup */

  /**
   * Returns an set of standoffs for a RPi Hat.
   * ![hat stand-off example](../images/hat-standoff.png)
   * @function Hat
   * @param  {object} [options] An options object.
   * @param  {number} [options.height] The height of the standoff.
   * @return {JsCadUtilsGroup} A group object with the `mb`, `gpio` and `holes` for a blank RPi hat.
   */

  function HatStandoff() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    options = Object.assign({
      height: 10
    }, options);
    var standoff = Mountingpad(null, options.height);
    var peg = MountingHole(null, options.height + 3);
    return standoff.union(peg);
  }

  /**
   * Returns an Adafruit PiTFT 2.2 Hat with buttons.
   * ![PiTFT 2.2 example](../images/pitft22.png)
   * @function PiTFT22
   * @return {Group} A group of objects to build a PiTFT22.
   */

  function PiTFT22() {
    var hat = Hat();
    var mb = hat.parts.mb;
    var gpio = hat.parts.gpio;
    var group = jscadUtils.Group();
    group.holes = hat.holes;
    group.add(mb, 'mb');
    group.add(gpio, 'gpio');
    group.add(jscadUtils.parts.Cube([45.97, 34.8, 4]).color('black').snap(mb, 'z', 'outside-').midlineTo('x', 33.4).midlineTo('y', 27.18), 'lcd');
    group.add(jscadUtils.parts.Cube([55, 40, 3.5]).snap(mb, 'z', 'outside-').translate([8, 6, 0]).color('white'), 'lcdbevel');
    var buttonBase = jscadUtils.parts.Cube([7, 6, 2.5]).color('gray');
    var button = buttonBase.union(jscadUtils.parts.Cylinder(3.1, 1.2).color('black').snap(buttonBase, 'z', 'outside-').align(buttonBase, 'xy')).snap(mb, 'z', 'outside-');
    var buttons = [button.midlineTo('x', 13.97), button.midlineTo('x', 13.97 + 12.7), button.midlineTo('x', 13.97 + 12.7 + 12.7), button.midlineTo('x', 13.97 + 12.7 + 12.7 + 12.7)];
    group.add(buttons[0], 'button1');
    group.add(buttons[1], 'button2');
    group.add(buttons[2], 'button3');
    group.add(buttons[3], 'button4');
    return group;
  }

  var union$2 = scadApi.booleanOps.union;
  var debug$2 = jscadUtils.Debug('jscadRPi:PiTFT24');
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

  function PiTFT24() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var pi = arguments.length > 1 ? arguments[1] : undefined;
    var hiddenPart = true;
    options = Object.assign(options, {
      buttonCapHeight: 4,
      capBaseHeight: 1,
      buttonWireYOffset: 5,
      clearance: 0.9
    });
    debug$2('PiTFT24', options);
    var hat = Hat(pi);
    var mb = hat.parts.mb;
    var group = jscadUtils.Group();
    group.add(hat.parts.mb, 'mb');
    group.add(hat.parts.gpio, 'gpio');
    group.holes = hat.holes; // var gpio = hat.parts.gpio;

    var sink = 0; // lower the lcd bevel above actual position, and raise LCD up so cases will mould around the lcd better

    var lcd = jscadUtils.parts.Cube([50, 40, 3.72]).color('black');
    group.add(lcd.translate(lcd.calcSnap(mb, 'xy', 'inside-')).translate(lcd.calcSnap(mb, 'z', 'outside-')).translate([7, 0, 0]).translate(lcd.calcmidlineTo('y', 28.32)), 'lcd'); // var lcdbevel = LeftSide(Parts.Cube([60, 42, (5.3 - 1.62) - sink]), mb)
    //     .snap(mb, 'z', 'outside-')
    //     .translate([4.5, 7, 0])
    //     .color('white');
    //

    var lcdbevel = jscadUtils.parts.Cube([60, 42, 5.3 - 1.62 - sink]).color('white');
    group.add(lcdbevel.translate(lcdbevel.calcSnap(mb, 'xy', 'inside-')).translate(lcdbevel.calcSnap(mb, 'z', 'outside-')).translate([4.5, 7, 0]), 'lcdbevel');
    var buttonBase = jscadUtils.parts.Cube([6.1, 3.5, 3.55]).color('beige').snap(mb, 'z', 'outside-').snap(mb, 'xy', 'inside-').midlineTo('y', 2.5);
    var button = buttonBase.union(jscadUtils.parts.Cube([3, 1.5, 0.5]).color('white').snap(buttonBase, 'z', 'outside-').align(buttonBase, 'xy'));
    var buttons = [12.39, 12.39 + 10, 12.39 + 20, 12.39 + 30, 12.39 + 40].map(function (midpoint) {
      return button.midlineTo('x', midpoint);
    });
    group.add(jscadUtils.Group('1,2,3,4,5', buttons), 'buttons', false, 'button');
    var capBaseHeight = options.capBaseHeight;
    var buttonCapBase = jscadUtils.parts.Cube([6.6, 4, capBaseHeight]).color('blue');
    var buttonCapTop = jscadUtils.parts.Cube([6.1, 3.5, options.buttonCapHeight - capBaseHeight]).snap(buttonCapBase, 'z', 'outside-').align(buttonCapBase, 'xy').fillet(1, 'z+').color('deepskyblue');
    var buttonCaps = buttons.map(function (button) {
      return union$2([buttonCapBase, buttonCapTop]).snap(button, 'z', 'outside-').align(button, 'xy');
    });
    group.add(union$2(buttonCaps), 'buttonCaps', hiddenPart);
    group.add(union$2(buttonCaps.map(function (button) {
      return union$2([buttonCapBase.align(button, 'xy').snap(button, 'z', 'inside-').enlarge([options.clearance, options.clearance, 1]), jscadUtils.parts.Cube([6.1, 3.5, options.buttonCapHeight - capBaseHeight]).align(button, 'xy').snap(button, 'z', 'inside-').enlarge([options.clearance, options.clearance, 1])]);
    })), 'buttonCapClearance', hiddenPart);
    var bwthickness = options.capBaseHeight;
    var connector = LeftSide(jscadUtils.parts.Cube([bwthickness, options.buttonWireYOffset, bwthickness]), mb).snap(buttonCaps[0], 'z', 'inside-').snap(buttonCaps[0], 'y', 'outside+').color('blue');
    var buttonWire = jscadUtils.parts.Cube([40, bwthickness, bwthickness]).snap(buttonCaps[0], 'x', 'center-').snap(buttonCaps[0], 'z', 'inside-').snap(connector, 'y', 'inside-').color('blue');
    group.add(union$2(buttonWire), 'buttonWire', hiddenPart);
    var buttonWireConnector = buttonCaps.map(function (buttonCap) {
      return connector.align(buttonCap, 'x');
    });
    group.add(union$2(buttonWireConnector), 'buttonWireConnector', hiddenPart);
    var buttonWireClearance = union$2(buttonWireConnector.map(function (connector) {
      return connector.enlarge([options.clearance, options.clearance, options.buttonCapHeight]);
    })).union(buttonWire.enlarge([options.clearance, options.clearance, options.buttonCapHeight])).snap(buttonWire, 'z', 'inside+').color('red');
    group.add(buttonWireClearance, 'buttonWireClearance', hiddenPart);
    group.add(jscadUtils.parts.Cube([15, 33, 7]).snap(mb, 'x', 'inside-').snap(mb, 'z', 'outside+').align(mb, 'y').color('red'), 'gpio2', hiddenPart);
    return group;
  }

  var debug$3 = jscadUtils.Debug('jscadRPi:Spacer');
  /** @typedef {typeof import("@jwc/jscad-utils/src/triangle")} triangle */

  /**
   * Create a 3d printable support spacer between a RPi and a Hat.
   * @function Spacer
   * @param  {object} [options] An options object
   * @param  {number} [options.height=11] The height of the spacer.
   * @param  {number} [options.thickness=1] Thickness of the gussets.
   * @param  {string} [options.snap="outside-"] Snap side of the spacer to the `mb` parameter.
   * @param  {boolean} [options.gpio=true] Subtract the `gpio` area from the spacer.
   * @param  {number} [options.offset=2] The `z` offset of the gussets from the top of the spacer.
   * @param  {number[]} [options.gussetOutside=[45, 45]] Outside `x`,`y` dimensions of the gussets.
   * @param  {number[]} [options.gussetInside=[40,40]] Inside `x`,`y` dimensions of the gussets.
   * @param  {boolean} [options.postOnly=false] Only return the posts of the spacer, without the gussets.
   * @param  {boolean} [options.hollow=false] Do not include the cross connectors on the gussets.
   * @param  {CSG} mb      A RPi board to place the spacer on.
   * @return {CSG} A CSG object of the spacer.
   * 
   * @exports Spacer
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

  function Spacer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var mb = arguments.length > 1 ? arguments[1] : undefined;
    mb = mb || BPlus().parts.mb;
    options = Object.assign({
      height: 11,
      thickness: 1,
      snap: 'outside-',
      gpio: true,
      offset: 2,
      gussetOutside: [45, 45],
      gussetInside: [40, 40],
      postOnly: false
    }, options);
    var spacer = BPlusMounting.pads(mb, {
      height: options.height,
      snap: options.snap
    });
    var spacers = spacer.combine();
    if (options.postOnly) return spacers.color('yellow');

    if (!options.hollow) {
      var p1 = spacer.parts.pad1.centroid();
      var p2 = spacer.parts.pad4.centroid();
      var tri = jscadUtils.triUtils.solve(p1, p2);
      var dy = Math.sin(jscadUtils.triUtils.toRadians(tri.a)) * 3.5 - 3.5;
      var dx = 3.5 - Math.cos(jscadUtils.triUtils.toRadians(tri.b + 45)) * 3.5;
      var x = jscadUtils.parts.Board(tri.C + 5.5, 6.2, 3.1, options.thickness).rotateZ(tri.b).translate([dx, dy, 0]).snap(spacer.parts.pad1, 'z', 'inside+');
      var cross = x.union(x.mirroredY().translate([0, 56, 0])).snap(spacer.parts.pad1, 'xy', 'inside-').color('red');
    }

    var gussetInterior = jscadUtils.parts.Board(options.gussetInside[0], options.gussetInside[1], 3, options.thickness).align(spacers, 'xy');
    var gusset = jscadUtils.parts.Board(options.gussetOutside[0], options.gussetOutside[1], 3, options.thickness).align(spacers, 'xy').subtract(gussetInterior).snap(spacer.parts.pad1, 'z', 'inside+');
    var gpio = Gpio(mb);
    var assembly = spacers.union(gusset.unionIf(cross, !options.hollow).translate([0, 0, -options.offset])).subtractIf(gpio.enlarge([1, 1, 0]), options.gpio);
    return assembly.color('yellow');
  }

  exports.BPlus = BPlus;
  exports.CameraModuleV1 = CameraModuleV1;
  exports.CameraModuleV2 = CameraModuleV1$1;
  exports.Hat = Hat;
  exports.HatStandoff = HatStandoff;
  exports.PiTFT22 = PiTFT22;
  exports.PiTFT24 = PiTFT24;
  exports.Spacer = Spacer;

  return exports;

}({}, jscadUtils, jsCadCSG, scadApi));
/* @jwc/jscad-raspberrypi follow me on Twitter! @johnwebbcole */

  // end:compat

  debug('jscadRPi', jscadRPi);
  RaspberryPi = jscadRPi;
}

/**
 * Add `initJscadGears` to the init queue for `util.init`.
 */
jscadUtilsPluginInit.push(initJscadRPi);
/* eslint-enable */

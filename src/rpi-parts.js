import { parts as Parts, Group, util, array } from '@jwc/jscad-utils';

export function BPlusMotherboard() {
  return Parts.Board(85, 56, 2, 1.32).color('green', 0.75);
}

export function MountingHole(diameter, height) {
  var r = (diameter || 2.8) / 2;
  var h = (height || 4) / 2;
  return CSG.cylinder({
    start: [0, 0, -h],
    end: [0, 0, h],
    radius: r
  }).color('orange');
}

export function Mountingpad(radius, height) {
  var r = (radius || 6.2) / 2;
  var h = (height || 1.5) / 2;
  return CSG.cylinder({
    start: [0, 0, -h],
    end: [0, 0, h],
    radius: r
  }).color('yellow');
}

export function EthernetJack() {
  var r = array.div([21.24, 15.88, 13.475], 2);
  return CSG.cube({
    center: [0, 0, 0],
    radius: r
  }).color('lightgray');
}

export function UsbJack() {
  var jack = Group(
    'body',
    Parts.Cube([16.4, 13.36, 17.0 - 1.5]).color('lightgray')
  );
  jack.add(
    Parts.Cube([0.75, 15.3, 17.68 - 1.5])
      .align(jack.parts.body, 'yz')
      .snap(jack.parts.body, 'x', 'outside-')
      .color('lightgray'),
    'flange'
  );

  return jack;
}

export function MicroUsb() {
  return Parts.Cube([7.59, 5.7, 2.64]).color('lightgray');
}

export function Hdmi() {
  return Parts.Cube([15, 11.57, 7.4]).color('lightgray');
}

export function AvJack() {
  var block = Parts.Cube([6.9, 12.47, 5.6]).color('lightgray');
  var cyl = Parts.Cylinder(6, 2)
    .rotateX(90)
    .align(block, 'xz')
    .snap(block, 'y', 'outside+')
    .color('black');
  return Group('block,cylinder', [block, cyl]);
}

export function Ribbon() {
  return Parts.Cube([3, 22.4, 5.7]).color('gray');
}

export function Gpio(mb) {
  var gpio = Parts.Cube([50.64, 5, 8.72]).color('gray');
  return mb
    ? gpio
        .snap(mb, 'xy', 'inside-')
        .snap(mb, 'z', 'outside-')
        .midlineTo('x', 32.5)
        .midlineTo('y', 52.5)
    : gpio;
}
export function BoardLed() {
  return Parts.Cube([1, 2, 0.7]);
}

export function MicroUsbPlug(port) {
  var plug = Parts.Cube([10.28, 13, 6.24])
    .snap(port, 'y', 'outside+')
    .translate([0, -2.2, 0]);
  var connector = Parts.Cube([7, 5.5, 2.28])
    .snap(plug, 'y', 'outside-')
    .align(plug, 'x')
    .align(plug, 'z');
  var strainrelief = Parts.Cylinder(4.28, 8)
    .rotateX(90)
    .snap(plug, 'y', 'outside+')
    .align(plug, 'x')
    .align(plug, 'z');
  var cord = Parts.Cylinder(2.82, 10)
    .rotateX(90)
    .snap(strainrelief, 'y', 'outside+')
    .align(strainrelief, 'x')
    .align(strainrelief, 'z');

  var srsz = strainrelief.size();

  var srcutoutup = Parts.Cube([srsz.x, srsz.y, 20])
    .snap(strainrelief, 'z', 'inside-')
    .align(strainrelief, 'xy')
    .translate([0, 0, 4.28 / 2])
    .union(strainrelief);

  var srcutoutdown = Parts.Cube([srsz.x, srsz.y, 20])
    .snap(strainrelief, 'z', 'outside-')
    .align(strainrelief, 'xy')
    .translate([0, 0, 4.28 / 2])
    .union(strainrelief);

  var dt = util.calcCenterWith(plug, 'xz', port);

  return Group('plug,connector,strainrelief,cord,srcutoutup,srcutoutdown', [
    plug,
    connector,
    strainrelief,
    cord,
    srcutoutup,
    srcutoutdown
  ]).map(function(part) {
    return part.translate(dt);
  });
}

export function UsbWifiAdapter(usbport, up) {
  // 4.63 - 2.22
  var connector = Parts.Cube([12, 12, 4.63])
    .snap(usbport, 'x', 'outside-')
    .snap(usbport, 'z', 'inside-')
    .align(usbport, 'y')
    .midlineTo('z', up ? 13.1 : 4.5)
    .translate([-8.5, 0, 0])
    .translate([0, 0, -1]);
  // var head = Parts.Cube([5.6, 15, 7.23])
  //     .snap(connector, 'x', 'outside-')
  //     .align(connector, 'y')
  //     .align(connector, 'z');
  return connector.color('blue');
}

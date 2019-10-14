import { util, Group, parts as Parts } from '@jwc/jscad-utils';

/** @typedef {typeof import("@jwc/jscad-utils/src/group").JsCadUtilsGroup} JsCadUtilsGroup */

/**
 * Returns a Raspberry Pi camera v1 group.
 * ![camera v1 example](../images/camerav1.png)
 * @function CameraModuleV1
 * @return {JsCadUtilsGroup} {description}
 * @exports CameraModuleV1
 * @memberof RaspberryPi
 */
export default function CameraModuleV1() {
  var t = 1.1;
  var height = { sensor: 5.9 - t, board: t };
  var g = Group();

  g.add(
    Parts.Cube([24, 25, t])
      .Center()
      .color('green', 0.75),
    'board'
  );

  function Hole(x, y) {
    return Parts.Cylinder(2.2, t)
      .snap(g.parts.board, 'xy', 'inside-')
      .midlineTo('x', x)
      .midlineTo('y', y);
  }

  g.holes = [
    Hole(2, 2).color('yellow'),
    Hole(2, 23),
    Hole(12.5 + 2, 2),
    Hole(12.5 + 2, 23)
  ];

  g.add(Group('hole0,hole1,hole2,hole3', g.holes), 'hole', false, 'holes');

  var mounts = g.holes.reduce(function(m, h, i) {
    m[`mount${i}`] = Parts.Cylinder(4, 2)
      .align(h, 'xy')
      .snap(g.parts.board, 'z', 'outside-');
    return m;
  }, {});

  g.add(Group(mounts), 'mounts', true, 'mounts');
  var pins = g.holes.reduce(function(m, h, i) {
    m[`pin${i}`] = Parts.Cylinder(util.nearest.under(1.5), height.board)
      .align(h, 'xy')
      .align(g.parts.board, 'z');
    return m;
  }, {});

  g.add(Group(pins), 'pins', true, 'pins');

  g.add(
    Parts.Cube([8.5, 8.5, 2])
      .snap(g.parts.board, 'xy', 'inside-')
      .snap(g.parts.board, 'z', 'outside-')
      .midlineTo('x', 12.5 + 2)
      .midlineTo('y', 8.5 + 4)
      .color('black'),
    'sensor'
  );

  g.add(
    Parts.Cube([8.5, 8.5, height.sensor - 2])
      .align(g.parts.sensor, 'xy')
      .snap(g.parts.sensor, 'z', 'outside-')
      .color('gray'),
    'lense'
  );

  // var lenseribbon = Parts.Cube([7.56, 10, 2])
  //   .snap(board, 'z', 'outside-')
  //   .midlineTo('x', 12.5)
  //   .snap(lense, 'y', 'outside-')
  //   .setColor(0.25, 0.25, 0, 0.5);

  g.add(
    Parts.Cube([7.56, 10, 2.65 - t])
      .snap(g.parts.board, 'z', 'outside-')
      .align(g.parts.lense, 'y', 'inside-')
      .snap(g.parts.lense, 'x', 'outside+', -1)
      .color('gray'),
    'lenseribbon'
  );

  g.add(
    Parts.Cube([5.5, 17, 3])
      .snap(g.parts.board, 'x', 'inside+')
      .snap(g.parts.board, 'y', 'inside-')
      .snap(g.parts.board, 'z', 'outside+')
      .midlineTo('y', 12.5),
    'ribbon'
  );

  g.add(
    Parts.RoundedCube(24 - 5.5, 25, 2.5 - t, 2)
      .snap(g.parts.board, 'xy', 'inside-')
      .snap(g.parts.board, 'z', 'outside+')
      .subtract(g.holes.map(hole => hole.enlarge(3, 3, 5)))
      .color('red'),
    'bottom-nogo'
  );

  g.add(
    g.parts.ribbon
      .enlarge(2, -1, -1)
      .snap(g.parts.ribbon, 'x', 'outside-')
      .color('red'),
    'ribbon-nogo'
  );
  return g;
}

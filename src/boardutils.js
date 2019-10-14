import { util, array } from '@jwc/jscad-utils';
import jsCadCSG from '@jscad/csg';
const { CSG } = jsCadCSG;
import scadApi from '@jscad/scad-api';
const { union } = scadApi.booleanOps;

export function CornerHole(r, size, center) {
  center = center || r;
  return CSG.cylinder({
    start: [0, 0, 0],
    end: [0, 0, size.z * 2],
    radius: r
  })
    .translate([-(size.x / 2) + center, size.y / 2 - center, 0])
    .setColor(0.75, 0, 0);
}

export function Hole(r, h, x) {
  return CSG.cylinder({
    start: [0, 0, -h],
    end: [0, 0, h],
    radius: r
  })
    .translate([x / 2 - (r + 2.5), 0, h])
    .setColor(0.75, 0.75, 0);
}

export function Corners(board, z) {
  var boardsize = util.size(board.getBounds());

  var r = {
    height: 5,
    width: 4
  };

  var c = {
    x: 2.5,
    y: 2.5,
    z: z || 2
  };

  var inset = 1.5;
  var corner = CSG.cube({
    center: [0, 0, c.z],
    radius: [c.x, c.y, c.z]
  })
    .translate([boardsize.x / 2 - inset, boardsize.y / 2 - inset, 0])
    .subtract(board.translate([0, 0, r.height - 2.25]))
    .subtract(board.scale([0.92, 0.95, 2]).translate([0, 0, 1]))
    .setColor(0, 0, 1);

  var corners = util.mirrored4(corner);
  return corners;
}

export function CenterHoles(hole_r, boardinfo) {
  var hole = Hole(hole_r, boardinfo.size.z, boardinfo.size.x);
  return union([hole, hole.mirroredX(90)]);
}

export function CornerHoles(hole_r, boardinfo) {
  return util.mirrored4(CornerHole(hole_r, boardinfo.size, 3.5));
}

export function RightSide(o, mb) {
  return o.translate(
    array.add(
      o.calcSnap(mb, 'z', 'outside-'),
      o.calcSnap(mb, 'x', 'inside+'),
      o.calcSnap(mb, 'y', 'inside-'),
      [2, 0, 0]
    )
  );
}

export function LeftSide(o, mb) {
  return o.translate(calcLeftSide(o, mb));
}

export function calcLeftSide(o, mb) {
  return array.add(
    o.calcSnap(mb, 'z', 'outside-'),
    o.calcSnap(mb, 'xy', 'inside+')
  );
}

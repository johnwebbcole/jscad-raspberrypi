import { Group, parts as Parts } from '@jwc/jscad-utils';

/** @typedef {typeof import("@jwc/jscad-utils/src/group").JsCadUtilsGroup} JsCadUtilsGroup */

/**
 * Returns a Raspberry Pi HQ camera JsCadUtilsGroup object.
 * ![camera HQ example](../images/cameraHQ.png)
 *
 * > Default Parts
 *
 *    [
 *      'board',
 *      'sensor',
 *      'mount',
 *      'tripodMount',
 *      'ribbon',
 *      'ribbon-nogo',
 *    ]
 *
 *> All parts
 *
 *    [
 *      'board',
 *      'hole1',
 *      'hole2',
 *      'hole3',
 *      'hole4',
 *      'sensor',
 *      'mount',
 *      'mount-clearance',
 *      'tripodMount',
 *      'ribbon',
 *      'ribbon-nogo',
 *    ]
 *
 * @function CameraModuleV2
 * @return {JsCadUtilsGroup} {description}
 */
export default function HQCameraModule() {
  var t = 1.1;
  var height = { sensor: 4 - t, board: t };
  var camera = Group();

  camera.add(
    Parts.RoundedCube(38, 38, t, 1.4).Center().color('green', 0.75),
    'board'
  );

  var hole = Parts.Cylinder(3.25, 10)
    .snap(camera.parts.board, 'xy', 'inside+', 1.25)
    .translate([-4, -4, -5])

    .color('red');
  camera.add(hole, 'hole1', true);
  camera.add(hole.rotateZ(90), 'hole2', true);
  camera.add(hole.rotateZ(180), 'hole3', true);
  camera.add(hole.rotateZ(-90), 'hole4', true);
  camera.holes.push(...camera.array('hole1,hole2,hole3,hole4'));

  var sensor = Parts.Cube([8.5, 8.5, 1])
    .snap(camera.parts.board, 'z', 'outside-')
    .align(camera.parts.board, 'xy')
    .color('white');
  camera.add(sensor, 'sensor');

  var mount = Parts.Cylinder(36, 10.2)
    .snap(camera.parts.board, 'z', 'outside-')
    .align(camera.parts.board, 'xy')
    .color('black');

  var mountInside = Parts.Cylinder(30.75, 10.2)
    .snap(camera.parts.board, 'z', 'outside-')
    .align(camera.parts.board, 'xy')
    .color('black');
  camera.add(mount.subtract(mountInside), 'mount');

  camera.add(mount, 'mount-clearance', true);

  var tripodMount = Parts.Cube([13.97, 12, 11])
    .snap(mount, 'z', 'inside+')
    .snap(camera.parts.board, 'y', 'outside+')
    .align(mount, 'x')
    .color('gray');

  camera.add(
    tripodMount.union(
      Parts.Cube([24.5, 10, 7.62])
        .snap(mount, 'z', 'inside+')
        .snap(tripodMount, 'y', 'outside-')
        .align(mount, 'x')
        .color('darkgray')
        .subtract(mountInside)
    ),
    'tripodMount'
  );

  camera.add(
    Parts.Cube([20.8, 5.5, 3.55 - t])
      .snap(camera.parts.board, 'y', 'inside-')
      .snap(camera.parts.board, 'z', 'outside+')
      .align(camera.parts.board, 'x'),
    'ribbon'
  );

  camera.add(
    camera.parts.ribbon
      .enlarge(2, 4, -1)
      .snap(camera.parts.ribbon, 'y', 'outside+')
      .color('red'),
    'ribbon-nogo'
  );

  return camera;
}

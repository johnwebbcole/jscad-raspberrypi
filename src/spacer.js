import { triUtils, parts as Parts, Debug } from '@jwc/jscad-utils';
import BPlus from './bplus';
import BPlusMounting from './bplus-mounting';
import { Gpio } from './rpi-parts';
const debug = Debug('jscadRPi:Spacer');

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
export default function Spacer(options = {}, mb) {
  mb = mb || BPlus().parts.mb;
  options = Object.assign(
    {
      height: 11,
      thickness: 1,
      snap: 'outside-',
      gpio: true,
      offset: 2,
      gussetOutside: [45, 45],
      gussetInside: [40, 40],
      postOnly: false
    },
    options
  );

  var spacer = BPlusMounting.pads(mb, {
    height: options.height,
    snap: options.snap
  });

  var spacers = spacer.combine();

  if (options.postOnly) return spacers.color('yellow');

  if (!options.hollow) {
    var p1 = spacer.parts.pad1.centroid();
    var p2 = spacer.parts.pad4.centroid();
    var tri = triUtils.solve(p1, p2);
    var dy = Math.sin(triUtils.toRadians(tri.a)) * 3.5 - 3.5;
    var dx = 3.5 - Math.cos(triUtils.toRadians(tri.b + 45)) * 3.5;
    var x = Parts.Board(tri.C + 5.5, 6.2, 3.1, options.thickness)
      .rotateZ(tri.b)
      .translate([dx, dy, 0])
      .snap(spacer.parts.pad1, 'z', 'inside+');
    var cross = x
      .union(x.mirroredY().translate([0, 56, 0]))
      .snap(spacer.parts.pad1, 'xy', 'inside-')
      .color('red');
  }

  var gussetInterior = Parts.Board(
    options.gussetInside[0],
    options.gussetInside[1],
    3,
    options.thickness
  ).align(spacers, 'xy');

  var gusset = Parts.Board(
    options.gussetOutside[0],
    options.gussetOutside[1],
    3,
    options.thickness
  )
    .align(spacers, 'xy')
    .subtract(gussetInterior)
    .snap(spacer.parts.pad1, 'z', 'inside+');

  var gpio = Gpio(mb);

  var assembly = spacers
    .union(
      gusset.unionIf(cross, !options.hollow).translate([0, 0, -options.offset])
    )
    .subtractIf(gpio.enlarge([1, 1, 0]), options.gpio);

  return assembly.color('yellow');
}

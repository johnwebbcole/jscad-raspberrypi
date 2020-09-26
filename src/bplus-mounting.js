import { Debug, Group } from '@jwc/jscad-utils';
import { MountingHole, Mountingpad } from './rpi-parts';
const debug = Debug('jscadRPi:BPlusMounting');

export function holes(mb, options = {}) {
  options = Object.assign(options, {
    height: 8,
  });
  debug('holes', mb, options);

  // var hole = LeftSide(MountingHole(options && options.diameter || undefined, options && options.height || 8), mb);
  var hole = MountingHole(options.diameter || 3.25, options.height)
    .snap(mb, 'xy', 'inside-')
    .align(mb, 'z');

  var holes = [
    hole.midlineTo('x', 3.5).midlineTo('y', 3.5),
    hole.midlineTo('x', 61.5).midlineTo('y', 3.5),
    hole.midlineTo('x', 3.5).midlineTo('y', 52.5),
    hole.midlineTo('x', 61.5).midlineTo('y', 52.5),
  ];

  return Group('hole1,hole2,hole3,hole4', holes);
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
export function pads(mb, options = {}) {
  options = Object.assign(
    {
      snap: 'outside-',
      height: 4,
    },
    options
  );
  var pad = Mountingpad(undefined, options.height)
    .snap(mb, 'z', options.snap)
    .snap(mb, 'xy', 'inside-');

  var pads = [
    pad.midlineTo('x', 3.5).midlineTo('y', 3.5),
    pad.midlineTo('x', 61.5).midlineTo('y', 3.5),
    pad.midlineTo('x', 3.5).midlineTo('y', 52.5),
    pad.midlineTo('x', 61.5).midlineTo('y', 52.5),
  ];

  // var b = mb.getBounds();
  return Group('pad1,pad2,pad3,pad4', pads);
  // });
}

export default { holes, pads };

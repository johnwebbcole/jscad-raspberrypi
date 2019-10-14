import { MountingHole, Mountingpad } from './rpi-parts';

/** @typedef {typeof import("@jwc/jscad-utils/src/group").JsCadUtilsGroup} JsCadUtilsGroup */

/**
 * Returns an set of standoffs for a RPi Hat.
 * ![hat stand-off example](../images/hat-standoff.png)
 * @function Hat
 * @param  {object} [options] An options object.
 * @param  {number} [options.height] The height of the standoff.
 * @return {JsCadUtilsGroup} A group object with the `mb`, `gpio` and `holes` for a blank RPi hat.
 */
export default function HatStandoff(options = {}) {
  options = Object.assign({ height: 10 }, options);
  var standoff = Mountingpad(null, options.height);
  var peg = MountingHole(null, options.height + 3);
  return standoff.union(peg);
}

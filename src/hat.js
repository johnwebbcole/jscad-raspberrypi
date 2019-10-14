import { Group, parts as Parts } from '@jwc/jscad-utils';
import { Gpio, MountingHole } from './rpi-parts';
import { booleanOps } from '@jscad/scad-api';
const { union } = booleanOps;

/** @typedef {typeof import("@jwc/jscad-utils/src/group").JsCadUtilsGroup} JsCadUtilsGroup */

/**
 * Returns an empty Pi Hat.
 * ![hat example](../images/hat.gif)
 * @function Hat
 * @param  {CSG} [pi] A CSG object, intended to be a RaspberryPi CSG to align the Hat with.
 * @return {JsCadUtilsGroup} A group object with the `mb`, `gpio` and `holes` for a blank RPi hat.
 */
export default function Hat(pi) {
  var hat = Group();
  hat.add(Parts.Board(65.02, 56.39, 3.56, 1.62).color('darkgreen', 0.75), 'mb');

  // if (pi) {
  //   mb = mb.translate(mb.calcSnap(pi, 'xy', 'inside-'));
  // }

  var hole = MountingHole().snap(hat.parts.mb, 'xy', 'inside-');
  var holes = union(
    hole.midlineTo('x', 3.56).midlineTo('y', 3.56),
    hole.midlineTo('x', 61.47).midlineTo('y', 3.56),
    hole.midlineTo('x', 3.56).midlineTo('y', 52.46),
    hole.midlineTo('x', 61.47).midlineTo('y', 52.46)
  );

  hat.add(Gpio(hat.parts.mb).snap(hat.parts.mb, 'z', 'outside+'), 'gpio');
  // var gpio = Gpio(mb).snap(mb, 'z', 'outside+');

  // var hat = Group('mb,gpio', [mb, gpio]);
  hat.holes = holes;

  if (pi) {
    hat
      .translate(hat.parts.mb.calcSnap(pi, 'xy', 'inside-'))
      .translate(hat.parts.gpio.calcSnap(pi, 'z', 'outside-'));
  }
  return hat;
}

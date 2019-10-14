import { parts as Parts, Group } from '@jwc/jscad-utils';
import Hat from './hat';

/**
 * Returns an Adafruit PiTFT 2.2 Hat with buttons.
 * ![PiTFT 2.2 example](../images/pitft22.png)
 * @function PiTFT22
 * @return {Group} A group of objects to build a PiTFT22.
 */
export default function PiTFT22() {
  var hat = Hat();
  var mb = hat.parts.mb;
  var gpio = hat.parts.gpio;

  var group = Group();
  group.holes = hat.holes;

  group.add(mb, 'mb');
  group.add(gpio, 'gpio');
  group.add(
    Parts.Cube([45.97, 34.8, 4])
      .color('black')
      .snap(mb, 'z', 'outside-')
      .midlineTo('x', 33.4)
      .midlineTo('y', 27.18),
    'lcd'
  );
  group.add(
    Parts.Cube([55, 40, 3.5])
      .snap(mb, 'z', 'outside-')
      .translate([8, 6, 0])
      .color('white'),
    'lcdbevel'
  );

  var buttonBase = Parts.Cube([7, 6, 2.5]).color('gray');
  var button = buttonBase
    .union(
      Parts.Cylinder(3.1, 1.2)
        .color('black')
        .snap(buttonBase, 'z', 'outside-')
        .align(buttonBase, 'xy')
    )
    .snap(mb, 'z', 'outside-');

  var buttons = [
    button.midlineTo('x', 13.97),
    button.midlineTo('x', 13.97 + 12.7),
    button.midlineTo('x', 13.97 + 12.7 + 12.7),
    button.midlineTo('x', 13.97 + 12.7 + 12.7 + 12.7)
  ];

  group.add(buttons[0], 'button1');
  group.add(buttons[1], 'button2');
  group.add(buttons[2], 'button3');
  group.add(buttons[3], 'button4');

  return group;
}

import { parts as Parts, Group } from '@jwc/jscad-utils';

/**
 * Returns an Pi camera module.
 * @function CameraModule
 * @return {Group} {description}
 */
export default function CameraModule() {
  var board = Parts.Cube([25, 24, 1]).color('green', 0.75);
  var hole = this.Parts.MountingHole(2)
    .snap(board, 'x', 'inside-')
    .snap(board, 'y', 'inside-');
  var holes = [
    hole.translate([1, 21, 0]),
    hole.translate([1, 21 - 12.5, 0]),
    hole.translate([22, 21, 0]),
    hole.translate([22, 21 - 12.5, 0])
  ];

  var lense = Parts.Cube([8, 8, 5.5])
    .snap(board, 'z', 'outside-')
    .midlineTo('y', 9.5)
    .midlineTo('x', 12.5);
  var lenseribbon = Parts.Cube([7.56, 10, 2])
    .snap(board, 'z', 'outside-')
    .midlineTo('x', 12.5)
    .snap(lense, 'y', 'outside-')
    .setColor(0.25, 0.25, 0, 0.5);
  var led = Parts.Cube([4, 3, 1])
    .snap(board, 'z', 'outside-')
    .translate([17, 18, 0])
    .setColor(1, 0, 0, 0.5);
  var ribbon = Parts.Cube([20.78, 6, 2.64])
    .snap(board, 'z', 'outside+')
    .midlineTo('x', 12.5);
  var stuff = Parts.Cube([18, 12.5, 1])
    .snap(board, 'z', 'outside+')
    .midlineTo('x', 12.5)
    .midlineTo('y', 9.5 + 12.5 / 2);

  var group = Group(
    'board,lenseribbon,lense,ribbon,led,stuff,hole1,hole2,hole3,hole4',
    [
      board,
      lenseribbon,
      lense,
      ribbon,
      led,
      stuff,
      holes[0],
      holes[1],
      holes[2],
      holes[3]
    ]
  );

  group.holes = holes;
  return group;
}

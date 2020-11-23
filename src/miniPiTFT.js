import { Group, parts as Parts, util } from '@jwc/jscad-utils';

function boardButton(name, board, midline) {
  var g = Group(name);
  g.add(
    Parts.Cube([6.5, 6.5, 2])
      .color('silver')
      .snap(board, 'xy', 'inside-')
      .snap(board, 'z', 'outside-')
      .midlineTo('y', midline),
    'base'
  );
  g.add(
    Parts.Cylinder(3, 1)
      .color('black')
      .align(g.parts.base, 'xy')
      .snap(g.parts.base, 'z', 'outside-'),
    'push'
  );

  return g;
}

function buttonCap(name, button) {
  var g = Group(name);
  g.add(
    Parts.Cylinder(4, 3)
      .fillet(1, 'z+')
      // .translate([0, 0, 1])
      .union(
        Parts.Cylinder(6, 0.5).bisect('x', -0.5).parts.negative //.translate([0, 0, 1])
      )

      .color('blue')
      .align(button, 'xy')
      .snap(button, 'z', 'outside-'),
    'cap'
  );

  g.add(
    Parts.Cylinder(7, 0.75)
      .bisect('x', -0.5)
      .parts.negative.color('green')
      .union(Parts.Cylinder(4.5, 2).color('yellow').translate([0, 0, 0]))
      .align(g.parts.cap, 'xy')
      .snap(g.parts.cap, 'z', 'inside-'),
    // .color('red'),
    'clearance',
    true
  );
  return g;
}

/**
 * Returns an Adafruit miniPiTFT Hat with buttons.
 *
 * Default parts: board,screen,display,button1,button2
 *
 * All parts: board,screen,display,display-clearance,button1,button1-base,button1-push,button2,button2-base,button2-push,buttonCap1,buttonCap1-cap,buttonCap1-clearance,buttonCap2,buttonCap2-cap,buttonCap2-clearance,button-connector,button-connector-clearance,standoff
 *
 * ![miniPiTFT example](../images/miniPiTFT.png)
 * @function miniPiTFT
 */
export default function miniPiTFT() {
  var g = Group('miniPiTFT');

  var board = Parts.RoundedCube(util.inch(2), util.inch(1), 2, 2)
    .bisect('x', util.inch(1.5))
    .parts.negative.bisect('y', -util.inch(0.96))
    .parts.negative.color('darkgreen');

  g.add(board, 'board');

  g.add(
    Parts.Cube([31, 18, 2])
      .color('white')
      .snap(board, 'x', 'inside+')
      .snap(board, 'y', 'inside-')
      .snap(board, 'z', 'outside-'),
    'screen'
  );

  g.add(
    Parts.Cube([util.inch(0.98), util.inch(0.58), 2.01])
      .color('black')
      .snap(board, 'x', 'inside-', util.inch(0.34))
      .snap(board, 'y', 'inside+', -util.inch(0.32))
      .snap(board, 'z', 'outside-'),
    'display'
  );

  g.add(
    g.parts.display
      .stretch('z', 5)
      .chamfer(-5, 'z+')
      .align(g.parts.display, 'xy')
      .color('red'),
    'display-clearance',
    true
  );

  g.add(
    boardButton('button1', board, util.inch(0.53)),
    'button1',
    false,
    'button1-'
  );

  g.add(
    boardButton('button2', board, util.inch(0.18)),
    'button2',
    false,
    'button2-'
  );

  g.add(
    buttonCap('buttonCap1', g.parts.button1),
    'buttonCap1',
    true,
    'buttonCap1-'
  );
  g.add(
    buttonCap('buttonCap2', g.parts.button2),
    'buttonCap2',
    true,
    'buttonCap2-'
  );

  g.add(
    Parts.Cube([1, 5, 0.5])
      .color('blue')
      .align(g.parts.buttonCap1, 'x')
      .snap(g.parts.buttonCap1, 'y', 'outside+', 1)
      .snap(g.parts.buttonCap1, 'z', 'inside-'),
    'button-connector',
    true
  );

  g.add(
    g.parts['button-connector'].enlarge(0.5, 0.5, 0.5).color('red'),
    'button-connector-clearance',
    true
  );

  g.add(
    Parts.Tube(7, 3, 7.5)
      .snap(board, 'x', 'inside-')
      .snap(board, 'y', 'inside+')
      .snap(board, 'z', 'outside+')
      .color('yellow'),
    'standoff',
    true
  );

  return g;
}

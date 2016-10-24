/**
 * @module RaspberryPi
 */

_boardutils = {
    CornerHole: function makeCornerHole(r, size, center) {
        center = center || r;
        return CSG.cylinder({
            start: [0, 0, 0],
            end: [0, 0, size.z * 2],
            radius: r
        }).translate([-(size.x / 2) + (center), (size.y / 2) - (center), 0]).setColor(0.75, 0, 0);
    },


    Hole: function makeHole(r, h, x) {
        return CSG.cylinder({
            start: [0, 0, -h],
            end: [0, 0, h],
            radius: r
        }).translate([(x / 2) - (r + 2.5), 0, h]).setColor(0.75, 0.75, 0);
    },

    Corners: function Corners(board, z) {
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
            .translate([(boardsize.x / 2) - inset, (boardsize.y / 2) - inset, 0])
            .subtract(board.translate([0, 0, r.height - 2.25]))
            .subtract(board.scale([0.92, 0.95, 2]).translate([0, 0, 1]))
            .setColor(0, 0, 1);

        var corners = util.mirrored4(corner);
        return corners;
    },

    CenterHoles: function (hole_r, boardinfo) {
        var hole = _boardutils.Hole(hole_r, boardinfo.size.z, boardinfo.size.x);
        return union([hole, hole.mirroredX(90)]);
    },

    CornerHoles: function (hole_r, boardinfo) {
        return util.mirrored4(_boardutils.CornerHole(hole_r, boardinfo.size, 3.5));
    }
};

function RightSide(o, mb) {
    return o.translate(util.array.add(
        o.calcSnap(mb, 'z', 'outside-'),
        o.calcSnap(mb, 'x', 'inside+'),
        o.calcSnap(mb, 'y', 'inside-'), [2, 0, 0]));
}

function LeftSide(o, mb) {
    return o.translate(calcLeftSide(o, mb));
}

function calcLeftSide(o, mb) {
    return util.array.add(
        o.calcSnap(mb, 'z', 'outside-'),
        o.calcSnap(mb, 'xy', 'inside+'));
}

/**
 * jscad-raspberrypi
 * @type {Object}
 * @exports RaspberryPi
 */
RaspberryPi = {

    Parts: {
        BPlusMotherboard: function () {
            return Parts.Board(85, 56, 2, 1.32).color('green');
        },

        MountingHole: function (diameter, height) {
            var r = (diameter || 2.8) / 2;
            var h = (height || 4) / 2;
            return CSG.cylinder({
                start: [0, 0, -h],
                end: [0, 0, h],
                radius: r
            }).color('orange');
        },

        Mountingpad: function (radius, height) {
            var r = (radius || 6.2) / 2;
            var h = (height || 1.5) / 2;
            return CSG.cylinder({
                start: [0, 0, -h],
                end: [0, 0, h],
                radius: r
            }).color('yellow');
        },

        EthernetJack: function () {
            var r = util.divA([21.24, 15.88, 13.475], 2);
            return CSG.cube({
                    center: [0, 0, 0],
                    radius: r
                })
                .color('lightgray');
        },

        UsbJack: function () {
            var jack = util.group('body', Parts.Cube([16.4, 13.36, 17.0 - 1.5]).color('lightgray'));
            jack.add(Parts.Cube([0.75, 15.3, 17.68 - 1.5])
                .align(jack.parts.body, 'yz')
                .snap(jack.parts.body, 'x', 'outside-')
                .color('lightgray'), 'flange');

            return jack;
        },

        MicroUsb: function () {
            return Parts.Cube([7.59, 5.7, 2.64]).color('lightgray');
        },

        Hdmi: function () {
            return Parts.Cube([15, 11.57, 7.4]).color('lightgray');
        },

        AvJack: function () {
            var block = Parts.Cube([6.9, 12.47, 5.6]).color('lightgray');
            var cyl = Parts.Cylinder(6, 2)
                .rotateX(90)
                .align(block, 'xz')
                .snap(block, 'y', 'outside+')
                .color('black');
            return util.group('block,cylinder', [block, cyl]);
        },

        Ribbon: function () {
            return Parts.Cube([3, 22.4, 5.7]).color('gray');
        },

        Gpio: function (mb) {
            var gpio = Parts.Cube([50.64, 5, 8.72]).color('gray');
            return mb ? gpio
                .snap(mb, 'xy', 'inside-')
                .snap(mb, 'z', 'outside-')
                .midlineTo('x', 32.5)
                .midlineTo('y', 52.5) :
                gpio;
        },

        BoardLed: function () {
            return Parts.Cube([1, 2, 0.7]);
        },

        MicroUsbPlug: function (port) {
            var plug = Parts.Cube([10.28, 13, 6.24]).snap(port, 'y', 'outside+').translate([0, -2.2, 0]);
            var connector = Parts.Cube([7, 5.5, 2.28]).snap(plug, 'y', 'outside-').align(plug, 'x').align(plug, 'z');
            var strainrelief = Parts.Cylinder(4.28, 8).rotateX(90).snap(plug, 'y', 'outside+').align(plug, 'x').align(plug, 'z');
            var cord = Parts.Cylinder(2.82, 10).rotateX(90).snap(strainrelief, 'y', 'outside+').align(strainrelief, 'x').align(strainrelief, 'z');

            var srsz = strainrelief.size();

            var srcutoutup = Parts.Cube([srsz.x, srsz.y, 20]).snap(strainrelief, 'z', 'inside-').align(strainrelief, 'xy').translate([0, 0, 4.28 / 2]).union(strainrelief);

            var srcutoutdown = Parts.Cube([srsz.x, srsz.y, 20]).snap(strainrelief, 'z', 'outside-').align(strainrelief, 'xy').translate([0, 0, 4.28 / 2]).union(strainrelief);

            var dt = util.calcCenterWith(plug, 'xz', port);

            return util.group('plug,connector,strainrelief,cord,srcutoutup,srcutoutdown', [plug, connector, strainrelief, cord, srcutoutup, srcutoutdown]).map(function (part) {
                return part.translate(dt);
            });
        },

        UsbWifiAdapter: function (usbport, up) {
            // 4.63 - 2.22
            var connector = Parts.Cube([12, 12, 4.63])
                .snap(usbport, 'x', 'outside-')
                .snap(usbport, 'z', 'inside-')
                .align(usbport, 'y')
                .midlineTo('z', up ? 13.1 : 4.5)
                .translate([-8.5, 0, 0])
                .translate([0, 0, -1]);
            // var head = Parts.Cube([5.6, 15, 7.23])
            //     .snap(connector, 'x', 'outside-')
            //     .align(connector, 'y')
            //     .align(connector, 'z');
            return connector.color('blue');
        }
    },

    BPlusMounting: {
        holes: function (mb, options) {
            options = util.defaults(options, {
                height: 8
            });
            // var hole = LeftSide(RaspberryPi.Parts.MountingHole(options && options.diameter || undefined, options && options.height || 8), mb);
            var hole = RaspberryPi.Parts.MountingHole(options.diameter, options.height)
                .snap(mb, 'xy', 'inside-')
                .align(mb, 'z');

            var holes = [
                hole.midlineTo('x', 3.5).midlineTo('y', 3.5),
                hole.midlineTo('x', 61.5).midlineTo('y', 3.5),
                hole.midlineTo('x', 3.5).midlineTo('y', 52.5),
                hole.midlineTo('x', 61.5).midlineTo('y', 52.5)
            ];

            return util.group('hole1,hole2,hole3,hole4', holes);
        },
        pads: function (mb, options) {
            options = util.defaults(options, {
                snap: 'outside-',
                height: 4
            });
            var pad = RaspberryPi.Parts.Mountingpad(undefined, options.height)
                .snap(mb, 'z', options.snap)
                .snap(mb, 'xy', 'inside-');

            var pads = [
                pad.midlineTo('x', 3.5).midlineTo('y', 3.5),
                pad.midlineTo('x', 61.5).midlineTo('y', 3.5),
                pad.midlineTo('x', 3.5).midlineTo('y', 52.5),
                pad.midlineTo('x', 61.5).midlineTo('y', 52.5)
            ];

            // var b = mb.getBounds();
            return util.group('pad1,pad2,pad3,pad4', pads);
            // });

        }
    },

    /**
     * Returns a complete RaspberryPi B Plus model.
     * ![bplus example](jsdoc2md/bplus.png)
     */
    BPlus: function (three) {

        var mb = this.Parts.BPlusMotherboard();

        var group = util.group('mb', mb);
        // Right side parts
        group.add(RightSide(this.Parts.EthernetJack(), mb)
            .midlineTo('y', 10.25), 'ethernet');

        var usb = this.Parts.UsbJack();
        var usbt = util.array.add(usb.parts.flange.calcSnap(mb, 'x', 'inside+'), [2, 0, 0],
            usb.parts.body.calcSnap(mb, 'y', 'inside-'),
            usb.parts.body.calcSnap(mb, 'z', 'outside-'));

        group.add(usb.clone().translate(
            usbt,
            util.calcmidlineTo(usb.parts.body, 'y', 29)
        ), 'usb1', false, 'usb1');

        group.add(usb.clone().translate(
            usbt,
            util.calcmidlineTo(usb.parts.body, 'y', 47)
        ), 'usb2', false, 'usb2');

        group.add(this.Parts.MicroUsb().snap(mb, 'z', 'outside-').midlineTo('x', 10.6).translate([0, -1, 0]), 'microusb');

        group.add(this.Parts.Hdmi().snap(mb, 'z', 'outside-').midlineTo('x', 32).translate([0, -2, 0]), 'hdmi');

        group.add(this.Parts.AvJack()
            .snap('block', mb, 'z', 'outside-')
            .midlineTo('block', 'x', 53.5), 'avjack', false, 'avjack');

        group.add(this.Parts.Ribbon().snap(mb, 'z', 'outside-').midlineTo('x', 45), 'camera');

        group.add(this.Parts.Ribbon().snap(mb, 'z', 'outside-').midlineTo('x', 3.5).midlineTo('y', 28), 'display');

        group.add(this.Parts.Gpio().snap(mb, 'z', 'outside-').midlineTo('x', 32.5).midlineTo('y', 52.5), 'gpio');

        if (three) {
            group.add(this.Parts.BoardLed().snap(mb, 'z', 'outside-').midlineTo('x', 1.1).midlineTo('y', 7.9).color('lightgreen'), 'activityled');
            group.add(this.Parts.BoardLed().snap(mb, 'z', 'outside-').midlineTo('x', 1.1).midlineTo('y', 11.5).color('red'), 'powerled');
        } else {
            group.add(this.Parts.BoardLed().snap(mb, 'z', 'outside-').translate([1, 43.5, 0]).color('lightgreen'), 'activityled');
            group.add(this.Parts.BoardLed().snap(mb, 'z', 'outside-').translate([1, 46, 0]).color('red'), 'powerled');
        }

        group.add(Parts.Cube([15.2, 12, 1.5])
            .snap(mb, 'z', 'outside+')
            .midlineTo('y', 28)
            .translate([-2.5, 0, 0])
            .color('silver'), 'microsd');


        group.add(this.BPlusMounting.holes(mb), 'holes', true, '')

        // group.holes = this.BPlusMounting.pads(mb).combine();

        return group;
    },

    /**
     * Returns an empty Pi Hat.
     * ![hat example](jsdoc2md/hat.gif)
     */
    Hat: function (pi) {
        var mb = Parts.Board(65.02, 56.39, 3.56, 1.62).color('darkgreen', 0.75);

        if (pi) {
            mb = mb.translate(
                mb.calcSnap(pi, 'xy', 'inside-')
            );
        }

        var hole = this.Parts.MountingHole()
            .snap(mb, 'xy', 'inside-');
        var holes = union(
            hole.midlineTo('x', 3.56).midlineTo('y', 3.56),
            hole.midlineTo('x', 61.47).midlineTo('y', 3.56),
            hole.midlineTo('x', 3.56).midlineTo('y', 52.46),
            hole.midlineTo('x', 61.47).midlineTo('y', 52.46)
        );

        var gpio = this.Parts.Gpio(mb).snap(mb, 'z', 'outside+');

        var hat = util.group('mb,gpio', [mb, gpio]);
        hat.holes = holes;
        return hat;
    },

    PiTFT22: function () {
        var hat = RaspberryPi.Hat();
        var mb = hat.parts.mb;
        var gpio = hat.parts.gpio;

        var lcd = LeftSide(Parts.Cube([45.97, 34.8, 4]), mb).snap(mb, 'z', 'outside-').midlineTo('x', 33.4).midlineTo('y', 27.18).color('black');
        var lcdbevel = LeftSide(Parts.Cube([55, 40, 3.5]), mb).snap(mb, 'z', 'outside-').translate([8, 6, 0]);

        var buttonBase = Parts.Cube([7, 6, 2.5]);
        var button = LeftSide(buttonBase.union(this.Parts.Cylinder(3.1, 1.2).color('black').snap(buttonBase, 'z', 'outside-').align(buttonBase, 'xy')), mb).snap(mb, 'z', 'outside-');

        var buttons = [
            button.midlineTo('x', 13.97),
            button.midlineTo('x', 13.97 + 12.7),
            button.midlineTo('x', 13.97 + 12.7 + 12.7),
            button.midlineTo('x', 13.97 + 12.7 + 12.7 + 12.7)
        ];

        var group = util.group('mb,gpio,lcd,lcdbevel,button1,button2,button3,button4', [mb, gpio, lcd, lcdbevel, buttons[0], buttons[1], buttons[2], buttons[3]]);
        group.holes = hat.holes;

        return group;
    },

    /**
     * Returns an Adafruit PiTFT 2.4 Hat with buttons.
     * ![PiTFT 2.4 example](jsdoc2md/pitft24.png)
     */
    PiTFT24: function (options, pi) {
        var hiddenPart = true;
        options = util.defaults(options, {
            buttonCapHeight: 4,
            clearance: 0.9
        });
        var hat = RaspberryPi.Hat(pi);
        var mb = hat.parts.mb;
        var gpio = hat.parts.gpio;
        var sink = 0; // lower the lcd bevel above actual position, and raise LCD up so cases will mould around the lcd better

        var lcd = Parts.Cube([50, 40, 3.72]).color('black');

        hat.add(lcd.translate(
            lcd.calcSnap(mb, 'xy', 'inside-'),
            lcd.calcSnap(mb, 'z', 'outside-'), [7, 0, 0],
            lcd.calcmidlineTo('y', 28.32)
        ), 'lcd');

        // var lcdbevel = LeftSide(Parts.Cube([60, 42, (5.3 - 1.62) - sink]), mb)
        //     .snap(mb, 'z', 'outside-')
        //     .translate([4.5, 7, 0])
        //     .color('white');
        //
        var lcdbevel = Parts.Cube([60, 42, (5.3 - 1.62) - sink]).color('white');

        hat.add(lcdbevel.translate(
            lcdbevel.calcSnap(mb, 'xy', 'inside-'),
            lcdbevel.calcSnap(mb, 'z', 'outside-'), [4.5, 7, 0]
        ), 'lcdbevel');


        var buttonBase = Parts.Cube([6.1, 3.5, 3.55]).color('beige')
            .snap(mb, 'z', 'outside-')
            .snap(mb, 'xy', 'inside-')
            .midlineTo('y', 2.5);

        var button = buttonBase.union(
            Parts.Cube([3, 1.5, 0.5])
            .color('white')
            .snap(buttonBase, 'z', 'outside-')
            .align(buttonBase, 'xy'));

        var buttons = [12.39, 12.39 + 10, 12.39 + 20, 12.39 + 30, 12.39 + 40].map(function (midpoint) {
            return button.midlineTo('x', midpoint);
        });

        hat.add(util.group('1,2,3,4,5', buttons), 'buttons', hiddenPart, 'button');

        var capBaseHeight = 1;
        var buttonCapBase = Parts.Cube([6.6, 4, capBaseHeight]).color('blue');
        var buttonCapTop = Parts.Cube([6.1, 3.5, options.buttonCapHeight - capBaseHeight])
            .snap(buttonCapBase, 'z', 'outside-')
            .align(buttonCapBase, 'xy')
            .fillet(1, 'z+')
            .color('deepskyblue');

        var buttonCaps = buttons.map(function (button) {
            return union([buttonCapBase, buttonCapTop]).snap(button, 'z', 'outside-').align(button, 'xy');
        });

        hat.add(union(buttonCaps), 'buttonCaps', hiddenPart)

        hat.add(union(buttonCaps.map(function (button) {
            return union([
                buttonCapBase
                .align(button, 'xy')
                .snap(button, 'z', 'inside-')
                .enlarge([options.clearance, options.clearance, 1]),
                Parts.Cube([6.1, 3.5, options.buttonCapHeight - capBaseHeight])
                .align(button, 'xy')
                .snap(button, 'z', 'inside-')
                .enlarge([options.clearance, options.clearance, 1])
            ]);
        })), 'buttonCapClearance', hiddenPart);

        var connector = LeftSide(Parts.Cube([1, 5, 1]), mb)
            .snap(buttonCaps[0], 'z', 'inside-')
            .snap(buttonCaps[0], 'y', 'outside+')
            .color('blue');

        var buttonWire = Parts.Cube([40, 1, 1])
            .snap(buttonCaps[0], 'x', 'center-')
            .snap(buttonCaps[0], 'z', 'inside-')
            .snap(connector, 'y', 'inside-')
            .color('blue');
        hat.add(union(buttonWire), 'buttonWire', hiddenPart);

        var buttonWireConnector = buttonCaps.map(function (buttonCap) {
            return connector.align(buttonCap, 'x');
        });
        hat.add(union(buttonWireConnector), 'buttonWireConnector', hiddenPart)

        var buttonWireClearance = union(buttonWireConnector.map(function (connector) {
                return connector.enlarge([options.clearance, options.clearance, options.buttonCapHeight]);
            }))
            .union(buttonWire.enlarge([options.clearance, options.clearance, options.buttonCapHeight]))
            .snap(buttonWire, 'z', 'inside+')
            .color('red');
        hat.add(buttonWireClearance, 'buttonWireClearance', hiddenPart);

        hat.add(Parts.Cube([15, 33, 7])
            .snap(mb, 'x', 'inside-')
            .snap(mb, 'z', 'outside+')
            .align(mb, 'y')
            .color('red'), 'gpio2', hiddenPart);

        return hat;
    },

    Spacer: function (mb, options) {
        mb = mb || RaspberryPi.BPlus().parts.mb;
        options = util.defaults(options || {}, {
            height: 11,
            thickness: 1,
            snap: 'outside-',
            gpio: true,
            offset: 2,
            gussetOutside: [45, 45],
            gussetInside: [40, 40],
            postOnly: false
        });

        var spacer = RaspberryPi.BPlusMounting.pads(mb, {
            height: options.height,
            snap: options.snap
        });

        var spacers = spacer.combine();

        if (options.postOnly) return spacers.color('yellow');

        if (!options.hollow) {
            var p1 = spacer.parts.pad1.centroid();
            var p2 = spacer.parts.pad4.centroid();

            var tri = util.triangle.solve(p1, p2);
            var dy = (Math.sin(util.triangle.toRadians(tri.a)) * 3.5) - 3.5;
            var dx = 3.5 - (Math.cos(util.triangle.toRadians(tri.b + 45)) * 3.5);
            // console.log('tri', tri, p1, p2);
            // console.log('Spacer', options, tri, dx, dy);
            var x = Parts.Board(tri.C + 5.5, 6.2, 3.1, options.thickness)
                .rotateZ(tri.b)
                .translate([dx, dy, 0])
                .snap(spacer.parts.pad1, 'z', 'inside+')
            var cross = x.union(x.mirroredY().translate([0, 56, 0]))
                .snap(spacer.parts.pad1, 'xy', 'inside-')
                .color('red');
        }

        var gussetInterior = Parts.Board(options.gussetInside[0], options.gussetInside[1], 3, options.thickness)
            .align(spacers, 'xy');

        var gusset = Parts.Board(options.gussetOutside[0], options.gussetOutside[1], 3, options.thickness)
            .align(spacers, 'xy')
            .subtract(gussetInterior)
            .snap(spacer.parts.pad1, 'z', 'inside+');

        // var gpio = LeftSide(this.Parts.Gpio(), mb).snap(spacer.parts.pad1, 'z', 'inside+').midlineTo('x', 32.5).midlineTo('y', 52.5);

        var gpio = this.Parts.Gpio(mb);

        var assembly = spacers
            .union(gusset.unionIf(cross, !options.hollow).translate([0, 0, -options.offset]))

        .subtractIf(gpio.enlarge([1, 1, 0]), options.gpio);

        return assembly.color('yellow');
    },

    /**
     * Returns an Pi camera module.
     * ![camera example](jsdoc2md/camera.png)
     */
    CameraModule: function () {
        var board = Parts.Cube([25, 24, 1]).color('green');
        var hole = this.Parts.MountingHole(2).snap(board, 'x', 'inside-').snap(board, 'y', 'inside-');
        var holes = [
            hole.translate([1, 21, 0]),
            hole.translate([1, 21 - 12.5, 0]),
            hole.translate([22, 21, 0]),
            hole.translate([22, 21 - 12.5, 0])
        ];

        var lense = Parts.Cube([8, 8, 5.5]).snap(board, 'z', 'outside-').midlineTo('y', 9.5).midlineTo('x', 12.5);
        var lenseribbon = Parts.Cube([7.56, 10, 2]).snap(board, 'z', 'outside-').midlineTo('x', 12.5).snap(lense, 'y', 'outside-').setColor(0.25, 0.25, 0, 0.5);
        var led = Parts.Cube([4, 3, 1]).snap(board, 'z', 'outside-').translate([17, 18, 0]).setColor(1, 0, 0, 0.5);
        var ribbon = Parts.Cube([20.78, 6, 2.64]).snap(board, 'z', 'outside+').midlineTo('x', 12.5);
        var stuff = Parts.Cube([18, 12.5, 1]).snap(board, 'z', 'outside+').midlineTo('x', 12.5).midlineTo('y', 9.5 + (12.5 / 2));


        var group = util.group('board,lenseribbon,lense,ribbon,led,stuff,hole1,hole2,hole3,hole4', [board, lenseribbon, lense, ribbon, led, stuff, holes[0], holes[1], holes[2], holes[3]]);

        group.holes = holes;
        return group;

    },

    HatStandOff: function (options) {
        var standoff = this.Parts.Mountingpad(null, options.height);
        var peg = this.Parts.MountingHole(null, options.height + 3);
        return standoff.union(peg);
    }
};

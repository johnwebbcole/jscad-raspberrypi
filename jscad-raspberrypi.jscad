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
        hole = _boardutils.Hole(hole_r, boardinfo.size.z, boardinfo.size.x);
        return union([hole, hole.mirroredX(90)]);
    },

    CornerHoles: function (hole_r, boardinfo) {
        return util.mirrored4(_boardutils.CornerHole(hole_r, boardinfo.size, 3.5));
    }
}

function RightSide(o, mb) {
    return o.snap(mb, 'x', 'inside+')
        .snap(mb, 'y', 'inside-')
        .snap(mb, 'z', 'inside-')
        .translate([2, 0, 1.44])
}

function LeftSide(o, mb, mid) {
    return o.snap(mb, 'x', 'inside-')
        .snap(mb, 'y', 'inside-');
}

RaspberryPi = {
    UnitCube: function () {
        return CSG.cube({
            center: [0, 0, 0],
            radius: [1, 1, 1]
        });
    },

    Parts: {
        BPlusMotherboard: function () {
            var r = util.divA([85, 56], 2);
            var motherboard = CAG.roundedRectangle({
                center: [r[0], r[1], 0],
                radius: r,
                roundradius: 3.0
            }).extrude({
                offset: [0, 0, 1.32]
            }).setColor(0.5, 0.5, 0.5, 0.25);

            return motherboard;
        },

        Board: function (width, height, corner_radius, thickness) {
            var r = util.divA([width, height], 2);
            var board = CAG.roundedRectangle({
                center: [r[0], r[1], 0],
                radius: r,
                roundradius: corner_radius
            }).extrude({
                offset: [0, 0, thickness || 1.62]
            }).setColor(0.5, 0.5, 0.5, 0.25);

            return board;
        },

        MountingHole: function (diameter, height) {
            var r = (diameter || 2.8) / 2;
            var h = (height || 4) / 2;
            return CSG.cylinder({
                start: [0, 0, -h],
                end: [0, 0, h],
                radius: r
            }).setColor(0.90, 0.0, 0.0, 0.5);
        },

        Mountingpad: function (radius, height) {
            var r = (radius || 6.2) / 2;
            var h = (height || 1.5) / 2;
            return CSG.cylinder({
                start: [0, 0, -h],
                end: [0, 0, h],
                radius: r
            }).setColor(0.90, 0.9, 0.0, 1);
        },

        EthernetJack: function () {
            var r = util.divA([21.24, 15.88, 13.475], 2);
            return CSG.cube({
                    center: [0, 0, 0],
                    radius: r,
                })
                .setColor(0.25, 0.25, 0.25, 0.5);
        },

        UsbJack: function () {
            var r = util.divA([17.0, 13.36, 14.42], 2);
            return CSG.cube({
                    center: [0, 0, 0],
                    radius: r,
                })
                .setColor(0.25, 0.25, 0.25, 0.5);
        },

        MicroUsb: function () {
            var r = util.divA([7.59, 5.7, 2.64], 2);
            return CSG.cube({
                    center: [0, 0, 0],
                    radius: r,
                })
                .setColor(0.25, 0.25, 0.25, 0.5);
        },

        Hdmi: function () {
            var r = util.divA([15, 11.57, 7.4], 2);
            return CSG.cube({
                    center: [0, 0, 0],
                    radius: r,
                })
                .setColor(0.25, 0.25, 0.25, 0.5);
        },

        AvJack: function () {
            var r = util.divA([6.9, 12.47, 5.6], 2);
            var block = CSG.cube({
                center: [0, 0, 0],
                radius: r,
            });

            var cyl = CSG.cylinder({
                start: [0, 0, 1],
                end: [0, 0, -1],
                radius: 3
            }).rotateX(90);
            return union(
                    block,
                    cyl.snap(block, 'y', 'outside-')
                )
                .setColor(0.25, 0.25, 0.25, 0.5);
        },

        Ribbon: function () {
            var r = util.divA([3, 22.4, 5.7], 2);
            return CSG.cube({
                    center: [0, 0, 0],
                    radius: r,
                })
                .setColor(0.25, 0.25, 0.25, 0.5);
        },

        Gpio: function () {
            var r = util.divA([50.64, 5, 8.72], 2);
            return CSG.cube({
                    center: [0, 0, 0],
                    radius: r,
                })
                .setColor(0.25, 0.25, 0.25, 0.5);
        },

        BoardLed: function () {
            var r = util.divA([1, 2, 0.7], 2);
            return CSG.cube({
                    center: [0, 0, 0],
                    radius: r,
                })
                .setColor(0.25, 0.25, 0.25, 0.5);
        },

        MicroUsbPlug: function (port) {
            var plug = RaspberryPi.Parts.Cube([10.28, 13, 6.24]).snap(port, 'y', 'outside+').translate([0, -2.2, 0]);
            var connector = RaspberryPi.Parts.Cube([7, 5.5, 2.28]).snap(plug, 'y', 'outside-').align(plug, 'x').align(plug, 'z');
            var strainrelief = RaspberryPi.Parts.Cylinder(4.28, 8).rotateX(90).snap(plug, 'y', 'outside+').align(plug, 'x').align(plug, 'z');
            var cord = RaspberryPi.Parts.Cylinder(2.82, 10).rotateX(90).snap(strainrelief, 'y', 'outside+').align(strainrelief, 'x').align(strainrelief, 'z');

            var srsz = strainrelief.size();

            var srcutoutup = RaspberryPi.Parts.Cube([srsz.x, srsz.y, 20]).snap(strainrelief, 'z', 'inside-').align(strainrelief, 'xy').translate([0, 0, 4.28 / 2]).union(strainrelief);

            var srcutoutdown = RaspberryPi.Parts.Cube([srsz.x, srsz.y, 20]).snap(strainrelief, 'z', 'outside-').align(strainrelief, 'xy').translate([0, 0, 4.28 / 2]).union(strainrelief);

            var dt = util.calcCenterWith(plug, 'xz', port);

            return _.zipObject('plug,connector,strainrelief,cord,srcutoutup,srcutoutdown'.split(','),
                _.map([plug, connector, strainrelief, cord, srcutoutup, srcutoutdown], function (o) {
                    return o.translate(dt).setColor(1, 0.5, 0);
                }));

            // return plug.union([connector, strainrelief, cord]).align( port,'x').align( port,'z').setColor(1, 0.5, 0);
        },

        UsbWifiAdapter: function (usbport) {
            var connector = RaspberryPi.Parts.Cube([11.6, 12, 4.5]).snap(usbport, 'x', 'outside+').snap(usbport, 'z', 'inside+').align(usbport, 'y').translate([-8.33, 0, -0.5]);
            var head = RaspberryPi.Parts.Cube([5.6, 15, 7.23]).snap(connector, 'x', 'outside+').align(connector, 'y').align(connector, 'z');
            return connector.union(head).setColor(0.1, 0.1, 0.1);
        },

        Cube: function (a) {
            var r = util.divA(a, 2);
            return CSG.cube({
                    center: r,
                    radius: r,
                })
                .setColor(0.25, 0.25, 0.25, 0.5);
        },

        Cylinder: function (diameter, height) {
            var h = height / 2;
            return CSG.cylinder({
                start: [0, 0, -h],
                end: [0, 0, h],
                radius: diameter / 2
            })

        }
    },

    BPlusMounting: {
        holes: function (mb, options) {
            var hole = LeftSide(RaspberryPi.Parts.MountingHole(options && options.diameter || undefined, options && options.height || 8), mb);
            var holes = [
                hole.midlineTo('x', 3.5).midlineTo('y', 3.5),
                hole.midlineTo('x', 61.5).midlineTo('y', 3.5),
                hole.midlineTo('x', 3.5).midlineTo('y', 52.5),
                hole.midlineTo('x', 61.5).midlineTo('y', 52.5)
            ];

            return util.group('hole1,hole2,hole3,hole4', holes);

        },
        pads: function (mb, options) {
            options = _.defaults(options, {
                snap: 'outside-'
            });
            var pad = LeftSide(RaspberryPi.Parts.Mountingpad(undefined, options && options.height || 4), mb).snap(mb, 'z', options.snap);
            var pads = [
                pad.midlineTo('x', 3.5).midlineTo('y', 3.5),
                pad.midlineTo('x', 61.5).midlineTo('y', 3.5),
                pad.midlineTo('x', 3.5).midlineTo('y', 52.5),
                pad.midlineTo('x', 61.5).midlineTo('y', 52.5)
            ];

            return util.group('pad1,pad2,pad3,pad4', pads);

        }
    },

    BPlus: function (options) {
        options = options || {};
        var scale = options.scale || [0, 0, 0];

        var mb = this.Parts.BPlusMotherboard();

        // Right side parts
        var ethernet = RightSide(this.Parts.EthernetJack(), mb).midlineTo('y', 10.25);
        var usb1 = RightSide(this.Parts.UsbJack(), mb).midlineTo('y', 29);
        var usb2 = RightSide(this.Parts.UsbJack(), mb).midlineTo('y', 47);

        var hole = LeftSide(this.Parts.MountingHole(undefined, 8), mb);
        var holes = union(
            hole.midlineTo('x', 3.5).midlineTo('y', 3.5),
            hole.midlineTo('x', 61.5).midlineTo('y', 3.5),
            hole.midlineTo('x', 3.5).midlineTo('y', 52.5),
            hole.midlineTo('x', 61.5).midlineTo('y', 52.5)
        );

        var pad = LeftSide(this.Parts.Mountingpad(undefined, 4), mb).snap(mb, 'z', 'outside-');
        var pads = union(
            pad.midlineTo('x', 3.5).midlineTo('y', 3.5),
            pad.midlineTo('x', 61.5).midlineTo('y', 3.5),
            pad.midlineTo('x', 3.5).midlineTo('y', 52.5),
            pad.midlineTo('x', 61.5).midlineTo('y', 52.5)
        ).color('yellow');

        var microusb = LeftSide(this.Parts.MicroUsb(), mb).snap(mb, 'z', 'outside-').midlineTo('x', 10.6).translate([0, -1, 0]);
        var hdmi = LeftSide(this.Parts.Hdmi(), mb).snap(mb, 'z', 'outside-').midlineTo('x', 32).translate([0, -2, 0]);
        var avjack = LeftSide(this.Parts.AvJack(), mb).snap(mb, 'z', 'outside-').midlineTo('x', 53.5).translate([0, -2, 0]);
        var camera = LeftSide(this.Parts.Ribbon(), mb).snap(mb, 'z', 'outside-').midlineTo('x', 45);
        var display = LeftSide(this.Parts.Ribbon(), mb).snap(mb, 'z', 'outside-').midlineTo('x', 3.5).midlineTo('y', 28);
        var gpio = LeftSide(this.Parts.Gpio(), mb).snap(mb, 'z', 'outside-').midlineTo('x', 32.5).midlineTo('y', 52.5);
        var activityled = LeftSide(this.Parts.BoardLed(), mb).snap(mb, 'z', 'outside-').translate([1, 43.5, 0]).setColor(0, 1, 0);
        var powerled = LeftSide(this.Parts.BoardLed(), mb).snap(mb, 'z', 'outside-').translate([1, 46, 0]).setColor(1, 0, 0);

        // var musbplug = this.Parts.MicroUsbPlug(microusb);
        // var wifi = this.Parts.UsbWifiAdapter(usb2);

        var microsd = LeftSide(this.Parts.Cube([15.2, 12, 1.5]), mb).snap(mb, 'z', 'outside+').midlineTo('y', 28).translate([-2.5, 0, 0]);

        return {
            parts: _.zipObject('mb,ethernet,usb1,usb2,microusb,hdmi,avjack,camera,display,gpio,activityled,powerled,pads,microsd'.split(','), [mb,
                ethernet,
                usb1,
                usb2,
                microusb,
                hdmi,
                avjack,
                camera,
                display,
                gpio,
                activityled,
                powerled,
                pads,
                microsd
            ]),
            holes: holes,
            combine: function (pieces, options) {
                var scale = options && options.scale || [0, 0, 0];
                pieces = (pieces || 'mb,ethernet,usb1,usb2,microusb,hdmi,avjack,camera,display,gpio,activityled,powerled,microsd').split(',');

                return union(
                        _.chain(this.parts)
                        .pick(pieces)
                        .values()
                        .map(function (o) {
                            return o.enlarge(scale);
                        })
                        .value()
                    )
                    .subtract(this.holes);
            }
        };

    },

    Hat: function (options) {
        var mb = this.Parts.Board(65.02, 56.39, 3.56, 1.62);

        var hole = LeftSide(this.Parts.MountingHole(), mb);
        var holes = union(
            hole.midlineTo('x', 3.56).midlineTo('y', 3.56),
            hole.midlineTo('x', 61.47).midlineTo('y', 3.56),
            hole.midlineTo('x', 3.56).midlineTo('y', 52.46),
            hole.midlineTo('x', 61.47).midlineTo('y', 52.46)
        );

        var gpio = LeftSide(this.Parts.Gpio(), mb).snap(mb, 'z', 'outside+').midlineTo('x', 32.5).midlineTo('y', 52.5);

        var hat = util.group('mb,gpio', [mb.subtract(holes), gpio])
        hat.holes = holes;
        return hat;
    },

    PiTFT22: function (options) {
        var hat = RaspberryPi.Hat();
        var mb = hat.parts.mb;
        var holes = hat.holes;
        var gpio = hat.parts.gpio;

        var lcd = LeftSide(this.Parts.Cube([45.97, 34.8, 4]), mb).snap(mb, 'z', 'outside-').midlineTo('x', 33.4).midlineTo('y', 27.18).color('black');
        var lcdbevel = LeftSide(this.Parts.Cube([55, 40, 3.5]), mb).snap(mb, 'z', 'outside-').translate([8, 6, 0]);

        var buttonBase = this.Parts.Cube([7, 6, 2.5]);
        var button = LeftSide(buttonBase.union(this.Parts.Cylinder(3.1, 1.2).color('black').snap(buttonBase, 'z', 'outside-').align(buttonBase, 'xy')), mb).snap(mb, 'z', 'outside-');

        var buttons = [
            button.midlineTo('x', 13.97),
            button.midlineTo('x', 13.97 + 12.7),
            button.midlineTo('x', 13.97 + 12.7 + 12.7),
            button.midlineTo('x', 13.97 + 12.7 + 12.7 + 12.7),
        ];

        return util.group('mb,gpio,lcd,lcdbevel,button1,button2,button3,button4', [mb, gpio, lcd, lcdbevel, buttons[0], buttons[1], buttons[2], buttons[3]]);
    },

    PiTFT24: function (options) {
        var hat = RaspberryPi.Hat();
        var mb = hat.parts.mb;
        var holes = hat.holes;
        var gpio = hat.parts.gpio;

        var lcd = LeftSide(this.Parts.Cube([55, 40, 3.1]), mb).snap(mb, 'z', 'outside-').midlineTo('x', 33.4).midlineTo('y', 28.32).color('black');
        var lcdbevel = LeftSide(this.Parts.Cube([60, 42, 2]), mb).snap(mb, 'z', 'outside-').translate([4.5, 7, 0]);

        var buttonBase = this.Parts.Cube([7, 6, 2.5]);
        var button = LeftSide(buttonBase.union(this.Parts.Cylinder(3.1, 1.2).color('black').snap(buttonBase, 'z', 'outside-').align(buttonBase, 'xy')), mb).snap(mb, 'z', 'outside-');

        var buttons = [
            button.midlineTo('x', 13.97),
            button.midlineTo('x', 13.97 + 12.7),
            button.midlineTo('x', 13.97 + 12.7 + 12.7),
            button.midlineTo('x', 13.97 + 12.7 + 12.7 + 12.7),
        ];

        var gpio2 = this.Parts.Cube([15, 33, 7])
            .snap(mb, 'x', 'inside-')
            .snap(mb, 'z', 'outside+')
            .align(mb, 'y').color('red');
        return util.group('mb,gpio,lcd,lcdbevel,button1,button2,button3,button4,gpio2', [mb, gpio, lcd, lcdbevel, buttons[0], buttons[1], buttons[2], buttons[3], gpio2]);
    },

    Spacer: function (mb, options) {
        mb = mb || RaspberryPi.BPlus().parts.mb;
        options = _.defaults(options || {}, {
            height: 11,
            thickness: 1,
            snap: 'outside-',
            gpio: true,
            offset: 2
        });

        // console.log('spacer', options);
        var spacer = RaspberryPi.BPlusMounting.pads(mb, {
            height: options.height,
            snap: options.snap
        });

        var holes = RaspberryPi.BPlusMounting.holes(mb, {
            height: 13,
            scale: [0.75, 0.75, 0]
        }).combine().snap(spacer.parts.pad1, 'z', 'inside+');

        var connector = this.Parts.Board(65, 56, 3, options.thickness); //.snap(spacer.parts.pad1, 'z', 'inside+');

        var p1 = spacer.parts.pad1.centroid();
        var p2 = spacer.parts.pad4.centroid();
        // console.log('Spacer.util.triangle.solve', p1, p2, util.array.toxyz(p1), util.array.toxyz(p2));
        var tri = util.triangle.solve(p1, p2);
        var dy = (Math.sin(util.triangle.toRadians(tri.a)) * 3.5) - 3.5
        var dx = 3.5 - (Math.cos(util.triangle.toRadians(tri.b + 45)) * 3.5)
            // console.log('Spacer', options, tri, dx, dy);
        var x = this.Parts.Board(tri.C + 5.5, 6.2, 3.1, options.thickness).rotateZ(tri.b).translate([dx, dy, 0]).snap(spacer.parts.pad1, 'z', 'inside+')

        var gussetInterior = this.Parts.Board(40, 40, 3, options.thickness)
            .align(holes, 'xy')
            .translate([0, 0, -options.offset])
            // .translate([2.5, 2.5, 0])
        var gusset = this.Parts.Board(45, 45, 3, options.thickness)
            .align(holes, 'xy')
            .translate([0, 0, -options.offset])
            .subtract(gussetInterior)
            .snap(spacer.parts.pad1, 'z', 'inside+');

        // var gpio = LeftSide(this.Parts.Board(50.64, 55, 3, 3), connector).midlineTo('x', 32.5).translate([0, 0, -2]).translate([0, 5, 0]);
        var gpio = LeftSide(this.Parts.Gpio(), mb).snap(spacer.parts.pad1, 'z', 'inside+').midlineTo('x', 32.5).midlineTo('y', 52.5);

        var assembly = union([spacer.combine(),
            union([gusset, x, x.mirroredY().translate([0, 56, 0])]).translate([0, 0, -options.offset])
        ]).subtract(holes);

        if (options.hollow) assembly = assembly.subtract(gussetInterior.snap(spacer.parts.pad1, 'z', 'inside+').translate([0, 0, -options.offset]));

        return (options.gpio ? assembly.subtract(gpio.enlarge([1, 1, 0])) : assembly).color('yellow');
    },


    CameraModule: function () {
        var board = this.Parts.Cube([25, 24, 1]).setColor(0, 0.25, 0, 0.5);
        var hole = this.Parts.MountingHole(2).snap(board, 'x', 'inside-').snap(board, 'y', 'inside-');
        var holes = [
            hole.translate([1, 21, 0]),
            hole.translate([1, 21 - 12.5, 0]),
            hole.translate([22, 21, 0]),
            hole.translate([22, 21 - 12.5, 0])
        ];

        var lense = this.Parts.Cube([8, 8, 5.5]).snap(board, 'z', 'outside-').midlineTo('y', 9.5).midlineTo('x', 12.5);
        var lenseribbon = this.Parts.Cube([7.56, 10, 2]).snap(board, 'z', 'outside-').midlineTo('x', 12.5).snap(lense, 'y', 'outside-').setColor(0.25, 0.25, 0, 0.5);
        var led = this.Parts.Cube([4, 3, 1]).snap(board, 'z', 'outside-').translate([17, 18, 0]).setColor(1, 0, 0, 0.5);
        var ribbon = this.Parts.Cube([20.78, 6, 2.64]).snap(board, 'z', 'outside+').midlineTo('x', 12.5);
        var stuff = this.Parts.Cube([18, 12.5, 1]).snap(board, 'z', 'outside+').midlineTo('x', 12.5).midlineTo('y', 9.5 + (12.5 / 2));

        // var camera = union(_.map([board, lenseribbon, lense, ribbon, led, stuff], function (o) {
        //     return o.enlarge(scale)
        // })).subtract(holes).translate([-12.5, -9.5, 0]);

        // return camera;

        var part = util.group('board,lenseribbon,lense,ribbon,led,stuff,hole1,hole2,hole3,hole4', [board, lenseribbon, lense, ribbon, led, stuff, holes[0], holes[1], holes[2], holes[3]]);
        part.holes = holes;
        return part;
        // return {
        //     parts: _.zipObject('board,lenseribbon,lense,ribbon,led,stuff,hole1,hole2,hole3,hole4'.split(','), [board, lenseribbon, lense, ribbon, led, stuff, holes[0], holes[1], holes[2], holes[3]]),
        //     holes: holes,
        //     combine: function (pieces, options) {
        //         options = _.defaults(options || {}, {
        //             scale: [0, 0, 0],
        //             pieces: (pieces || 'board,lenseribbon,lense,ribbon,led,stuff').split(','),
        //             holes: true
        //         });
        //
        //         // return union(_.values(_.pick(this.parts, pieces))).subtract(this.holes);
        //         var piece = union(
        //             _.chain(this.parts)
        //             .pick(options.pieces)
        //             .values()
        //             .map(function (o) {
        //                 return o.enlarge(options.scale);
        //             })
        //             .value()
        //         );
        //
        //         return options.holes ? piece.subtract(union(this.holes)) : piece;
        //
        //     }
        // };
    },

    HatStandOff: function (options) {
        var standoff = this.Parts.Mountingpad(null, options.height);
        var peg = this.Parts.MountingHole(null, options.height + 3);
        return standoff.union(peg);
    },

    Create: function (part, options) {
        // return this.UnitCube();
        return this[part](options);
    },



    init: function (parts) {
        // echo(_.functions(this))
    }
};

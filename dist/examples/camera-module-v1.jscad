function main() {
  util.init(CSG);

  var camera = RaspberryPi.CameraModuleV1();

  return camera.combine();
}

// include:js
// /node_modules/@jwc/jscad-utils/dist/compat.js
var Parts, Boxes, Group, Debug, array, triUtils;

function initJscadutils(_CSG, options = {}) {
    options = Object.assign({
        debug: ""
    }, options);
    var jsCadCSG = {
        CSG,
        CAG
    };
    var scadApi = {
        vector_text,
        rectangular_extrude,
        vector_char,
        primitives3d: {
            cube,
            sphere,
            cylinder
        },
        extrusions: {
            rectangular_extrude
        },
        text: {
            vector_text,
            vector_char
        },
        booleanOps: {
            union
        }
    };
    var jscadUtilsDebug = (options.debug.split(",") || []).reduce((checks, check) => {
        if (check.startsWith("-")) {
            checks.disabled.push(new RegExp(`^${check.slice(1).replace(/\*/g, ".*?")}$`));
        } else {
            checks.enabled.push(new RegExp(`^${check.replace(/\*/g, ".*?")}$`));
        }
        return checks;
    }, {
        enabled: [],
        disabled: []
    });
    var jscadUtils = function(exports, jsCadCSG, scadApi) {
        "use strict";
        jsCadCSG = jsCadCSG && Object.prototype.hasOwnProperty.call(jsCadCSG, "default") ? jsCadCSG["default"] : jsCadCSG;
        scadApi = scadApi && Object.prototype.hasOwnProperty.call(scadApi, "default") ? scadApi["default"] : scadApi;
        var util = Object.freeze({
            __proto__: null,
            get NOZZEL_SIZE() {
                return NOZZEL_SIZE;
            },
            get nearest() {
                return nearest;
            },
            get identity() {
                return identity;
            },
            get result() {
                return result;
            },
            get defaults() {
                return defaults;
            },
            get isEmpty() {
                return isEmpty;
            },
            get isNegative() {
                return isNegative;
            },
            get print() {
                return print;
            },
            get jscadToString() {
                return jscadToString;
            },
            get error() {
                return error;
            },
            get depreciated() {
                return depreciated;
            },
            get inch() {
                return inch;
            },
            get cm() {
                return cm;
            },
            get label() {
                return label;
            },
            get text() {
                return text;
            },
            get unitCube() {
                return unitCube;
            },
            get unitAxis() {
                return unitAxis;
            },
            get toArray() {
                return toArray;
            },
            get ifArray() {
                return ifArray;
            },
            get segment() {
                return segment;
            },
            get zipObject() {
                return zipObject;
            },
            get map() {
                return map;
            },
            get mapValues() {
                return mapValues;
            },
            get pick() {
                return pick;
            },
            get mapPick() {
                return mapPick;
            },
            get divA() {
                return divA;
            },
            get divxyz() {
                return divxyz;
            },
            get div() {
                return div$1;
            },
            get mulxyz() {
                return mulxyz;
            },
            get mul() {
                return mul;
            },
            get xyz2array() {
                return xyz2array;
            },
            get rotationAxes() {
                return rotationAxes;
            },
            get size() {
                return size;
            },
            get scale() {
                return scale;
            },
            get center() {
                return center;
            },
            get centerY() {
                return centerY;
            },
            get centerX() {
                return centerX;
            },
            get enlarge() {
                return enlarge;
            },
            get fit() {
                return fit;
            },
            get shift() {
                return shift;
            },
            get zero() {
                return zero;
            },
            get mirrored4() {
                return mirrored4;
            },
            get flushSide() {
                return flushSide;
            },
            get calcFlush() {
                return calcFlush;
            },
            get calcSnap() {
                return calcSnap;
            },
            get snap() {
                return snap;
            },
            get flush() {
                return flush;
            },
            get axisApply() {
                return axisApply;
            },
            get axis2array() {
                return axis2array;
            },
            get centroid() {
                return centroid;
            },
            get calcmidlineTo() {
                return calcmidlineTo;
            },
            get midlineTo() {
                return midlineTo;
            },
            get translator() {
                return translator;
            },
            get calcCenterWith() {
                return calcCenterWith;
            },
            get centerWith() {
                return centerWith;
            },
            get getDelta() {
                return getDelta;
            },
            get bisect() {
                return bisect;
            },
            get slice() {
                return slice;
            },
            get wedge() {
                return wedge;
            },
            get stretch() {
                return stretch;
            },
            get poly2solid() {
                return poly2solid;
            },
            get slices2poly() {
                return slices2poly;
            },
            get normalVector() {
                return normalVector;
            },
            get sliceParams() {
                return sliceParams;
            },
            get reShape() {
                return reShape;
            },
            get chamfer() {
                return chamfer;
            },
            get fillet() {
                return fillet;
            },
            get calcRotate() {
                return calcRotate;
            },
            get rotateAround() {
                return rotateAround;
            },
            get clone() {
                return clone;
            },
            get addConnector() {
                return addConnector;
            }
        });
        function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        function ownKeys(object, enumerableOnly) {
            var keys = Object.keys(object);
            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(object);
                if (enumerableOnly) symbols = symbols.filter((function(sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                }));
                keys.push.apply(keys, symbols);
            }
            return keys;
        }
        function _objectSpread2(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i] != null ? arguments[i] : {};
                if (i % 2) {
                    ownKeys(Object(source), true).forEach((function(key) {
                        _defineProperty(target, key, source[key]);
                    }));
                } else if (Object.getOwnPropertyDescriptors) {
                    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
                } else {
                    ownKeys(Object(source)).forEach((function(key) {
                        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                    }));
                }
            }
            return target;
        }
        function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }
        function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
        }
        function _iterableToArrayLimit(arr, i) {
            if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;
            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"] != null) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
            return arr2;
        }
        function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var toRadians = function toRadians(deg) {
            return deg / 180 * Math.PI;
        };
        var toDegrees = function toDegrees(rad) {
            return rad * (180 / Math.PI);
        };
        var solve = function solve(p1, p2) {
            var r = {
                c: 90,
                A: Math.abs(p2.x - p1.x),
                B: Math.abs(p2.y - p1.y)
            };
            var brad = Math.atan2(r.B, r.A);
            r.b = this.toDegrees(brad);
            r.C = r.B / Math.sin(brad);
            r.a = 90 - r.b;
            return r;
        };
        var solve90SA = function solve90SA(r) {
            r = Object.assign(r, {
                C: 90
            });
            r.A = r.A || 90 - r.B;
            r.B = r.B || 90 - r.A;
            var arad = toRadians(r.A);
            r.a = r.a || (r.c ? r.c * Math.sin(arad) : r.b * Math.tan(arad));
            r.c = r.c || r.a / Math.sin(arad);
            r.b = r.b || r.a / Math.tan(arad);
            return r;
        };
        var solve90ac = function solve90ac(r) {
            r = Object.assign(r, {
                C: 90
            });
            var arad = Math.asin(r.a / r.c);
            r.A = toDegrees(arad);
            r.B = 90 - r.A;
            r.b = Math.sqrt(Math.pow(r.c, 2) - Math.pow(r.a, 2));
            return r;
        };
        function solveab(r) {
            r = Object.assign(r, {
                C: 90
            });
            r.c = Math.sqrt(Math.pow(r.a, 2) + Math.pow(r.b, 2));
            r.A = toDegrees(Math.asin(r.a / r.c));
            r.B = toDegrees(Math.asin(r.b / r.c));
            return r;
        }
        var triUtils = Object.freeze({
            __proto__: null,
            toRadians,
            toDegrees,
            solve,
            solve90SA,
            solve90ac,
            solveab
        });
        var div = function div(a, f) {
            return a.map((function(e) {
                return e / f;
            }));
        };
        var addValue = function addValue(a, f) {
            return a.map((function(e) {
                return e + f;
            }));
        };
        var addArray = function addArray(a, f) {
            return a.map((function(e, i) {
                return e + f[i];
            }));
        };
        var add = function add(a) {
            return Array.prototype.slice.call(arguments, 1).reduce((function(result, arg) {
                if (Array.isArray(arg)) {
                    result = addArray(result, arg);
                } else {
                    result = addValue(result, arg);
                }
                return result;
            }), a);
        };
        var fromxyz = function fromxyz(object) {
            return Array.isArray(object) ? object : [ object.x, object.y, object.z ];
        };
        var toxyz = function toxyz(a) {
            return {
                x: a[0],
                y: a[1],
                z: a[2]
            };
        };
        var first = function first(a) {
            return a ? a[0] : undefined;
        };
        var last = function last(a) {
            return a && a.length > 0 ? a[a.length - 1] : undefined;
        };
        var min = function min(a) {
            return a.reduce((function(result, value) {
                return value < result ? value : result;
            }), Number.MAX_VALUE);
        };
        var range = function range(a, b) {
            var result = [];
            for (var i = a; i < b; i++) {
                result.push(i);
            }
            return result;
        };
        var array = Object.freeze({
            __proto__: null,
            div,
            addValue,
            addArray,
            add,
            fromxyz,
            toxyz,
            first,
            last,
            min,
            range
        });
        var debugColors = [ "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999" ];
        var termColors = [ "\\033[0;34m", "\\033[0;32m", "\\033[0;36m", "\\033[0;31m", "\\033[0;35m", "\\033[0;33m", "\\033[1;33m", "\\033[0;30m", "\\033[1;34m" ];
        var debugCount = 0;
        var Debug = function Debug(name) {
            var checks = Object.assign({
                enabled: [],
                disabled: [],
                options: {
                    browser: true
                }
            }, jscadUtilsDebug || {});
            var style = checks.options.browser ? "color:".concat(debugColors[debugCount++ % debugColors.length]) : "".concat(termColors[debugCount++ % termColors.length]);
            var enabled = checks.enabled.some((function checkEnabled(check) {
                return check.test(name);
            })) && !checks.disabled.some((function checkEnabled(check) {
                return check.test(name);
            }));
            var logger = enabled ? checks.options.browser ? function() {
                var _console;
                for (var _len = arguments.length, msg = new Array(_len), _key = 0; _key < _len; _key++) {
                    msg[_key] = arguments[_key];
                }
                (_console = console).log.apply(_console, [ "%c%s", style, name ].concat(msg));
            } : function() {
                var _console2;
                for (var _len2 = arguments.length, msg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    msg[_key2] = arguments[_key2];
                }
                (_console2 = console).log.apply(_console2, [ "".concat(name) ].concat(msg));
            } : function() {
                return undefined;
            };
            logger.enabled = enabled;
            return logger;
        };
        var nameArray = {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgrey: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkslategrey: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            grey: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgrey: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        };
        function name2hex(n) {
            n = n.toLowerCase();
            if (!nameArray[n]) return "Invalid Color Name";
            return nameArray[n];
        }
        function hex2rgb(h) {
            h = h.replace(/^\#/, "");
            if (h.length === 6) {
                return [ parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16) ];
            }
        }
        var _name2rgb = {};
        function name2rgb(n) {
            if (!_name2rgb[n]) _name2rgb[n] = hex2rgb(name2hex(n));
            return _name2rgb[n];
        }
        function color(o, r, g, b, a) {
            if (typeof r !== "string") return o.setColor(r, g, b, a);
            if (r === "") return o;
            var c = name2rgb(r).map((function(x) {
                return x / 255;
            }));
            c[3] = g || 1;
            return o.setColor(c);
        }
        function init(proto) {
            if (proto.prototype._jscadutilsinit) return;
            proto.prototype.color = function(r, g, b, a) {
                if (!r) return this;
                return color(this, r, g, b, a);
            };
            proto.prototype.flush = function flush$1(to, axis, mside, wside) {
                return flush(this, to, axis, mside, wside);
            };
            proto.prototype.snap = function snap$1(to, axis, orientation, delta) {
                return snap(this, to, axis, orientation, delta);
            };
            proto.prototype.calcSnap = function calcSnap$1(to, axis, orientation, delta) {
                return calcSnap(this, to, axis, orientation, delta);
            };
            proto.prototype.midlineTo = function midlineTo$1(axis, to) {
                return midlineTo(this, axis, to);
            };
            proto.prototype.calcmidlineTo = function midlineTo(axis, to) {
                return calcmidlineTo(this, axis, to);
            };
            proto.prototype.centerWith = function centerWith$1(axis, to) {
                depreciated("centerWith", true, "Use align instead.");
                return centerWith(this, axis, to);
            };
            if (proto.center) echo("proto already has .center");
            proto.prototype.center = function center(axis) {
                return centerWith(this, axis || "xyz", unitCube());
            };
            proto.prototype.calcCenter = function centerWith(axis) {
                return calcCenterWith(this, axis || "xyz", unitCube(), 0);
            };
            proto.prototype.align = function align(to, axis) {
                return centerWith(this, axis, to);
            };
            proto.prototype.calcAlign = function calcAlign(to, axis, delta) {
                return calcCenterWith(this, axis, to, delta);
            };
            proto.prototype.enlarge = function enlarge$1(x, y, z) {
                return enlarge(this, x, y, z);
            };
            proto.prototype.fit = function fit$1(x, y, z, a) {
                return fit(this, x, y, z, a);
            };
            if (proto.size) echo("proto already has .size");
            proto.prototype.size = function() {
                return size(this.getBounds());
            };
            proto.prototype.centroid = function() {
                return centroid(this);
            };
            proto.prototype.Zero = function zero$1() {
                return zero(this);
            };
            proto.prototype.Center = function Center(axes) {
                return this.align(unitCube(), axes || "xy");
            };
            proto.Vector2D.prototype.map = function Vector2D_map(cb) {
                return new proto.Vector2D(cb(this.x), cb(this.y));
            };
            proto.prototype.fillet = function fillet$1(radius, orientation, options) {
                return fillet(this, radius, orientation, options);
            };
            proto.prototype.chamfer = function chamfer$1(radius, orientation, options) {
                return chamfer(this, radius, orientation, options);
            };
            proto.prototype.bisect = function bisect$1() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                return bisect.apply(util, [ this ].concat(args));
            };
            proto.prototype.slice = function slice$1() {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }
                return slice.apply(util, [ this ].concat(args));
            };
            proto.prototype.wedge = function wedge$1() {
                for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }
                return wedge.apply(util, [ this ].concat(args));
            };
            proto.prototype.stretch = function stretch$1(axis, distance, offset) {
                return stretch(this, axis, distance, offset);
            };
            proto.prototype.unionIf = function unionIf(object, condition) {
                return condition ? this.union(result(this, object)) : this;
            };
            proto.prototype.subtractIf = function subtractIf(object, condition) {
                return condition ? this.subtract(result(this, object)) : this;
            };
            proto.prototype._translate = proto.prototype.translate;
            proto.prototype.translate = function translate() {
                if (arguments.length === 1) {
                    return this._translate(arguments[0]);
                } else {
                    var t = Array.prototype.slice.call(arguments, 0).reduce((function(result, arg) {
                        result = undefined(result, arg);
                        return result;
                    }), [ 0, 0, 0 ]);
                    return this._translate(t);
                }
            };
            proto.prototype.addConnector = function addConnector$1(name, point, axis, normal) {
                return addConnector(this, name, point, axis, normal);
            };
            proto.prototype.connect = function connectTo(myConnectorName, otherConnector) {
                var mirror = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                var normalrotation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
                var myConnector = myConnectorName.split(".").reduce((function(a, v) {
                    return a[v];
                }), this.properties);
                if (!myConnector) {
                    error("The connector '".concat(myConnectorName, "' does not exist on the object [").concat(Object.keys(this.properties).join(","), "]"), "Missing connector property");
                }
                return this.connectTo(myConnector, otherConnector, mirror, normalrotation);
            };
            proto.prototype._jscadutilsinit = true;
        }
        var init$1 = Object.freeze({
            __proto__: null,
            default: init
        });
        var CSG = jsCadCSG.CSG, CAG = jsCadCSG.CAG;
        var rectangular_extrude = scadApi.extrusions.rectangular_extrude;
        var _scadApi$text = scadApi.text, vector_text = _scadApi$text.vector_text, vector_char = _scadApi$text.vector_char;
        var union = scadApi.booleanOps.union;
        init(CSG);
        var debug = Debug("jscadUtils:group");
        function JsCadUtilsGroup() {
            var names = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var parts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var holes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            this.name = "";
            this.names = names;
            this.parts = parts;
            this.holes = holes;
        }
        JsCadUtilsGroup.prototype.add = function(object, name, hidden, subparts, parts) {
            debug("add", object, name, hidden, subparts, parts);
            var self = this;
            if (object.parts) {
                if (name) {
                    if (!hidden) self.names.push(name);
                    self.parts[name] = object.combine(parts);
                    if (subparts) {
                        Object.keys(object.parts).forEach((function(key) {
                            self.parts[subparts + key] = object.parts[key];
                        }));
                    }
                } else {
                    Object.assign(self.parts, object.parts);
                    if (!hidden) self.names = self.names.concat(object.names);
                }
            } else {
                if (!hidden) self.names.push(name);
                self.parts[name] = object;
            }
            return self;
        };
        JsCadUtilsGroup.prototype.combine = function(pieces) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var map = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function(x) {
                return x;
            };
            try {
                var self = this;
                options = Object.assign({
                    noholes: false
                }, options);
                pieces = pieces ? pieces.split(",") : self.names;
                if (pieces.length === 0) {
                    throw new Error("no pieces found in ".concat(self.name, " pieces: ").concat(pieces, " parts: ").concat(Object.keys(self.parts), " names: ").concat(self.names));
                }
                debug("combine", self.names, self.parts);
                var g = union(mapPick(self.parts, pieces, (function(value, key, index, object) {
                    return map ? map(value, key, index, object) : identity(value);
                }), self.name));
                return g.subtractIf(self.holes && Array.isArray(self.holes) ? union(self.holes) : self.holes, self.holes && !options.noholes);
            } catch (err) {
                debug("combine error", this, pieces, options, err);
                throw error('group::combine error "'.concat(err.message || err.toString(), '"\nthis: ').concat(this, '\npieces: "').concat(pieces, '"\noptions: ').concat(JSON.stringify(options, null, 2), "\nstack: ").concat(err.stack, "\n"), "JSCAD_UTILS_GROUP_ERROR");
            }
        };
        JsCadUtilsGroup.prototype.map = function(cb) {
            var self = this;
            self.parts = Object.keys(self.parts).filter((function(k) {
                return k !== "holes";
            })).reduce((function(result, key) {
                result[key] = cb(self.parts[key], key);
                return result;
            }), {});
            if (self.holes) {
                if (Array.isArray(self.holes)) {
                    self.holes = self.holes.map((function(hole, idx) {
                        return cb(hole, idx);
                    }));
                } else {
                    self.holes = cb(self.holes, "holes");
                }
            }
            return self;
        };
        JsCadUtilsGroup.prototype.clone = function(name, map) {
            debug("clone", name, _typeof(name), map);
            var self = this;
            if (typeof name == "function") {
                map = name;
                name = undefined;
            }
            if (!map) map = identity;
            var group = Group(name);
            Object.keys(self.parts).forEach((function(key) {
                var part = self.parts[key];
                var hidden = self.names.indexOf(key) == -1;
                group.add(map(clone(part)), key, hidden);
            }));
            if (self.holes) {
                group.holes = toArray(self.holes).map((function(part) {
                    return map(CSG.fromPolygons(part.toPolygons()), "holes");
                }));
            }
            return group;
        };
        JsCadUtilsGroup.prototype.rotate = function(solid, axis, angle) {
            var self = this;
            var axes = {
                x: [ 1, 0, 0 ],
                y: [ 0, 1, 0 ],
                z: [ 0, 0, 1 ]
            };
            if (typeof solid === "string") {
                var _names = solid;
                solid = self.combine(_names);
            }
            var rotationCenter = solid.centroid();
            var rotationAxis = axes[axis];
            self.map((function(part) {
                return part.rotate(rotationCenter, rotationAxis, angle);
            }));
            return self;
        };
        JsCadUtilsGroup.prototype.combineAll = function(options, map) {
            var self = this;
            return self.combine(Object.keys(self.parts).join(","), options, map);
        };
        JsCadUtilsGroup.prototype.snap = function snap(part, to, axis, orientation, delta) {
            try {
                var self = this;
                var t = calcSnap(self.combine(part), to, axis, orientation, delta);
                self.map((function(part) {
                    return part.translate(t);
                }));
                return self;
            } catch (err) {
                debug("snap error", this, part, to, axis, delta, err);
                throw error('group::snap error "'.concat(err.message || err.toString(), '"\nthis: ').concat(this, '\npart: "').concat(part, '"\nto: ').concat(to, '\naxis: "').concat(axis, '"\norientation: "').concat(orientation, '"\ndelta: "').concat(delta, '"\nstack: ').concat(err.stack, "\n"), "JSCAD_UTILS_GROUP_ERROR");
            }
        };
        JsCadUtilsGroup.prototype.align = function align(part, to, axis, delta) {
            try {
                var self = this;
                var t = calcCenterWith(self.combine(part, {
                    noholes: true
                }), axis, to, delta);
                self.map((function(part) {
                    return part.translate(t);
                }));
                return self;
            } catch (err) {
                debug("align error", this, part, to, axis, delta, err);
                throw error('group::align error "'.concat(err.message || err.toString(), '"\nthis: ').concat(this, '\npart: "').concat(part, '"\nto: ').concat(to, '\naxis: "').concat(axis, '"\ndelta: "').concat(delta, '"\nstack: ').concat(err.stack, "\n"), "JSCAD_UTILS_GROUP_ERROR");
            }
        };
        JsCadUtilsGroup.prototype.center = function center(part) {
            var self = this;
            return self.align(part, unitCube(), "xyz");
        };
        JsCadUtilsGroup.prototype.zero = function zero(part) {
            var self = this;
            var bounds = self.parts[part].getBounds();
            return self.translate([ 0, 0, -bounds[0].z ]);
        };
        JsCadUtilsGroup.prototype.connectTo = function connectTo(partName, connectorName, to, toConnectorName) {
            var mirror = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var normalrotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
            debug("connectTo", {
                partName,
                connectorName,
                to,
                toConnectorName,
                mirror,
                normalrotation
            });
            var self = this;
            var myConnector = connectorName.split(".").reduce((function(a, v) {
                return a[v];
            }), self.parts[partName].properties);
            debug("toConnector", to instanceof CSG.Connector);
            var toConnector = toConnectorName.split(".").reduce((function(a, v) {
                return a[v];
            }), to.properties);
            var matrix = myConnector.getTransformationTo(toConnector, mirror, normalrotation);
            debug("connectTo", matrix);
            self.map((function(part) {
                return part.transform(matrix);
            }));
            return self;
        };
        JsCadUtilsGroup.prototype.midlineTo = function midlineTo(part, axis, to) {
            var self = this;
            var size = self.combine(part).size();
            var t = axisApply(axis, (function(i, a) {
                return to - size[a] / 2;
            }));
            self.map((function(part) {
                return part.translate(t);
            }));
            return self;
        };
        JsCadUtilsGroup.prototype.translate = function translate(x, y, z) {
            var self = this;
            var t = Array.isArray(x) ? x : [ x, y, z ];
            debug("translate", t);
            self.map((function(part) {
                return part.translate(t);
            }));
            return self;
        };
        JsCadUtilsGroup.prototype.pick = function(parts, map) {
            var self = this;
            var p = parts && parts.length > 0 && parts.split(",") || self.names;
            if (!map) map = identity;
            var g = Group();
            p.forEach((function(name) {
                g.add(map(CSG.fromPolygons(self.parts[name].toPolygons()), name), name);
            }));
            return g;
        };
        JsCadUtilsGroup.prototype.array = function(parts, map) {
            var _this = this;
            var self = this;
            var p = parts && parts.length > 0 && parts.split(",") || self.names;
            if (!map) map = identity;
            var a = [];
            p.forEach((function(name) {
                if (!self.parts[name]) {
                    debug("array error", _this, parts);
                    throw error('group::array error "'.concat(name, '" not found.\nthis: ').concat(_this, '\nparts: "').concat(parts, '"\n'), "JSCAD_UTILS_GROUP_ERROR");
                }
                a.push(map(CSG.fromPolygons(self.parts[name].toPolygons()), name));
            }));
            return a;
        };
        JsCadUtilsGroup.prototype.toArray = function(pieces) {
            var self = this;
            var piecesArray = pieces ? pieces.split(",") : self.names;
            return piecesArray.map((function(piece) {
                if (!self.parts[piece]) console.error("Cannot find ".concat(piece, " in ").concat(self.names));
                return self.parts[piece];
            }));
        };
        JsCadUtilsGroup.prototype.toString = function() {
            return '{\n  name: "'.concat(this.name, '",\n  names: "').concat(this.names.join(","), '", \n  parts: "').concat(Object.keys(this.parts), '",\n  holes: "').concat(this.holes, '"\n}');
        };
        JsCadUtilsGroup.prototype.setName = function(name) {
            this.name = name;
            return this;
        };
        function Group(objectNames, addObjects) {
            debug("Group", objectNames, addObjects);
            var self = {
                name: "",
                names: [],
                parts: {}
            };
            if (objectNames) {
                if (addObjects) {
                    var names = objectNames;
                    var objects = addObjects;
                    self.names = names && names.length > 0 && names.split(",") || [];
                    if (Array.isArray(objects)) {
                        self.parts = zipObject(self.names, objects);
                    } else if (objects instanceof CSG) {
                        self.parts = zipObject(self.names, [ objects ]);
                    } else {
                        self.parts = objects || {};
                    }
                } else {
                    if (typeof objectNames == "string") {
                        self.name = objectNames;
                    } else {
                        var objects = objectNames;
                        self.names = Object.keys(objects).filter((function(k) {
                            return k !== "holes";
                        }));
                        self.parts = Object.assign({}, objects);
                        self.holes = objects.holes;
                    }
                }
            }
            return new JsCadUtilsGroup(self.names, self.parts, self.holes);
        }
        var debug$1 = Debug("jscadUtils:util");
        var NOZZEL_SIZE = .4;
        var nearest = {
            under: function under(desired) {
                var nozzel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NOZZEL_SIZE;
                var nozzie = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                return (Math.floor(desired / nozzel) + nozzie) * nozzel;
            },
            over: function over(desired) {
                var nozzel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NOZZEL_SIZE;
                var nozzie = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                return (Math.ceil(desired / nozzel) + nozzie) * nozzel;
            }
        };
        function identity(solid) {
            return solid;
        }
        function result(object, f) {
            if (typeof f === "function") {
                return f.call(object);
            } else {
                return f;
            }
        }
        function defaults(target, defaults) {
            depreciated("defaults", true, "use Object.assign instead");
            return Object.assign(defaults, target);
        }
        function isEmpty(variable) {
            return typeof variable === "undefined" || variable === null;
        }
        function isNegative(n) {
            return ((n = +n) || 1 / n) < 0;
        }
        function print(msg, o) {
            debug$1(msg, JSON.stringify(o.getBounds()), JSON.stringify(this.size(o.getBounds())));
        }
        function jscadToString(o) {
            if (_typeof(o) == "object") {
                if (o.polygons) {
                    return "{\npolygons: ".concat(o.polygons.length, ',\nproperties: "').concat(Object.keys(o.properties), '"\n}\n');
                }
            } else {
                return o.toString();
            }
        }
        function error(msg, name, error) {
            if (console && console.error) console.error(msg, error);
            var err = new Error(msg);
            err.name = name || "JSCAD_UTILS_ERROR";
            err._error = error;
            throw err;
        }
        function depreciated(method, error, message) {
            var msg = method + " is depreciated." + (" " + message || "");
            if (!error && console && console.error) console[error ? "error" : "warn"](msg);
            if (error) {
                var err = new Error(msg);
                err.name = "JSCAD_UTILS_DEPRECATED";
                throw err;
            }
        }
        function inch(x) {
            return x * 25.4;
        }
        function cm(x) {
            return x / 25.4;
        }
        function label(text, x, y, width, height) {
            var l = vector_text(x || 0, y || 0, text);
            var o = [];
            l.forEach((function(pl) {
                o.push(rectangular_extrude(pl, {
                    w: width || 2,
                    h: height || 2
                }));
            }));
            return center(union(o));
        }
        function text(text) {
            var l = vector_char(0, 0, text);
            var _char = l.segments.reduce((function(result, segment) {
                var path = new CSG.Path2D(segment);
                var cag = path.expandToCAG(2);
                return result ? result.union(cag) : cag;
            }), undefined);
            return _char;
        }
        function unitCube(length, radius) {
            radius = radius || .5;
            return CSG.cube({
                center: [ 0, 0, 0 ],
                radius: [ radius, radius, length || .5 ]
            });
        }
        function unitAxis(length, radius, centroid) {
            debug$1("unitAxis", length, radius, centroid);
            centroid = centroid || [ 0, 0, 0 ];
            var unitaxis = unitCube(length, radius).setColor(1, 0, 0).union([ unitCube(length, radius).rotateY(90).setColor(0, 1, 0), unitCube(length, radius).rotateX(90).setColor(0, 0, 1) ]);
            unitaxis.properties.origin = new CSG.Connector([ 0, 0, 0 ], [ 1, 0, 0 ], [ 0, 1, 0 ]);
            return unitaxis.translate(centroid);
        }
        function toArray(a) {
            return Array.isArray(a) ? a : [ a ];
        }
        function ifArray(a, cb) {
            return Array.isArray(a) ? a.map(cb) : cb(a);
        }
        function segment(object, segments, axis) {
            var size = object.size()[axis];
            var width = size / segments;
            var result = [];
            for (var i = width; i < size; i += width) {
                result.push(i);
            }
            return result;
        }
        function zipObject(names, values) {
            return names.reduce((function(result, value, idx) {
                result[value] = values[idx];
                return result;
            }), {});
        }
        function map(o, f) {
            return Object.keys(o).map((function(key) {
                return f(o[key], key, o);
            }));
        }
        function mapValues(o, f) {
            return Object.keys(o).map((function(key) {
                return f(o[key], key);
            }));
        }
        function pick(o, names) {
            return names.reduce((function(result, name) {
                result[name] = o[name];
                return result;
            }), {});
        }
        function mapPick(o, names, f, options) {
            return names.reduce((function(result, name, index) {
                if (!o[name]) {
                    throw new Error("".concat(name, " not found in ").concat(options.name, ": ").concat(Object.keys(o).join(",")));
                }
                result.push(f ? f(o[name], name, index, o) : o[name]);
                return result;
            }), []);
        }
        function divA(a, f) {
            return div(a, f);
        }
        function divxyz(size, x, y, z) {
            return {
                x: size.x / x,
                y: size.y / y,
                z: size.z / z
            };
        }
        function div$1(size, d) {
            return this.divxyz(size, d, d, d);
        }
        function mulxyz(size, x, y, z) {
            return {
                x: size.x * x,
                y: size.y * y,
                z: size.z * z
            };
        }
        function mul(size, d) {
            return this.divxyz(size, d, d, d);
        }
        function xyz2array(size) {
            return [ size.x, size.y, size.z ];
        }
        var rotationAxes = {
            x: [ 1, 0, 0 ],
            y: [ 0, 1, 0 ],
            z: [ 0, 0, 1 ]
        };
        function size(o) {
            var bbox = o.getBounds ? o.getBounds() : o;
            var foo = bbox[1].minus(bbox[0]);
            return foo;
        }
        function scale(size, value) {
            if (value == 0) return 1;
            return 1 + 100 / (size / value) / 100;
        }
        function center(object, objectSize) {
            objectSize = objectSize || size(object.getBounds());
            return centerY(centerX(object, objectSize), objectSize);
        }
        function centerY(object, objectSize) {
            objectSize = objectSize || size(object.getBounds());
            return object.translate([ 0, -objectSize.y / 2, 0 ]);
        }
        function centerX(object, objectSize) {
            objectSize = objectSize || size(object.getBounds());
            return object.translate([ -objectSize.x / 2, 0, 0 ]);
        }
        function enlarge(object, x, y, z) {
            var a;
            if (Array.isArray(x)) {
                a = x;
            } else {
                a = [ x, y || x, z || x ];
            }
            var objectSize = size(object);
            var objectCentroid = centroid(object, objectSize);
            var idx = 0;
            var t = map(objectSize, (function(i) {
                return scale(i, a[idx++]);
            }));
            var new_object = object.scale(t);
            var new_centroid = centroid(new_object);
            var delta = new_centroid.minus(objectCentroid).times(-1);
            return new_object.translate(delta);
        }
        function fit(object, x, y, z, keep_aspect_ratio) {
            var a;
            if (Array.isArray(x)) {
                a = x;
                keep_aspect_ratio = y;
                x = a[0];
                y = a[1];
                z = a[2];
            } else {
                a = [ x, y, z ];
            }
            var objectSize = size(object.getBounds());
            function scale(size, value) {
                if (value == 0) return 1;
                return value / size;
            }
            var s = [ scale(objectSize.x, x), scale(objectSize.y, y), scale(objectSize.z, z) ];
            var min$1 = min(s);
            return centerWith(object.scale(s.map((function(d, i) {
                if (a[i] === 0) return 1;
                return keep_aspect_ratio ? min$1 : d;
            }))), "xyz", object);
        }
        function shift(object, x, y, z) {
            var hsize = this.div(this.size(object.getBounds()), 2);
            return object.translate(this.xyz2array(this.mulxyz(hsize, x, y, z)));
        }
        function zero(object) {
            var bounds = object.getBounds();
            return object.translate([ 0, 0, -bounds[0].z ]);
        }
        function mirrored4(x) {
            return x.union([ x.mirroredY(90), x.mirroredX(90), x.mirroredY(90).mirroredX(90) ]);
        }
        var flushSide = {
            "above-outside": [ 1, 0 ],
            "above-inside": [ 1, 1 ],
            "below-outside": [ 0, 1 ],
            "below-inside": [ 0, 0 ],
            "outside+": [ 0, 1 ],
            "outside-": [ 1, 0 ],
            "inside+": [ 1, 1 ],
            "inside-": [ 0, 0 ],
            "center+": [ -1, 1 ],
            "center-": [ -1, 0 ]
        };
        function calcFlush(moveobj, withobj, axes, mside, wside) {
            depreciated("calcFlush", false, "Use calcSnap instead.");
            var side;
            if (mside === 0 || mside === 1) {
                side = [ wside !== undefined ? wside : mside, mside ];
            } else {
                side = flushSide[mside];
                if (!side) error("invalid side: " + mside);
            }
            var m = moveobj.getBounds();
            var w = withobj.getBounds();
            if (side[0] === -1) {
                w[-1] = toxyz(withobj.centroid());
            }
            return this.axisApply(axes, (function(i, axis) {
                return w[side[0]][axis] - m[side[1]][axis];
            }));
        }
        function calcSnap(moveobj, withobj, axes, orientation) {
            var delta = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            var side = flushSide[orientation];
            if (!side) {
                var fix = {
                    "01": "outside+",
                    10: "outside-",
                    11: "inside+",
                    "00": "inside-",
                    "-11": "center+",
                    "-10": "center-"
                };
                error("calcSnap: invalid side: " + orientation + " should be " + fix["" + orientation + delta]);
            }
            var m = moveobj.getBounds();
            var w = withobj.getBounds();
            if (side[0] === -1) {
                w[-1] = withobj.centroid();
            }
            var t = axisApply(axes, (function(i, axis) {
                return w[side[0]][axis] - m[side[1]][axis];
            }));
            return delta ? axisApply(axes, (function(i) {
                return t[i] + delta;
            })) : t;
        }
        function snap(moveobj, withobj, axis, orientation, delta) {
            debug$1("snap", moveobj, withobj, axis, orientation, delta);
            var t = calcSnap(moveobj, withobj, axis, orientation, delta);
            return moveobj.translate(t);
        }
        function flush(moveobj, withobj, axis, mside, wside) {
            return moveobj.translate(calcFlush(moveobj, withobj, axis, mside, wside));
        }
        function axisApply(axes, valfun, a) {
            debug$1("axisApply", axes, valfun, a);
            var retval = a || [ 0, 0, 0 ];
            var lookup = {
                x: 0,
                y: 1,
                z: 2
            };
            axes.split("").forEach((function(axis) {
                retval[lookup[axis]] = valfun(lookup[axis], axis);
            }));
            return retval;
        }
        function axis2array(axes, valfun) {
            depreciated("axis2array");
            var a = [ 0, 0, 0 ];
            var lookup = {
                x: 0,
                y: 1,
                z: 2
            };
            axes.split("").forEach((function(axis) {
                var i = lookup[axis];
                a[i] = valfun(i, axis);
            }));
            return a;
        }
        function centroid(o, objectSize) {
            try {
                var bounds = o.getBounds();
                objectSize = objectSize || size(bounds);
                return bounds[0].plus(objectSize.dividedBy(2));
            } catch (err) {
                error("centroid error o:".concat(jscadToString(o), " objectSize: ").concat(objectSize), undefined, err);
            }
        }
        function calcmidlineTo(o, axis, to) {
            var bounds = o.getBounds();
            var objectSize = size(bounds);
            return axisApply(axis, (function(i, a) {
                return to - objectSize[a] / 2;
            }));
        }
        function midlineTo(o, axis, to) {
            return o.translate(calcmidlineTo(o, axis, to));
        }
        function translator(o, axis, withObj) {
            var objectCentroid = centroid(o);
            var withCentroid = centroid(withObj);
            var t = axisApply(axis, (function(i) {
                return withCentroid[i] - objectCentroid[i];
            }));
            return t;
        }
        function calcCenterWith(o, axes, withObj) {
            var delta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var objectCentroid = centroid(o);
            var withCentroid = centroid(withObj);
            var t = axisApply(axes, (function(i, axis) {
                return withCentroid[axis] - objectCentroid[axis];
            }));
            return delta ? add(t, delta) : t;
        }
        function centerWith(o, axis, withObj) {
            return o.translate(calcCenterWith(o, axis, withObj));
        }
        function getDelta(size, bounds, axis, offset, nonzero) {
            if (!isEmpty(offset) && nonzero) {
                if (Math.abs(offset) < 1e-4) {
                    offset = 1e-4 * (isNegative(offset) ? -1 : 1);
                }
            }
            var dist = isNegative(offset) ? offset = size[axis] + offset : offset;
            return axisApply(axis, (function(i, a) {
                return bounds[0][a] + (isEmpty(dist) ? size[axis] / 2 : dist);
            }));
        }
        function bisect() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            if (args.length < 2) {
                error("bisect requries an object and an axis", "JSCAD_UTILS_INVALID_ARGS");
            }
            var object = args[0];
            var axis = args[1];
            var offset, angle = 0, rotateaxis, rotateoffset, options = {};
            for (var i = 2; i < args.length; i++) {
                if (args[i] instanceof Object) {
                    options = args[i];
                    if (options.offset) offset = options.offset;
                    if (options.angle) angle = options.angle;
                    if (options.rotateaxis) rotateaxis = options.rotateaxis;
                    if (options.rotateoffset) rotateoffset = options.rotateoffset;
                } else {
                    switch (i) {
                      case 2:
                        offset = args[i];
                        break;

                      case 3:
                        angle = args[i];
                        break;

                      case 4:
                        rotateaxis = args[i];
                        break;

                      case 5:
                        rotateoffset = args[i];
                        break;

                      case 6:
                        options = args[i];
                        break;
                    }
                }
            }
            options = Object.assign({
                addRotationCenter: false
            }, options);
            angle = angle || 0;
            var info = normalVector(axis);
            var bounds = object.getBounds();
            var objectSize = size(object);
            rotateaxis = rotateaxis || {
                x: "y",
                y: "x",
                z: "x"
            }[axis];
            var cutDelta = options.cutDelta || getDelta(objectSize, bounds, axis, offset);
            var rotateOffsetAxis = {
                xy: "z",
                yz: "x",
                xz: "y"
            }[[ axis, rotateaxis ].sort().join("")];
            var centroid = object.centroid();
            var rotateDelta = getDelta(objectSize, bounds, rotateOffsetAxis, rotateoffset);
            var rotationCenter = options.rotationCenter || new CSG.Vector3D(axisApply("xyz", (function(i, a) {
                if (a == axis) return cutDelta[i];
                if (a == rotateOffsetAxis) return rotateDelta[i];
                return centroid[a];
            })));
            var theRotationAxis = rotationAxes[rotateaxis];
            var cutplane = CSG.OrthoNormalBasis.GetCartesian(info.orthoNormalCartesian[0], info.orthoNormalCartesian[1]).translate(cutDelta).rotate(rotationCenter, theRotationAxis, angle);
            debug$1("bisect", debug$1.enabled && {
                axis,
                offset,
                angle,
                rotateaxis,
                cutDelta,
                rotateOffsetAxis,
                rotationCenter,
                theRotationAxis,
                cutplane,
                options
            });
            var g = Group("negative,positive", [ object.cutByPlane(cutplane.plane).color(options.color && "red"), object.cutByPlane(cutplane.plane.flipped()).color(options.color && "blue") ]);
            if (options.addRotationCenter) g.add(unitAxis(objectSize.length() + 10, .1, rotationCenter), "rotationCenter");
            return g;
        }
        function slice(object) {
            var angle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
            var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "x";
            var rotateaxis = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "z";
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
                color: true,
                addRotationCenter: true
            };
            var info = normalVector(axis);
            var rotationCenter = options.rotationCenter || new CSG.Vector3D(0, 0, 0);
            var theRotationAxis = rotationAxes[rotateaxis];
            var cutplane = CSG.OrthoNormalBasis.GetCartesian(info.orthoNormalCartesian[0], info.orthoNormalCartesian[1]).rotate(rotationCenter, theRotationAxis, angle);
            var g = Group("negative,positive", [ object.cutByPlane(cutplane.plane).color(options.color && "red"), object.cutByPlane(cutplane.plane.flipped()).color(options.color && "blue") ]);
            if (options.addRotationCenter) {
                var objectSize = size(object);
                g.add(unitAxis(objectSize.length() + 10, .1, rotationCenter), "rotationCenter");
            }
            return g;
        }
        function wedge(object, start, end, axis) {
            var a = slice(object, start, axis);
            var b = slice(a.parts.positive, end, axis);
            return Group({
                body: b.parts.positive.union(a.parts.negative).color("blue"),
                wedge: b.parts.negative.color("red")
            });
        }
        function stretch(object, axis, distance, offset) {
            var normal = {
                x: [ 1, 0, 0 ],
                y: [ 0, 1, 0 ],
                z: [ 0, 0, 1 ]
            };
            var bounds = object.getBounds();
            var objectSize = size(object);
            var cutDelta = getDelta(objectSize, bounds, axis, offset, true);
            return object.stretchAtPlane(normal[axis], cutDelta, distance);
        }
        function poly2solid(top, bottom, height) {
            if (top.sides.length == 0) {
                return new CSG;
            }
            var offsetVector = CSG.Vector3D.Create(0, 0, height);
            var normalVector = CSG.Vector3D.Create(0, 1, 0);
            var polygons = [];
            polygons = polygons.concat(bottom._toPlanePolygons({
                translation: [ 0, 0, 0 ],
                normalVector,
                flipped: !(offsetVector.z < 0)
            }));
            polygons = polygons.concat(top._toPlanePolygons({
                translation: offsetVector,
                normalVector,
                flipped: offsetVector.z < 0
            }));
            var c1 = new CSG.Connector(offsetVector.times(0), [ 0, 0, offsetVector.z ], normalVector);
            var c2 = new CSG.Connector(offsetVector, [ 0, 0, offsetVector.z ], normalVector);
            polygons = polygons.concat(bottom._toWallPolygons({
                cag: top,
                toConnector1: c1,
                toConnector2: c2
            }));
            return CSG.fromPolygons(polygons);
        }
        function slices2poly(slices, options, axis) {
            var twistangle = options && parseFloat(options.twistangle) || 0;
            var twiststeps = options && parseInt(options.twiststeps) || CSG.defaultResolution3D;
            if (twistangle == 0 || twiststeps < 1) {
                twiststeps = 1;
            }
            var normalVector = options.si.normalVector;
            var polygons = [];
            var first$1 = first(slices);
            var last$1 = last(slices);
            var up = first$1.offset[axis] > last$1.offset[axis];
            polygons = polygons.concat(first$1.poly._toPlanePolygons({
                translation: first$1.offset,
                normalVector,
                flipped: !up
            }));
            var rotateAxis = "rotate" + axis.toUpperCase();
            polygons = polygons.concat(last$1.poly._toPlanePolygons({
                translation: last$1.offset,
                normalVector: normalVector[rotateAxis](twistangle),
                flipped: up
            }));
            var rotate = twistangle === 0 ? function rotateZero(v) {
                return v;
            } : function rotate(v, angle, percent) {
                return v[rotateAxis](angle * percent);
            };
            var connectorAxis = last$1.offset.minus(first$1.offset).abs();
            slices.forEach((function(slice, idx) {
                if (idx < slices.length - 1) {
                    var nextidx = idx + 1;
                    var top = !up ? slices[nextidx] : slice;
                    var bottom = up ? slices[nextidx] : slice;
                    var c1 = new CSG.Connector(bottom.offset, connectorAxis, rotate(normalVector, twistangle, idx / slices.length));
                    var c2 = new CSG.Connector(top.offset, connectorAxis, rotate(normalVector, twistangle, nextidx / slices.length));
                    polygons = polygons.concat(bottom.poly._toWallPolygons({
                        cag: top.poly,
                        toConnector1: c1,
                        toConnector2: c2
                    }));
                }
            }));
            return CSG.fromPolygons(polygons);
        }
        function normalVector(axis) {
            var axisInfo = {
                z: {
                    orthoNormalCartesian: [ "X", "Y" ],
                    normalVector: CSG.Vector3D.Create(0, 1, 0)
                },
                x: {
                    orthoNormalCartesian: [ "Y", "Z" ],
                    normalVector: CSG.Vector3D.Create(0, 0, 1)
                },
                y: {
                    orthoNormalCartesian: [ "X", "Z" ],
                    normalVector: CSG.Vector3D.Create(0, 0, 1)
                }
            };
            if (!axisInfo[axis]) error("normalVector: invalid axis " + axis);
            return axisInfo[axis];
        }
        function sliceParams(orientation, radius, bounds) {
            var axis = orientation[0];
            var direction = orientation[1];
            var dirInfo = {
                "dir+": {
                    sizeIdx: 1,
                    sizeDir: -1,
                    moveDir: -1,
                    positive: true
                },
                "dir-": {
                    sizeIdx: 0,
                    sizeDir: 1,
                    moveDir: 0,
                    positive: false
                }
            };
            var info = dirInfo["dir" + direction];
            return Object.assign({
                axis,
                cutDelta: axisApply(axis, (function(i, a) {
                    return bounds[info.sizeIdx][a] + Math.abs(radius) * info.sizeDir;
                })),
                moveDelta: axisApply(axis, (function(i, a) {
                    return bounds[info.sizeIdx][a] + Math.abs(radius) * info.moveDir;
                }))
            }, info, normalVector(axis));
        }
        function reShape(object, radius, orientation, options, slicer) {
            options = options || {};
            var b = object.getBounds();
            var ar = Math.abs(radius);
            var si = sliceParams(orientation, radius, b);
            if (si.axis !== "z") throw new Error('reShape error: CAG._toPlanePolytons only uses the "z" axis.  You must use the "z" axis for now.');
            var cutplane = CSG.OrthoNormalBasis.GetCartesian(si.orthoNormalCartesian[0], si.orthoNormalCartesian[1]).translate(si.cutDelta);
            var slice = object.sectionCut(cutplane);
            var first = axisApply(si.axis, (function() {
                return si.positive ? 0 : ar;
            }));
            var last = axisApply(si.axis, (function() {
                return si.positive ? ar : 0;
            }));
            var plane = si.positive ? cutplane.plane : cutplane.plane.flipped();
            var slices = slicer(first, last, slice);
            var delta = slices2poly(slices, Object.assign(options, {
                si
            }), si.axis).color(options.color);
            var remainder = object.cutByPlane(plane);
            return union([ options.unionOriginal ? object : remainder, delta.translate(si.moveDelta) ]);
        }
        function chamfer(object, radius, orientation, options) {
            return reShape(object, radius, orientation, options, (function(first, last, slice) {
                return [ {
                    poly: slice,
                    offset: new CSG.Vector3D(first)
                }, {
                    poly: enlarge(slice, [ -radius * 2, -radius * 2 ]),
                    offset: new CSG.Vector3D(last)
                } ];
            }));
        }
        function fillet(object, radius, orientation, options) {
            options = options || {};
            return reShape(object, radius, orientation, options, (function(first, last, slice) {
                var v1 = new CSG.Vector3D(first);
                var v2 = new CSG.Vector3D(last);
                var res = options.resolution || CSG.defaultResolution3D;
                var slices = range(0, res).map((function(i) {
                    var p = i > 0 ? i / (res - 1) : 0;
                    var v = v1.lerp(v2, p);
                    var size = -radius * 2 - Math.cos(Math.asin(p)) * (-radius * 2);
                    return {
                        poly: enlarge(slice, [ size, size ]),
                        offset: v
                    };
                }));
                return slices;
            }));
        }
        function calcRotate(part, solid, axis) {
            var axes = {
                x: [ 1, 0, 0 ],
                y: [ 0, 1, 0 ],
                z: [ 0, 0, 1 ]
            };
            var rotationCenter = solid.centroid();
            var rotationAxis = axes[axis];
            return {
                rotationCenter,
                rotationAxis
            };
        }
        function rotateAround(part, solid, axis, angle) {
            var _calcRotate = calcRotate(part, solid, axis), rotationCenter = _calcRotate.rotationCenter, rotationAxis = _calcRotate.rotationAxis;
            return part.rotate(rotationCenter, rotationAxis, angle);
        }
        function cloneProperties(from, to) {
            return Object.entries(from).reduce((function(props, _ref) {
                var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                props[key] = value;
                return props;
            }), to);
        }
        function clone(o) {
            var c = CSG.fromPolygons(o.toPolygons());
            cloneProperties(o, c);
            debug$1("clone", o, c, CSG);
            return c;
        }
        function addConnector(object, name) {
            var point = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [ 0, 0, 0 ];
            var axis = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [ 1, 0, 0 ];
            var normal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [ 0, 0, 1 ];
            object.properties[name] = new CSG.Connector(point, axis, normal);
            return object;
        }
        var debug$2 = Debug("jscadUtils:parts");
        var parts = {
            BBox,
            Cube,
            RoundedCube,
            Cylinder,
            Cone
        };
        function BBox() {
            function box(object) {
                return CSG.cube({
                    center: object.centroid(),
                    radius: object.size().dividedBy(2)
                });
            }
            for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
                objects[_key] = arguments[_key];
            }
            return objects.reduce((function(bbox, part) {
                var object = bbox ? union([ bbox, box(part) ]) : part;
                return box(object);
            }), undefined);
        }
        function Cube(width) {
            var r = div(fromxyz(width), 2);
            return CSG.cube({
                center: r,
                radius: r
            });
        }
        function RoundedCube(x, y, thickness, corner_radius) {
            if (x.getBounds) {
                var size$1 = size(x.getBounds());
                var r = [ size$1.x / 2, size$1.y / 2 ];
                thickness = size$1.z;
                corner_radius = y;
            } else {
                var r = [ x / 2, y / 2 ];
            }
            debug$2("RoundedCube", size$1, r, thickness, corner_radius);
            var roundedcube = CAG.roundedRectangle({
                center: [ r[0], r[1], 0 ],
                radius: r,
                roundradius: corner_radius,
                resolution: CSG.defaultResolution2D
            }).extrude({
                offset: [ 0, 0, thickness || 1.62 ]
            });
            return roundedcube;
        }
        function Cylinder(diameter, height) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            debug$2("parts.Cylinder", diameter, height, options);
            options = Object.assign({
                start: [ 0, 0, 0 ],
                end: [ 0, 0, height ],
                radius: diameter / 2,
                resolution: CSG.defaultResolution2D
            }, options);
            return CSG.cylinder(options);
        }
        function Cone(diameter1, diameter2, height) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            debug$2("parts.Cone", diameter1, diameter2, height, options);
            return CSG.cylinder(Object.assign({
                start: [ 0, 0, 0 ],
                end: [ 0, 0, height ],
                radiusStart: diameter1 / 2,
                radiusEnd: diameter2 / 2,
                resolution: CSG.defaultResolution2D
            }, options));
        }
        function Hexagon(diameter, height) {
            debug$2("hexagon", diameter, height);
            var radius = diameter / 2;
            var sqrt3 = Math.sqrt(3) / 2;
            var hex = CAG.fromPoints([ [ radius, 0 ], [ radius / 2, radius * sqrt3 ], [ -radius / 2, radius * sqrt3 ], [ -radius, 0 ], [ -radius / 2, -radius * sqrt3 ], [ radius / 2, -radius * sqrt3 ] ]);
            return hex.extrude({
                offset: [ 0, 0, height ]
            });
        }
        function Triangle(base, height) {
            var radius = base / 2;
            var tri = CAG.fromPoints([ [ -radius, 0 ], [ radius, 0 ], [ 0, Math.sin(30) * radius ] ]);
            return tri.extrude({
                offset: [ 0, 0, height ]
            });
        }
        function Tube(outsideDiameter, insideDiameter, height, outsideOptions, insideOptions) {
            return Cylinder(outsideDiameter, height, outsideOptions).subtract(Cylinder(insideDiameter, height, insideOptions || outsideOptions));
        }
        function Anchor() {
            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
            var hole = Cylinder(width, height).Center().color("red");
            var post = Cylinder(height / 2, width * .66).rotateX(90).align(hole, "xz").snap(hole, "y", "inside-").translate([ 0, 0, -height / 6 ]).color("purple");
            return Group({
                post,
                hole
            });
        }
        function Board(width, height, corner_radius, thickness) {
            var r = divA([ width, height ], 2);
            var board = CAG.roundedRectangle({
                center: [ r[0], r[1], 0 ],
                radius: r,
                roundradius: corner_radius,
                resolution: CSG.defaultResolution2D
            }).extrude({
                offset: [ 0, 0, thickness || 1.62 ]
            });
            return board;
        }
        var Hardware = {
            Orientation: {
                up: {
                    head: "outside-",
                    clear: "inside+"
                },
                down: {
                    head: "outside+",
                    clear: "inside-"
                }
            },
            Screw: function Screw(head, thread, headClearSpace, options) {
                depreciated("Screw", false, "Use the jscad-hardware screw methods instead");
                options = Object.assign(options, {
                    orientation: "up",
                    clearance: [ 0, 0, 0 ]
                });
                var orientation = Hardware.Orientation[options.orientation];
                var group = Group("head,thread", {
                    head: head.color("gray"),
                    thread: thread.snap(head, "z", orientation.head).color("silver")
                });
                if (headClearSpace) {
                    group.add(headClearSpace.enlarge(options.clearance).snap(head, "z", orientation.clear).color("red"), "headClearSpace", true);
                }
                return group;
            },
            PanHeadScrew: function PanHeadScrew(headDiameter, headLength, diameter, length, clearLength, options) {
                depreciated("PanHeadScrew", false, "Use the jscad-hardware screw methods instead");
                var head = Cylinder(headDiameter, headLength);
                var thread = Cylinder(diameter, length);
                if (clearLength) {
                    var headClearSpace = Cylinder(headDiameter, clearLength);
                }
                return Hardware.Screw(head, thread, headClearSpace, options);
            },
            HexHeadScrew: function HexHeadScrew(headDiameter, headLength, diameter, length, clearLength, options) {
                depreciated("HexHeadScrew", false, "Use the jscad-hardware screw methods instead");
                var head = Hexagon(headDiameter, headLength);
                var thread = Cylinder(diameter, length);
                if (clearLength) {
                    var headClearSpace = Hexagon(headDiameter, clearLength);
                }
                return Hardware.Screw(head, thread, headClearSpace, options);
            },
            FlatHeadScrew: function FlatHeadScrew(headDiameter, headLength, diameter, length, clearLength, options) {
                depreciated("FlatHeadScrew", false, "Use the jscad-hardware screw methods instead");
                var head = Cone(headDiameter, diameter, headLength);
                var thread = Cylinder(diameter, length);
                if (clearLength) {
                    var headClearSpace = Cylinder(headDiameter, clearLength);
                }
                return Hardware.Screw(head, thread, headClearSpace, options);
            }
        };
        var parts$1 = Object.freeze({
            __proto__: null,
            default: parts,
            BBox,
            Cube,
            RoundedCube,
            Cylinder,
            Cone,
            Hexagon,
            Triangle,
            Tube,
            Anchor,
            Board,
            Hardware
        });
        var debug$3 = Debug("jscadUtils:boxes");
        function RabbetJoin(box, thickness, cutHeight) {
            depreciated("RabbetJoin", true, "Use 'Rabbet' instead");
            return rabbetJoin(box, thickness, cutHeight);
        }
        function topMiddleBottom(box, thickness) {
            debug$3("TopMiddleBottom", box, thickness);
            var bottom = box.bisect("z", thickness, {
                color: true
            });
            var top = bottom.parts.positive.bisect("z", -thickness);
            return Group("top,middle,bottom", [ top.parts.positive, top.parts.negative.color("green"), bottom.parts.negative ]);
        }
        function Rabett(box, thickness, gap, height, face) {
            var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
            debug$3("Rabett", "thickness", thickness, "gap", gap, "height", height, "face", face);
            gap = gap || .25;
            var inside = thickness - gap;
            var outside = -thickness + gap;
            options.color = true;
            var group = Group();
            debug$3("Rabbet top height:", height, "options:", options);
            var _box$bisect$parts = box.bisect("z", height, options).parts, top = _box$bisect$parts.positive, lower2_3rd = _box$bisect$parts.negative;
            debug$3("face", face, "height", height);
            var lowerBisectHeight = Math.sign(height) < 0 ? face * Math.sign(height) : height - face;
            debug$3("Rabbet bottom height:", lowerBisectHeight, "options:", options);
            var _lower2_3rd$bisect$pa = lower2_3rd.bisect("z", lowerBisectHeight, options).parts, middle = _lower2_3rd$bisect$pa.positive, bottom = _lower2_3rd$bisect$pa.negative;
            group.add(top.union(middle.color("yellow").subtract(middle.color("darkred").enlarge([ outside, outside, 0 ]))), "top");
            group.add(bottom.color("orange").union(middle.color("green").subtract(middle.color("red").enlarge([ inside, inside, 0 ]))), "bottom");
            return group;
        }
        var RabettTopBottom = function rabbetTMB(box, thickness) {
            var gap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : .25;
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            options = Object.assign({
                removableTop: true,
                removableBottom: true,
                topWidth: -thickness,
                bottomWidth: thickness
            }, options);
            debug$3("RabettTopBottom", box, thickness, gap, options);
            var group = Group("", {
                box
            });
            var inside = -thickness - gap;
            var outside = -thickness + gap;
            if (options.removableTop) {
                var top = box.bisect("z", options.topWidth, {
                    color: true
                });
                group.add(top.parts.positive.enlarge([ inside, inside, 0 ]), "top");
                if (!options.removableBottom) group.add(box.subtract(top.parts.positive.enlarge([ outside, outside, 0 ])), "bottom");
            }
            if (options.removableBottom) {
                var bottom = box.bisect("z", options.bottomWidth, {
                    color: true
                });
                group.add(bottom.parts.negative.enlarge([ outside, outside, 0 ]), "bottomCutout", true);
                group.add(bottom.parts.negative.enlarge([ inside, inside, 0 ]), "bottom");
                if (!options.removableTop) group.add(box.subtract(group.parts.bottomCutout), "top");
            }
            if (options.removableBottom && options.removableTop) {
                group.add(box.subtract(union([ bottom.parts.negative.enlarge([ outside, outside, 0 ]), top.parts.positive.enlarge([ outside, outside, 0 ]) ])), "middle");
            }
            return group;
        };
        var CutOut = function cutOut(o, h, box, plug, gap) {
            gap = gap || .25;
            var s = o.size();
            var cutout = o.intersect(box);
            var cs = o.size();
            var clear = Parts.Cube([ s.x, s.y, h ]).align(o, "xy").color("yellow");
            var top = clear.snap(o, "z", "center+").union(o);
            var back = Parts.Cube([ cs.x + 6, 2, cs.z + 2.5 ]).align(cutout, "x").snap(cutout, "z", "center+").snap(cutout, "y", "outside-");
            var clip = Parts.Cube([ cs.x + 2 - gap, 1 - gap, cs.z + 2.5 ]).align(cutout, "x").snap(cutout, "z", "center+").snap(cutout, "y", "outside-");
            return Group("insert", {
                top,
                bottom: clear.snap(o, "z", "center-").union(o),
                cutout: union([ o, top ]),
                back: back.subtract(plug).subtract(clip.enlarge(gap, gap, gap)).subtract(clear.translate([ 0, 5, 0 ])),
                clip: clip.subtract(plug).color("red"),
                insert: union([ o, top ]).intersect(box).subtract(o).enlarge([ -gap, 0, 0 ]).union(clip.subtract(plug).enlarge(-gap, -gap, 0)).color("blue")
            });
        };
        var Rectangle = function Rectangle(size, thickness, cb) {
            thickness = thickness || 2;
            var s = div(xyz2array(size), 2);
            var r = add(s, thickness);
            var box = CSG.cube({
                center: r,
                radius: r
            }).subtract(CSG.cube({
                center: r,
                radius: s
            }));
            if (cb) box = cb(box);
            return box;
        };
        var Hollow = function Hollow(object, thickness, interiorcb, exteriorcb) {
            thickness = thickness || 2;
            var size = -thickness * 2;
            interiorcb = interiorcb || identity;
            var box = object.subtract(interiorcb(object.enlarge([ size, size, size ])));
            if (exteriorcb) box = exteriorcb(box);
            return box;
        };
        var BBox$1 = function BBox(o) {
            depreciated("BBox", true, "Use 'parts.BBox' instead");
            var s = div(xyz2array(o.size()), 2);
            return CSG.cube({
                center: s,
                radius: s
            }).align(o, "xyz");
        };
        function getRadius(o) {
            return div(xyz2array(o.size()), 2);
        }
        function rabbetJoin(box, thickness) {
            var gap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : .25;
            var r = add(getRadius(box), -thickness / 2);
            r[2] = thickness / 2;
            var cutter = CSG.cube({
                center: r,
                radius: r
            }).align(box, "xy").color("green");
            var topCutter = cutter.snap(box, "z", "inside+");
            var group = Group("", {
                topCutter,
                bottomCutter: cutter
            });
            group.add(box.subtract(cutter.enlarge([ gap, gap, 0 ])).color("blue"), "top");
            group.add(box.subtract(topCutter.enlarge([ gap, gap, 0 ])).color("red"), "bottom");
            return group;
        }
        var Boxes = Object.freeze({
            __proto__: null,
            RabbetJoin,
            topMiddleBottom,
            Rabett,
            RabettTopBottom,
            CutOut,
            Rectangle,
            Hollow,
            BBox: BBox$1
        });
        var compatV1 = _objectSpread2(_objectSpread2({}, util), {}, {
            group: Group,
            init: init$1,
            triangle: triUtils,
            array,
            parts: parts$1,
            Boxes,
            Debug
        });
        exports.Boxes = Boxes;
        exports.Debug = Debug;
        exports.Group = Group;
        exports.array = array;
        exports.compatV1 = compatV1;
        exports.init = init$1;
        exports.parts = parts$1;
        exports.triUtils = triUtils;
        exports.util = util;
        return exports;
    }({}, jsCadCSG, scadApi);
    const debug = jscadUtils.Debug("jscadUtils:initJscadutils");
    util = jscadUtils.compatV1;
    util.init.default(CSG);
    debug("initJscadutils:jscadUtils", jscadUtils);
    Parts = jscadUtils.parts;
    Boxes = jscadUtils.Boxes;
    Group = jscadUtils.Group;
    Debug = jscadUtils.Debug;
    array = jscadUtils.array;
    triUtils = jscadUtils.triUtils;
    return jscadUtils;
}

var jscadUtilsPluginInit = [];

util = {
    init: (...a) => {
        initJscadutils(...a);
        jscadUtilsPluginInit.forEach(p => {
            p(...a);
        });
    }
};
// /dist/v1compat.js
var RaspberryPi;

function initJscadRPi() {
    var Debug = util.Debug;
    var debug = Debug("jscadRPi:initJscadRPi");
    var jsCadCSG = {
        CSG,
        CAG
    };
    var scadApi = {
        vector_text,
        rectangular_extrude,
        vector_char,
        primitives3d: {
            cube,
            sphere,
            cylinder
        },
        extrusions: {
            rectangular_extrude
        },
        text: {
            vector_text,
            vector_char
        },
        booleanOps: {
            union
        }
    };
    var jscadUtils = {
        util,
        Debug,
        parts: Parts,
        Group,
        array,
        triUtils
    };
    var jscadRPi = function(exports, jscadUtils, jsCadCSG, scadApi) {
        "use strict";
        function _interopDefaultLegacy(e) {
            return e && typeof e === "object" && "default" in e ? e : {
                default: e
            };
        }
        var jsCadCSG__default = _interopDefaultLegacy(jsCadCSG);
        var scadApi__default = _interopDefaultLegacy(scadApi);
        var CSG$1 = jsCadCSG__default["default"].CSG;
        var union = scadApi__default["default"].booleanOps.union;
        function RightSide(o, mb) {
            return o.translate(jscadUtils.array.add(o.calcSnap(mb, "z", "outside-"), o.calcSnap(mb, "x", "inside+"), o.calcSnap(mb, "y", "inside-"), [ 2, 0, 0 ]));
        }
        function LeftSide(o, mb) {
            return o.translate(calcLeftSide(o, mb));
        }
        function calcLeftSide(o, mb) {
            return jscadUtils.array.add(o.calcSnap(mb, "z", "outside-"), o.calcSnap(mb, "xy", "inside+"));
        }
        function BPlusMotherboard() {
            var corner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
            return jscadUtils.parts.Board(85, 56, corner, 1.32).color("green", .75);
        }
        function MountingHole(diameter, height) {
            var r = (diameter || 2.8) / 2;
            var h = (height || 4) / 2;
            return CSG.cylinder({
                start: [ 0, 0, -h ],
                end: [ 0, 0, h ],
                radius: r
            }).color("orange");
        }
        function Mountingpad(radius, height) {
            var r = (radius || 6.2) / 2;
            var h = (height || 1.5) / 2;
            return CSG.cylinder({
                start: [ 0, 0, -h ],
                end: [ 0, 0, h ],
                radius: r
            }).color("yellow");
        }
        function EthernetJack() {
            var r = jscadUtils.array.div([ 21.24, 15.88, 13.475 ], 2);
            return CSG.cube({
                center: [ 0, 0, 0 ],
                radius: r
            }).color("lightgray");
        }
        function UsbJack() {
            var jack = jscadUtils.Group("body", jscadUtils.parts.Cube([ 16.4, 13.36, 17 - 1.5 ]).color("lightgray"));
            jack.add(jscadUtils.parts.Cube([ .75, 15.3, 17.68 - 1.5 ]).align(jack.parts.body, "yz").snap(jack.parts.body, "x", "outside-").color("lightgray"), "flange");
            return jack;
        }
        function MicroUsb() {
            return jscadUtils.parts.Cube([ 7.59, 5.7, 2.64 ]).color("lightgray");
        }
        function Hdmi() {
            return jscadUtils.parts.Cube([ 15, 11.57, 7.4 ]).color("lightgray");
        }
        function AvJack() {
            var block = jscadUtils.parts.Cube([ 6.9, 12.47, 5.6 ]).color("lightgray");
            var cyl = jscadUtils.parts.Cylinder(6, 2).rotateX(90).align(block, "xz").snap(block, "y", "outside+").color("black");
            return jscadUtils.Group("block,cylinder", [ block, cyl ]);
        }
        function Ribbon() {
            return jscadUtils.parts.Cube([ 3, 22.4, 5.7 ]).color("gray");
        }
        function Gpio(mb) {
            var gpio = jscadUtils.parts.Cube([ 50.64, 5, 8.72 ]).color("gray");
            return mb ? gpio.snap(mb, "xy", "inside-").snap(mb, "z", "outside-").midlineTo("x", 32.5).midlineTo("y", 52.5) : gpio;
        }
        function BoardLed() {
            return jscadUtils.parts.Cube([ 1, 2, .7 ]);
        }
        var debug = jscadUtils.Debug("jscadRPi:BPlusMounting");
        function holes(mb) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            options = Object.assign(options, {
                height: 8
            });
            debug("holes", mb, options);
            var hole = MountingHole(options.diameter || 3.25, options.height).snap(mb, "xy", "inside-").align(mb, "z");
            var holes = [ hole.midlineTo("x", 3.5).midlineTo("y", 3.5), hole.midlineTo("x", 61.5).midlineTo("y", 3.5), hole.midlineTo("x", 3.5).midlineTo("y", 52.5), hole.midlineTo("x", 61.5).midlineTo("y", 52.5) ];
            return jscadUtils.Group("hole1,hole2,hole3,hole4", holes);
        }
        function pads(mb) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            options = Object.assign({
                snap: "outside-",
                height: 4
            }, options);
            var pad = Mountingpad(undefined, options.height).snap(mb, "z", options.snap).snap(mb, "xy", "inside-");
            var pads = [ pad.midlineTo("x", 3.5).midlineTo("y", 3.5), pad.midlineTo("x", 61.5).midlineTo("y", 3.5), pad.midlineTo("x", 3.5).midlineTo("y", 52.5), pad.midlineTo("x", 61.5).midlineTo("y", 52.5) ];
            return jscadUtils.Group("pad1,pad2,pad3,pad4", pads);
        }
        var BPlusMounting = {
            holes,
            pads
        };
        var debug$1 = jscadUtils.Debug("jscadRPi:BPlus");
        function BPlus() {
            var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
            var options = arguments.length > 1 ? arguments[1] : undefined;
            var _Object$assign = Object.assign({
                clearance: 5
            }, options), clearance = _Object$assign.clearance;
            model = !model ? 2 : model === true ? 3 : model;
            debug$1("BPlus model:", model);
            var mb = BPlusMotherboard(model == 4 ? 3 : 2);
            var group = jscadUtils.Group("mb", mb);
            if (model < 4) {
                group.add(RightSide(EthernetJack(), mb).midlineTo("y", 10.25), "ethernet");
                debug$1("mb", mb);
                var usb = UsbJack();
                var usbTranslation = jscadUtils.array.add(usb.parts.flange.calcSnap(mb, "x", "inside+"), [ 2, 0, 0 ], usb.parts.body.calcSnap(mb, "y", "inside-"), usb.parts.body.calcSnap(mb, "z", "outside-"));
                debug$1("usbTranslation", usbTranslation, jscadUtils.util.calcmidlineTo(usb.parts.body, "y", 29));
                group.add(usb.clone().translate(usbTranslation).translate(jscadUtils.util.calcmidlineTo(usb.parts.body, "y", 29)), "usb1", false, "usb1");
                group.add(usb.clone().translate(usbTranslation).translate(jscadUtils.util.calcmidlineTo(usb.parts.body, "y", 47)), "usb2", false, "usb2");
                group.add(MicroUsb().snap(mb, "z", "outside-").midlineTo("x", 10.6).translate([ 0, -2, 0 ]), "microusb");
                group.add(Hdmi().snap(mb, "z", "outside-").midlineTo("x", 32).translate([ 0, -2, 0 ]), "hdmi");
                group.add(AvJack().snap("block", mb, "z", "outside-").midlineTo("block", "x", 53.5), "avjack", false, "avjack");
                group.add(Ribbon().snap(mb, "z", "outside-").midlineTo("x", 45), "camera");
                group.add(Ribbon().snap(mb, "z", "outside-").midlineTo("x", 3.5).midlineTo("y", 28), "display");
                group.add(Gpio().snap(mb, "z", "outside-").midlineTo("x", 32.5).midlineTo("y", 52.5), "gpio");
                if (model == 3) {
                    group.add(BoardLed().snap(mb, "z", "outside-").midlineTo("x", 1.1).midlineTo("y", 7.9).color("lightgreen"), "activityled");
                    group.add(BoardLed().snap(mb, "z", "outside-").midlineTo("x", 1.1).midlineTo("y", 11.5).color("red"), "powerled");
                } else {
                    group.add(BoardLed().snap(mb, "z", "outside-").translate([ 1, 43.5, 0 ]).color("lightgreen"), "activityled");
                    group.add(BoardLed().snap(mb, "z", "outside-").translate([ 1, 46, 0 ]).color("red"), "powerled");
                }
            } else {
                group.add(RightSide(jscadUtils.parts.Cube([ 21.5, 16.5, 13.5 ]).color("lightgray"), mb).translate([ 2, 0, 0 ]).midlineTo("y", 45.75), "ethernet");
                group.add(jscadUtils.parts.Cube([ clearance, 16.5, 13.5 ]).align(group.parts.ethernet, "yz").snap(group.parts.ethernet, "x", "outside-").color("red"), "clearance-ethernet", true, "clearance");
                var usb = jscadUtils.Group();
                usb.add(jscadUtils.parts.Cube([ 17, 13.1, 15 ]).snap(group.parts.ethernet, "x", "inside+", -1).snap(mb, "z", "outside-", 1.5).color("lightgray"), "body");
                usb.add(jscadUtils.parts.Cube([ 1, 15, 16 ]).snap(usb.parts.body, "x", "outside-").align(usb.parts.body, "yz").color("lightgray"), "flange");
                group.add(usb.clone().translate(jscadUtils.util.calcmidlineTo(usb.parts.body, "y", 27)), "usb1", false, "usb1");
                group.add(jscadUtils.parts.Cube([ clearance, 15, 16 ]).align(group.parts.usb1, "yz").snap(group.parts.usb1, "x", "outside-").color("red"), "clearance-usb1", true);
                group.add(usb.clone().translate(jscadUtils.util.calcmidlineTo(usb.parts.body, "y", 9)), "usb2", false, "usb2");
                group.add(jscadUtils.parts.Cube([ clearance, 15, 16 ]).align(group.parts.usb2, "yz").snap(group.parts.usb2, "x", "outside-").color("red"), "clearance-usb2", true);
                group.add(jscadUtils.parts.Cube([ 10, 7.5, 3.2 ]).snap(usb.parts.body, "y", "inside-", -1).snap(mb, "z", "outside-").midlineTo("x", 3.5 + 7.7).color("lightgray"), "usbc");
                group.add(jscadUtils.parts.Cube([ 10, clearance, 3.2 ]).align(group.parts.usbc, "xz").snap(group.parts.usbc, "y", "outside+").color("red"), "clearance-usbc", true);
                group.add(jscadUtils.parts.Cube([ 7, 7.5, 3 ]).snap(usb.parts.body, "y", "inside-", -1).snap(mb, "z", "outside-").midlineTo("x", 3.5 + 7.7 + 14.8).color("lightgray"), "hdmi1");
                group.add(jscadUtils.parts.Cube([ 7, clearance, 3 ]).align(group.parts.hdmi1, "xz").snap(group.parts.hdmi1, "y", "outside+").color("red"), "clearance-hdmi1", true);
                group.add(jscadUtils.parts.Cube([ 7, 7.5, 3 ]).snap(usb.parts.body, "y", "inside-", -1).snap(mb, "z", "outside-").midlineTo("x", 3.5 + 7.7 + 14.8 + 13.5).color("lightgray"), "hdmi2");
                group.add(jscadUtils.parts.Cube([ 7, clearance, 3 ]).align(group.parts.hdmi2, "xz").snap(group.parts.hdmi2, "y", "outside+").color("red"), "clearance-hdmi2", true);
                group.add(AvJack().snap("block", mb, "z", "outside-").midlineTo("block", "x", 3.5 + 7.7 + 14.8 + 13.5 + 7 + 7.5), "avjack", false, "avjack");
                group.add(jscadUtils.parts.Cylinder(6, clearance).rotateX(90).align(group.parts.avjack, "xz").snap(group.parts.avjack, "y", "outside+").color("red"), "clearance-avjack", true);
                group.add(Ribbon().snap(mb, "z", "outside-").midlineTo("x", 3.5 + 7.7 + 14.8 + 13.5 + 7), "camera");
                group.add(Ribbon().snap(mb, "z", "outside-").midlineTo("x", 4).midlineTo("y", 24.5 + 3.5), "display");
                group.add(Gpio().snap(mb, "z", "outside-").midlineTo("x", 29 + 3.5).midlineTo("y", 56 - 3.5), "gpio");
                group.add(BoardLed().snap(mb, "z", "outside-").midlineTo("x", 1.1).midlineTo("y", 8).color("lightgreen"), "activityled");
                group.add(BoardLed().snap(mb, "z", "outside-").midlineTo("x", 1.1).midlineTo("y", 12).color("red"), "powerled");
            }
            group.add(jscadUtils.parts.Cube([ 15.2, 12, 1.5 ]).snap(mb, "z", "outside+").midlineTo("y", 28).translate([ -2.5, 0, 0 ]).color("silver"), "microsd");
            group.holes = holes(mb).array();
            group.add(group.holes[0], "hole1", true);
            group.add(group.holes[1], "hole2", true);
            group.add(group.holes[2], "hole3", true);
            group.add(group.holes[3], "hole4", true);
            return group;
        }
        function CameraModuleV1() {
            var t = 1.1;
            var height = {
                sensor: 5.9 - t,
                board: t
            };
            var g = jscadUtils.Group();
            g.add(jscadUtils.parts.Cube([ 24, 25, t ]).Center().color("green", .75), "board");
            function Hole(x, y) {
                return jscadUtils.parts.Cylinder(2.2, t).snap(g.parts.board, "xy", "inside-").midlineTo("x", x).midlineTo("y", y);
            }
            g.holes = [ Hole(2, 2).color("yellow"), Hole(2, 23), Hole(12.5 + 2, 2), Hole(12.5 + 2, 23) ];
            g.add(jscadUtils.Group("hole0,hole1,hole2,hole3", g.holes), "hole", false, "holes");
            var mounts = g.holes.reduce((function(m, h, i) {
                m["mount".concat(i)] = jscadUtils.parts.Cylinder(4, 2).align(h, "xy").snap(g.parts.board, "z", "outside-");
                return m;
            }), {});
            g.add(jscadUtils.Group(mounts), "mounts", true, "mounts");
            var pins = g.holes.reduce((function(m, h, i) {
                m["pin".concat(i)] = jscadUtils.parts.Cylinder(jscadUtils.util.nearest.under(1.5), height.board).align(h, "xy").align(g.parts.board, "z");
                return m;
            }), {});
            g.add(jscadUtils.Group(pins), "pins", true, "pins");
            g.add(jscadUtils.parts.Cube([ 8.5, 8.5, 2 ]).snap(g.parts.board, "xy", "inside-").snap(g.parts.board, "z", "outside-").midlineTo("x", 12.5 + 2).midlineTo("y", 8.5 + 4).color("black"), "sensor");
            g.add(jscadUtils.parts.Cube([ 8.5, 8.5, height.sensor - 2 ]).align(g.parts.sensor, "xy").snap(g.parts.sensor, "z", "outside-").color("gray"), "lense");
            g.add(jscadUtils.parts.Cube([ 7.56, 10, 2.65 - t ]).snap(g.parts.board, "z", "outside-").align(g.parts.lense, "y", "inside-").snap(g.parts.lense, "x", "outside+", -1).color("gray"), "lenseribbon");
            g.add(jscadUtils.parts.Cube([ 5.5, 17, 3 ]).snap(g.parts.board, "x", "inside+").snap(g.parts.board, "y", "inside-").snap(g.parts.board, "z", "outside+").midlineTo("y", 12.5), "ribbon");
            g.add(jscadUtils.parts.RoundedCube(24 - 5.5, 25, 2.5 - t, 2).snap(g.parts.board, "xy", "inside-").snap(g.parts.board, "z", "outside+").subtract(g.holes.map((function(hole) {
                return hole.enlarge(3, 3, 5);
            }))).color("red"), "bottom-nogo");
            g.add(g.parts.ribbon.enlarge(2, -1, -1).snap(g.parts.ribbon, "x", "outside-").color("red"), "ribbon-nogo");
            return g;
        }
        function CameraModuleV1$1() {
            var t = 1.1;
            var height = {
                sensor: 4 - t,
                board: t
            };
            var g = jscadUtils.Group();
            g.add(jscadUtils.parts.RoundedCube(23.862, 25, t, 2).Center().color("green", .75), "board");
            function Hole(x, y) {
                return jscadUtils.parts.Cylinder(2.2, t).snap(g.parts.board, "xy", "inside-").midlineTo("x", x).midlineTo("y", y);
            }
            g.holes = [ Hole(2, 2).color("yellow"), Hole(2, 23), Hole(14.5, 2), Hole(14.5, 23) ];
            g.add(jscadUtils.Group("hole0,hole1,hole2,hole3", g.holes), "hole", false, "holes");
            var mounts = g.holes.reduce((function(m, h, i) {
                m["mount".concat(i)] = jscadUtils.parts.Cylinder(4, height.sensor).align(h, "xy").snap(g.parts.board, "z", "outside-");
                return m;
            }), {});
            g.add(jscadUtils.Group(mounts), "mounts", true, "mounts");
            var pins = g.holes.reduce((function(m, h, i) {
                m["pin".concat(i)] = jscadUtils.parts.Cylinder(jscadUtils.util.nearest.under(1.5), height.board).align(h, "xy").align(g.parts.board, "z");
                return m;
            }), {});
            g.add(jscadUtils.Group(pins), "pins", true, "pins");
            g.add(jscadUtils.parts.Cube([ 8.5, 8.5, height.sensor ]).snap(g.parts.board, "xy", "inside-").snap(g.parts.board, "z", "outside-").midlineTo("x", 14.5).midlineTo("y", 12.5).color("black"), "sensor");
            g.add(jscadUtils.parts.Cylinder(7.3, 1.6).align(g.parts.sensor, "xy").snap(g.parts.sensor, "z", "outside-").color("gray"), "lense");
            g.add(jscadUtils.parts.Cube([ 4, 9, 2.65 - t ]).snap(g.parts.board, "xy", "inside-").snap(g.parts.board, "z", "outside-").midlineTo("x", 4.7).midlineTo("y", 13.8).stretch("x", 4).color("gray"), "lenseribbon");
            g.add(jscadUtils.parts.Cube([ 5.5, 20.8, 3.55 - t ]).snap(g.parts.board, "x", "inside+").snap(g.parts.board, "y", "inside-").snap(g.parts.board, "z", "outside+").midlineTo("y", 12.5), "ribbon");
            g.add(jscadUtils.parts.RoundedCube(23.862 - 5.5, 25, 2.5 - t, 2).snap(g.parts.board, "xy", "inside-").snap(g.parts.board, "z", "outside+").subtract(g.holes.map((function(hole) {
                return hole.enlarge(3, 3, 5);
            }))).color("red"), "bottom-nogo");
            g.add(g.parts.ribbon.enlarge(2, -1, -1).snap(g.parts.ribbon, "x", "outside-").color("red"), "ribbon-nogo");
            return g;
        }
        var union$1 = scadApi.booleanOps.union;
        function Hat(pi) {
            var hat = jscadUtils.Group();
            hat.add(jscadUtils.parts.Board(65.02, 56.39, 3.56, 1.62).color("darkgreen", .75), "mb");
            var hole = MountingHole().snap(hat.parts.mb, "xy", "inside-");
            var holes = union$1(hole.midlineTo("x", 3.56).midlineTo("y", 3.56), hole.midlineTo("x", 61.47).midlineTo("y", 3.56), hole.midlineTo("x", 3.56).midlineTo("y", 52.46), hole.midlineTo("x", 61.47).midlineTo("y", 52.46));
            hat.add(Gpio(hat.parts.mb).snap(hat.parts.mb, "z", "outside+"), "gpio");
            hat.holes = holes;
            if (pi) {
                hat.translate(hat.parts.mb.calcSnap(pi, "xy", "inside-")).translate(hat.parts.gpio.calcSnap(pi, "z", "outside-"));
            }
            return hat;
        }
        function HatStandoff() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            options = Object.assign({
                height: 10
            }, options);
            var standoff = Mountingpad(null, options.height);
            var peg = MountingHole(null, options.height + 3);
            return standoff.union(peg);
        }
        function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }
        function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }
        function _iterableToArray(iter) {
            if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
            return arr2;
        }
        function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function HQCameraModule() {
            var _camera$holes;
            var t = 1.1;
            var camera = jscadUtils.Group();
            camera.add(jscadUtils.parts.RoundedCube(38, 38, t, 1.4).Center().color("green", .75), "board");
            var hole = jscadUtils.parts.Cylinder(3.25, 10).snap(camera.parts.board, "xy", "inside+", 1.25).translate([ -4, -4, -5 ]).color("red");
            camera.add(hole, "hole1", true);
            camera.add(hole.rotateZ(90), "hole2", true);
            camera.add(hole.rotateZ(180), "hole3", true);
            camera.add(hole.rotateZ(-90), "hole4", true);
            (_camera$holes = camera.holes).push.apply(_camera$holes, _toConsumableArray(camera.array("hole1,hole2,hole3,hole4")));
            var sensor = jscadUtils.parts.Cube([ 8.5, 8.5, 1 ]).snap(camera.parts.board, "z", "outside-").align(camera.parts.board, "xy").color("white");
            camera.add(sensor, "sensor");
            var mount = jscadUtils.parts.Cylinder(36, 10.2).snap(camera.parts.board, "z", "outside-").align(camera.parts.board, "xy").color("black");
            var mountInside = jscadUtils.parts.Cylinder(30.75, 10.2).snap(camera.parts.board, "z", "outside-").align(camera.parts.board, "xy").color("black");
            camera.add(mount.subtract(mountInside), "mount");
            camera.add(mount, "mount-clearance", true);
            var tripodMount = jscadUtils.parts.Cube([ 13.97, 12, 11 ]).snap(mount, "z", "inside+").snap(camera.parts.board, "y", "outside+").align(mount, "x").color("gray");
            camera.add(tripodMount.union(jscadUtils.parts.Cube([ 24.5, 10, 7.62 ]).snap(mount, "z", "inside+").snap(tripodMount, "y", "outside-").align(mount, "x").color("darkgray").subtract(mountInside)), "tripodMount");
            camera.add(jscadUtils.parts.Cube([ 20.8, 5.5, 3.55 - t ]).snap(camera.parts.board, "y", "inside-").snap(camera.parts.board, "z", "outside+").align(camera.parts.board, "x"), "ribbon");
            camera.add(camera.parts.ribbon.enlarge(2, 4, -1).snap(camera.parts.ribbon, "y", "outside+").color("red"), "ribbon-nogo");
            return camera;
        }
        function boardButton(name, board, midline) {
            var g = jscadUtils.Group(name);
            g.add(jscadUtils.parts.Cube([ 6.5, 6.5, 2 ]).color("silver").snap(board, "xy", "inside-").snap(board, "z", "outside-").midlineTo("y", midline), "base");
            g.add(jscadUtils.parts.Cylinder(3, 1).color("black").align(g.parts.base, "xy").snap(g.parts.base, "z", "outside-"), "push");
            return g;
        }
        function buttonCap(name, button) {
            var g = jscadUtils.Group(name);
            g.add(jscadUtils.parts.Cylinder(4, 3).fillet(1, "z+").union(jscadUtils.parts.Cylinder(6, .5).bisect("x", -.5).parts.negative).color("blue").align(button, "xy").snap(button, "z", "outside-"), "cap");
            g.add(jscadUtils.parts.Cylinder(7, .75).bisect("x", -.5).parts.negative.color("green").union(jscadUtils.parts.Cylinder(4.5, 2).color("yellow").translate([ 0, 0, 0 ])).align(g.parts.cap, "xy").snap(g.parts.cap, "z", "inside-"), "clearance", true);
            return g;
        }
        function miniPiTFT() {
            var g = jscadUtils.Group("miniPiTFT");
            var board = jscadUtils.parts.RoundedCube(jscadUtils.util.inch(2), jscadUtils.util.inch(1), 2, 2).bisect("x", jscadUtils.util.inch(1.5)).parts.negative.bisect("y", -jscadUtils.util.inch(.96)).parts.negative.color("darkgreen");
            g.add(board, "board");
            g.add(jscadUtils.parts.Cube([ 31, 18, 2 ]).color("white").snap(board, "x", "inside+").snap(board, "y", "inside-").snap(board, "z", "outside-"), "screen");
            g.add(jscadUtils.parts.Cube([ jscadUtils.util.inch(.98), jscadUtils.util.inch(.58), 2.01 ]).color("black").snap(board, "x", "inside-", jscadUtils.util.inch(.34)).snap(board, "y", "inside+", -jscadUtils.util.inch(.32)).snap(board, "z", "outside-"), "display");
            g.add(g.parts.display.stretch("z", 5).chamfer(-5, "z+").align(g.parts.display, "xy").color("red"), "display-clearance", true);
            g.add(boardButton("button1", board, jscadUtils.util.inch(.53)), "button1", false, "button1-");
            g.add(boardButton("button2", board, jscadUtils.util.inch(.18)), "button2", false, "button2-");
            g.add(buttonCap("buttonCap1", g.parts.button1), "buttonCap1", true, "buttonCap1-");
            g.add(buttonCap("buttonCap2", g.parts.button2), "buttonCap2", true, "buttonCap2-");
            g.add(jscadUtils.parts.Cube([ 1, 5, .5 ]).color("blue").align(g.parts.buttonCap1, "x").snap(g.parts.buttonCap1, "y", "outside+", 1).snap(g.parts.buttonCap1, "z", "inside-"), "button-connector", true);
            g.add(g.parts["button-connector"].enlarge(.5, .5, .5).color("red"), "button-connector-clearance", true);
            g.add(jscadUtils.parts.Tube(7, 3, 7.5).snap(board, "x", "inside-").snap(board, "y", "inside+").snap(board, "z", "outside+").color("yellow"), "standoff", true);
            return g;
        }
        function PiTFT22() {
            var hat = Hat();
            var mb = hat.parts.mb;
            var gpio = hat.parts.gpio;
            var group = jscadUtils.Group();
            group.holes = hat.holes;
            group.add(mb, "mb");
            group.add(gpio, "gpio");
            group.add(jscadUtils.parts.Cube([ 45.97, 34.8, 4 ]).color("black").snap(mb, "z", "outside-").midlineTo("x", 33.4).midlineTo("y", 27.18), "lcd");
            group.add(jscadUtils.parts.Cube([ 55, 40, 3.5 ]).snap(mb, "z", "outside-").translate([ 8, 6, 0 ]).color("white"), "lcdbevel");
            var buttonBase = jscadUtils.parts.Cube([ 7, 6, 2.5 ]).color("gray");
            var button = buttonBase.union(jscadUtils.parts.Cylinder(3.1, 1.2).color("black").snap(buttonBase, "z", "outside-").align(buttonBase, "xy")).snap(mb, "z", "outside-");
            var buttons = [ button.midlineTo("x", 13.97), button.midlineTo("x", 13.97 + 12.7), button.midlineTo("x", 13.97 + 12.7 + 12.7), button.midlineTo("x", 13.97 + 12.7 + 12.7 + 12.7) ];
            group.add(buttons[0], "button1");
            group.add(buttons[1], "button2");
            group.add(buttons[2], "button3");
            group.add(buttons[3], "button4");
            return group;
        }
        var union$2 = scadApi.booleanOps.union;
        var debug$2 = jscadUtils.Debug("jscadRPi:PiTFT24");
        function PiTFT24() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var pi = arguments.length > 1 ? arguments[1] : undefined;
            var hiddenPart = true;
            options = Object.assign(options, {
                buttonCapHeight: 4,
                capBaseHeight: 1,
                buttonWireYOffset: 5,
                clearance: .9
            });
            debug$2("PiTFT24", options);
            var hat = Hat(pi);
            var mb = hat.parts.mb;
            var group = jscadUtils.Group();
            group.add(hat.parts.mb, "mb");
            group.add(hat.parts.gpio, "gpio");
            group.holes = hat.holes;
            var sink = 0;
            var lcd = jscadUtils.parts.Cube([ 50, 40, 3.72 ]).color("black");
            group.add(lcd.translate(lcd.calcSnap(mb, "xy", "inside-")).translate(lcd.calcSnap(mb, "z", "outside-")).translate([ 7, 0, 0 ]).translate(lcd.calcmidlineTo("y", 28.32)), "lcd");
            var lcdbevel = jscadUtils.parts.Cube([ 60, 42, 5.3 - 1.62 - sink ]).color("white");
            group.add(lcdbevel.translate(lcdbevel.calcSnap(mb, "xy", "inside-")).translate(lcdbevel.calcSnap(mb, "z", "outside-")).translate([ 4.5, 7, 0 ]), "lcdbevel");
            var buttonBase = jscadUtils.parts.Cube([ 6.1, 3.5, 3.55 ]).color("beige").snap(mb, "z", "outside-").snap(mb, "xy", "inside-").midlineTo("y", 2.5);
            var button = buttonBase.union(jscadUtils.parts.Cube([ 3, 1.5, .5 ]).color("white").snap(buttonBase, "z", "outside-").align(buttonBase, "xy"));
            var buttons = [ 12.39, 12.39 + 10, 12.39 + 20, 12.39 + 30, 12.39 + 40 ].map((function(midpoint) {
                return button.midlineTo("x", midpoint);
            }));
            group.add(jscadUtils.Group("1,2,3,4,5", buttons), "buttons", false, "button");
            var capBaseHeight = options.capBaseHeight;
            var buttonCapBase = jscadUtils.parts.Cube([ 6.6, 4, capBaseHeight ]).color("blue");
            var buttonCapTop = jscadUtils.parts.Cube([ 6.1, 3.5, options.buttonCapHeight - capBaseHeight ]).snap(buttonCapBase, "z", "outside-").align(buttonCapBase, "xy").fillet(1, "z+").color("deepskyblue");
            var buttonCaps = buttons.map((function(button) {
                return union$2([ buttonCapBase, buttonCapTop ]).snap(button, "z", "outside-").align(button, "xy");
            }));
            group.add(union$2(buttonCaps), "buttonCaps", hiddenPart);
            group.add(union$2(buttonCaps.map((function(button) {
                return union$2([ buttonCapBase.align(button, "xy").snap(button, "z", "inside-").enlarge([ options.clearance, options.clearance, 1 ]), jscadUtils.parts.Cube([ 6.1, 3.5, options.buttonCapHeight - capBaseHeight ]).align(button, "xy").snap(button, "z", "inside-").enlarge([ options.clearance, options.clearance, 1 ]) ]);
            }))), "buttonCapClearance", hiddenPart);
            var bwthickness = options.capBaseHeight;
            var connector = LeftSide(jscadUtils.parts.Cube([ bwthickness, options.buttonWireYOffset, bwthickness ]), mb).snap(buttonCaps[0], "z", "inside-").snap(buttonCaps[0], "y", "outside+").color("blue");
            var buttonWire = jscadUtils.parts.Cube([ 40, bwthickness, bwthickness ]).snap(buttonCaps[0], "x", "center-").snap(buttonCaps[0], "z", "inside-").snap(connector, "y", "inside-").color("blue");
            group.add(union$2(buttonWire), "buttonWire", hiddenPart);
            var buttonWireConnector = buttonCaps.map((function(buttonCap) {
                return connector.align(buttonCap, "x");
            }));
            group.add(union$2(buttonWireConnector), "buttonWireConnector", hiddenPart);
            var buttonWireClearance = union$2(buttonWireConnector.map((function(connector) {
                return connector.enlarge([ options.clearance, options.clearance, options.buttonCapHeight ]);
            }))).union(buttonWire.enlarge([ options.clearance, options.clearance, options.buttonCapHeight ])).snap(buttonWire, "z", "inside+").color("red");
            group.add(buttonWireClearance, "buttonWireClearance", hiddenPart);
            group.add(jscadUtils.parts.Cube([ 15, 33, 7 ]).snap(mb, "x", "inside-").snap(mb, "z", "outside+").align(mb, "y").color("red"), "gpio2", hiddenPart);
            return group;
        }
        var debug$3 = jscadUtils.Debug("jscadRPi:Spacer");
        function Spacer() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var mb = arguments.length > 1 ? arguments[1] : undefined;
            mb = mb || BPlus().parts.mb;
            options = Object.assign({
                height: 11,
                thickness: 1,
                snap: "outside-",
                gpio: true,
                offset: 2,
                gussetOutside: [ 45, 45 ],
                gussetInside: [ 40, 40 ],
                postOnly: false
            }, options);
            var spacer = BPlusMounting.pads(mb, {
                height: options.height,
                snap: options.snap
            });
            var spacers = spacer.combine();
            if (options.postOnly) return spacers.color("yellow");
            if (!options.hollow) {
                var p1 = spacer.parts.pad1.centroid();
                var p2 = spacer.parts.pad4.centroid();
                var tri = jscadUtils.triUtils.solve(p1, p2);
                var dy = Math.sin(jscadUtils.triUtils.toRadians(tri.a)) * 3.5 - 3.5;
                var dx = 3.5 - Math.cos(jscadUtils.triUtils.toRadians(tri.b + 45)) * 3.5;
                var x = jscadUtils.parts.Board(tri.C + 5.5, 6.2, 3.1, options.thickness).rotateZ(tri.b).translate([ dx, dy, 0 ]).snap(spacer.parts.pad1, "z", "inside+");
                var cross = x.union(x.mirroredY().translate([ 0, 56, 0 ])).snap(spacer.parts.pad1, "xy", "inside-").color("red");
            }
            var gussetInterior = jscadUtils.parts.Board(options.gussetInside[0], options.gussetInside[1], 3, options.thickness).align(spacers, "xy");
            var gusset = jscadUtils.parts.Board(options.gussetOutside[0], options.gussetOutside[1], 3, options.thickness).align(spacers, "xy").subtract(gussetInterior).snap(spacer.parts.pad1, "z", "inside+");
            var gpio = Gpio(mb);
            var assembly = spacers.union(gusset.unionIf(cross, !options.hollow).translate([ 0, 0, -options.offset ])).subtractIf(gpio.enlarge([ 1, 1, 0 ]), options.gpio);
            return assembly.color("yellow");
        }
        exports.BPlus = BPlus;
        exports.CameraModuleV1 = CameraModuleV1;
        exports.CameraModuleV2 = CameraModuleV1$1;
        exports.HQCameraModule = HQCameraModule;
        exports.Hat = Hat;
        exports.HatStandoff = HatStandoff;
        exports.MiniPiTFT = miniPiTFT;
        exports.PiTFT22 = PiTFT22;
        exports.PiTFT24 = PiTFT24;
        exports.Spacer = Spacer;
        return exports;
    }({}, jscadUtils, jsCadCSG, scadApi);
    debug("jscadRPi", jscadRPi);
    RaspberryPi = jscadRPi;
}

jscadUtilsPluginInit.push(initJscadRPi);
// endinject

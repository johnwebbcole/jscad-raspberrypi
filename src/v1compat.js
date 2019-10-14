/* eslint-disable */
var RaspberryPi;
function initJscadRPi() {
  var Debug = util.Debug;
  var debug = Debug('jscadRPi:initJscadRPi');
  var jsCadCSG = { CSG, CAG };
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
  // include:compat
  // end:compat

  debug('jscadRPi', jscadRPi);
  RaspberryPi = jscadRPi;
}

/**
 * Add `initJscadGears` to the init queue for `util.init`.
 */
jscadUtilsPluginInit.push(initJscadRPi);
/* eslint-enable */

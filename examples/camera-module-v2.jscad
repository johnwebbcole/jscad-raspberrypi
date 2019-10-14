function main() {
  util.init(CSG);

  var camera = RaspberryPi.CameraModuleV2();

  return camera.combine();
}

// include:js
// endinject

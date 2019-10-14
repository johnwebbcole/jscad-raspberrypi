function main() {
  util.init(CSG);

  var camera = RaspberryPi.CameraModuleV1();

  return camera.combine();
}

// include:js
// endinject

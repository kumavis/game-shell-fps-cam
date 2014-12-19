var glm = require('gl-matrix');
var vec3 = glm.vec3;
var quat = glm.quat;

var createBasicCamera = require('basic-camera');

var scratch_v3_0 = vec3.create();
var scratch_v3_1 = vec3.create();
var y_axis = vec3.fromValues(0, 1, 0);

var enableFlight;

var attachCamera = function(shell, opts) {
  var camera = createBasicCamera();

  opts = opts || {};
  enableFlight = opts.enableFlight !== undefined ? opts.enableFlight : true;

  shell.bind('move-left', 'left', 'A');
  shell.bind('move-right', 'right', 'D');
  shell.bind('move-forward', 'up', 'W');
  shell.bind('move-back', 'down', 'S');
  shell.bind('move-up', 'space');
  shell.bind('move-down', 'shift');

  var max_dpitch = Math.PI / 2;
  var max_dyaw = Math.PI / 2;
  var scale = 0.0002;
  var speed = 1.0;
  var cameraVector = vec3.create();

  var translateOnFloor = function(cameraVector, distance) {
    vec3.set(scratch_v3_0, cameraVector[0], 0, cameraVector[2]);
    vec3.normalize(scratch_v3_0, scratch_v3_0);
    vec3.scaleAndAdd(camera.position, camera.position, scratch_v3_0, distance);
  };

  shell.on('tick', function() {
    if (!shell.pointerLock) {
      return;
    }

    // movement relative to camera
    camera.getCameraVector(cameraVector);
    if (shell.wasDown('move-forward')) {
      translateOnFloor(cameraVector, speed)
    }
    if (shell.wasDown('move-back')) {
      translateOnFloor(cameraVector, -speed)
    }
    if (shell.wasDown('move-right')) {
      vec3.cross(scratch_v3_1, cameraVector, y_axis);
      translateOnFloor(scratch_v3_1, speed)
    }
    if (shell.wasDown('move-left')) {
      vec3.cross(scratch_v3_1, cameraVector, y_axis);
      translateOnFloor(scratch_v3_1, -speed)
    }

    // fly straight up or down
    if (enableFlight) {
      if (shell.wasDown('move-up')) {
        camera.position[1] -= 1;
      }
      if (shell.wasDown('move-down')) {
        camera.position[1] += 1;
      }
    }


    // mouselook
    var dx = shell.mouseX - shell.prevMouseX;
    var dy = shell.mouseY - shell.prevMouseY;
    var dt = shell.frameTime;

    var dpitch = dy / dt * scale;
    var dyaw = dx / dt * scale;

    if (dpitch > max_dpitch) dpitch = max_dpitch;
    if (dpitch < -max_dpitch) dpitch = -max_dpitch;
    if (dyaw > max_dyaw) dyaw = max_dyaw;
    if (dyaw < -max_dyaw) dyaw = -max_dyaw;


    camera.rotateX(dpitch);
    camera.rotateY(dyaw);
  });

  return camera;
};

module.exports = attachCamera;


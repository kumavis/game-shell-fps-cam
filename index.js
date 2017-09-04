"use strict"
var glm = require("gl-matrix")
var vec3 = glm.vec3
var mat3 = glm.mat3
var mat4 = glm.mat4
var quat = glm.quat

var createOrbitCamera = require("orbit-camera")
var createOrbitCamera = require("basic-camera")

function attachCamera(shell) {
  var camera = createOrbitCamera()
  var scratch0 = new Float32Array(16)
  var scratch1 = new Float32Array(16)

  camera.lookAt = function(){

    proto.lookAt = function(eye, center, up) {
      mat4.lookAt(scratch0, eye, center, up)
      mat3.fromMat4(scratch0, scratch0)
      quat.fromMat3(scratch1, scratch0)
      this.rotateX(scratch1[])
      // vec3.copy(this.center, center)
      // this.distance = vec3.distance(eye, center)
    }


  shell.bind("move-left", "left", "A")
  shell.bind("move-right", "right", "D")
  shell.bind("move-up", "up", "W")
  shell.bind("move-down", "down", "S")

  shell.on("tick", function() {
    var ctrl   = shell.down("control")
    var alt    = shell.down("shift")
    var left   = shell.down("mouse-left")
    var right  = shell.down("mouse-right")
    var middle = shell.down("mouse-middle")

    var moveLeft   = shell.down("move-left")
    var moveRight  = shell.down("move-right")
    var moveUp = shell.down("move-up")
    var moveDown = shell.down("move-down")



    if (moveRight) { camera.pan([-0.01,0]) }
    if (moveLeft) { camera.pan([0.01,0]) }
    if (moveUp) { camera.pan([0,0.01]) }
    if (moveDown) { camera.pan([0,-0.01]) }


    // if(left && !ctrl && !alt) {
      // camera.rotate([shell.mouseX/shell.width-0.5, shell.mouseY/shell.height-0.5],
      //               [shell.prevMouseX/shell.width-0.5, shell.prevMouseY/shell.height-0.5])
    // camera.rotateY((shell.mouseX-shell.prevMouseX)*0.01)
                   
    // }
    // if(right || (left && ctrl && !alt)) {
    //   camera.pan([(shell.mouseX - shell.prevMouseX)/shell.width,
    //               (shell.mouseY - shell.prevMouseY)/shell.height])
    // }
    // if(shell.scroll[1]) {
    //   camera.distance *= Math.exp(shell.scroll[1] / shell.height)
    // }
    // if(middle || (left && !ctrl && alt)) {
    //   var d = shell.mouseY - shell.prevMouseY
    //   if(d) {
    //     camera.distance *= Math.exp(d / shell.height)
    //   }
    // }
  })
  
  return camera
}

module.exports = attachCamera

// 'use strict'

// var createOrbitCamera = require('orbit-camera')

// module.exports = attachCamera


// function attachCamera(shell) {
//   shell.bind('move-left', 'left', 'A')
//   shell.bind('move-right', 'right', 'D')
//   shell.bind('move-up', 'up', 'W')
//   shell.bind('move-down', 'down', 'S')

//   var camera = createOrbitCamera()
//   shell.on('tick', function() {
//     var ctrl   = shell.wasDown('control')
//     var alt    = shell.wasDown('shift')
//     var middle = shell.wasDown('mouse-middle')
//     var left   = shell.wasDown('move-left')
//     var right  = shell.wasDown('move-right')
//     var up     = shell.wasDown('move-up')
//     var down   = shell.wasDown('move-down')

//     if(right) {
//       console.log('hayy')
//       camera.pan([(shell.mouseX - shell.prevMouseX)/shell.width,
//                   (shell.mouseY - shell.prevMouseY)/shell.height])
//     }
    
//     if(left && !ctrl && !alt) {
//       camera.rotate([shell.mouseX/shell.width-0.5, shell.mouseY/shell.height-0.5],
//                     [shell.prevMouseX/shell.width-0.5, shell.prevMouseY/shell.height-0.5])
//     }
//     if(right || (left && ctrl && !alt)) {
//       camera.pan([(shell.mouseX - shell.prevMouseX)/shell.width,
//                   (shell.mouseY - shell.prevMouseY)/shell.height])
//     }
//     if(shell.scroll[1]) {
//       camera.distance *= Math.exp(shell.scroll[1] / shell.height)
//     }

//     if(middle || (left && !ctrl && alt)) {
//       var d = shell.mouseY - shell.prevMouseY
//       if(d) {
//         camera.distance *= Math.exp(d / shell.height)
//       }
//     }

//   })
  
//   return camera
// }


// var glm = require('gl-matrix')
// var vec3 = glm.vec3
// var quat = glm.quat
// var createBasicCamera = require('basic-camera')

// module.exports = attachCamera


// var scratch_v3_0 = vec3.create()
// var scratch_v3_1 = vec3.create()
// var y_axis = vec3.fromValues(0, 1, 0)

// var enableFlight


// function attachCamera(shell, opts) {
//   var camera = createBasicCamera()

//   opts = opts || {}
//   enableFlight = opts.enableFlight !== undefined ? opts.enableFlight : true

//   shell.bind('move-left', 'left', 'A')
//   shell.bind('move-right', 'right', 'D')
//   shell.bind('move-forward', 'up', 'W')
//   shell.bind('move-back', 'down', 'S')
//   shell.bind('move-up', 'space')
//   shell.bind('move-down', 'shift')

//   var max_dpitch = Math.PI / 2
//   var max_dyaw = Math.PI / 2
//   var scale = 0.0002
//   var speed = 1.0
//   var cameraVector = vec3.create()

//   var translateOnFloor = function(cameraVector, distance) {
//     vec3.set(scratch_v3_0, cameraVector[0], 0, cameraVector[2])
//     vec3.normalize(scratch_v3_0, scratch_v3_0)
//     vec3.scaleAndAdd(camera.position, camera.position, scratch_v3_0, distance)
//   }

//   shell.on('tick', function() {
//     if (!shell.pointerLock) {
//       return
//     }

//     // movement relative to camera
//     camera.getCameraVector(cameraVector)
//     if (shell.wasDown('move-forward')) {
//       translateOnFloor(cameraVector, speed)
//     }
//     if (shell.wasDown('move-back')) {
//       translateOnFloor(cameraVector, -speed)
//     }
//     if (shell.wasDown('move-right')) {
//       vec3.cross(scratch_v3_1, cameraVector, y_axis)
//       translateOnFloor(scratch_v3_1, speed)
//     }
//     if (shell.wasDown('move-left')) {
//       vec3.cross(scratch_v3_1, cameraVector, y_axis)
//       translateOnFloor(scratch_v3_1, -speed)
//     }

//     // fly straight up or down
//     if (enableFlight) {
//       if (shell.wasDown('move-up')) {
//         camera.position[1] -= 1
//       }
//       if (shell.wasDown('move-down')) {
//         camera.position[1] += 1
//       }
//     }


//     // mouselook
//     var dx = shell.mouseX - shell.prevMouseX
//     var dy = shell.mouseY - shell.prevMouseY
//     var dt = shell.frameTime

//     var dpitch = dy / dt * scale
//     var dyaw = dx / dt * scale

//     if (dpitch > max_dpitch) dpitch = max_dpitch
//     if (dpitch < -max_dpitch) dpitch = -max_dpitch
//     if (dyaw > max_dyaw) dyaw = max_dyaw
//     if (dyaw < -max_dyaw) dyaw = -max_dyaw


//     camera.rotateX(dpitch)
//     camera.rotateY(dyaw)
//   })

//   return camera
// }



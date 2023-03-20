import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {ARButton} from 'three/addons/webxr/ARButton.js';
import {TrackballControls} from 'three/addons/controls/TrackballControls.js';

let scene, renderer, camera, canvas;
let objects = []

const init = () => 
{
  canvas = document.querySelector('#c')
  renderer = new THREE.WebGLRenderer({antialias: true, canvas, alpha: true})
  //create scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color('black')
  //add camera
  camera = new THREE.PerspectiveCamera(45, 2, 0.1, 5)
  camera.position.set(0, 0, 2)
  scene.add(camera)

  //add light
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(0, 2, 4)
  scene.add(light)
  
  //display objects when click wih the mouse
  canvas.addEventListener('click', makeMesh)
}

const rand = (a,b) => {
  return Math.random() * (b-a) + a
}

const makeMesh = () => 
{
  const geometry = new THREE.BoxGeometry(0.1)
  const material = new THREE.MeshPhongMaterial({color: 'yellow'})
  const object = new THREE.Mesh(geometry, material)
  object.position.set(rand(0,0.9), rand(0,0.9), rand(0,0.9))
  scene.add(object)
  object.timer = 1
  objects.push(object)
}

let then = 0
function render(time) {
  time *= 0.001;
  const deltaTime = time - then;
  then = time;
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  objects.forEach(object => {
    object.timer -= deltaTime
    console.log(object.timer)
    if (object.timer < 0) {
      scene.remove(object)
      objects.shift();
      // objects.remove(object)
    }
  });
  
  renderer.render(scene, camera)
 
  requestAnimationFrame(render);
}


function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

init();
requestAnimationFrame(render);


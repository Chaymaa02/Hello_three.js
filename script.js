import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {ARButton} from 'three/addons/webxr/ARButton.js';
import {TrackballControls} from 'three/addons/controls/TrackballControls.js';



const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas, alpha: true});

const makescene = (object, elem) => 
{
  const scene = new THREE.Scene()
  //add camera
  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 5)
  camera.position.set(0, 0, 2)
  scene.add(camera)
  //add object
  scene.add(object)
  //add light
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(0, 2, 4)
  scene.add(light)
  //add constrols
  const controls = new TrackballControls(camera, renderer.domElement);
  controls.noZoom = true;
  controls.noPan = true;

  return {scene, camera, object, elem, controls}
}


  const geometry1 = new THREE.BoxGeometry(1)
  const material = new THREE.MeshPhongMaterial({color: 0x1155ff})
  const object1 = new THREE.Mesh(geometry1, material)

  const geometry2 = new THREE.SphereGeometry(0.8, 4, 2)
  const object2 = new THREE.Mesh(geometry2, material)

  const sceneInfo1 = makescene(object1, document.querySelector('#box'))
  const sceneInfo2 = makescene(object2, document.querySelector('#pyramid'))


function renderSceneInfo(sceneInfo) {
  const {scene, camera, object, elem, controls} = sceneInfo;
 
  // get the viewport relative position of this element
  const {left, right, top, bottom, width, height} =
      elem.getBoundingClientRect();
 
  const isOffscreen =
      bottom < 0 ||
      top > renderer.domElement.clientHeight ||
      right < 0 ||
      left > renderer.domElement.clientWidth;

  sceneInfo1.controls.handleResize();
  sceneInfo1.controls.update();

  if (isOffscreen) {
    return;
  }
 
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
 
  const positiveYUpBottom =  renderer.domElement.clientHeight - bottom;
  renderer.setScissor(left, positiveYUpBottom, width, height);
  renderer.setViewport(left, positiveYUpBottom, width, height);
 
  renderer.render(scene, camera);
}

function render(time) {
  time *= 0.001;
 
  resizeRendererToDisplaySize(renderer);
 
  renderer.setScissorTest(false);
  renderer.clear(true, true);
  renderer.setScissorTest(true);
 
  sceneInfo1.object.rotation.y = time * .1;
  sceneInfo2.object.rotation.y = time * .1;

  const transform = `translateY(${window.scrollY}px)`;
  renderer.domElement.style.transform = transform;
  
  sceneInfo1.controls.handleResize();
  sceneInfo1.controls.update();

  sceneInfo1.camera.updateProjectionMatrix();

  renderSceneInfo(sceneInfo1);
  renderSceneInfo(sceneInfo2);
 
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

requestAnimationFrame(render);


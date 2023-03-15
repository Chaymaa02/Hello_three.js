import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {ARButton} from 'three/addons/webxr/ARButton.js';


let camera, scene, renderer;
let container;

init();
animate();


function init() {
    container = document.querySelector('.container');

    //renderer
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    //AR addition
    renderer.xr.enabled = true;
    document.body.appendChild( ARButton.createButton( renderer ) );

    //camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20 );
    camera.position.set( 0, 0, 10);

    //scene and environment
    scene = new THREE.Scene();

    window.addEventListener( 'resize', onWindowResize );

    //objects
    const material = new THREE.LineBasicMaterial({color: 'rgb(255,0,0)'});

    const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const mesh = new THREE.Line(geometry, material);

    scene.add(mesh);
    // render();

    //controls
    const controls = new OrbitControls(camera, container);
    controls.target.set(0,0,0);
    controls.update();

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {
  renderer.render( scene, camera );
  // requestAnimationFrame(render);
}
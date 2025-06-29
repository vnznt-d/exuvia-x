import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('stage');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 2);
scene.add(light);

let model;
const loader = new GLTFLoader();
loader.load(
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r150/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
  gltf => {
    model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    scene.add(model);
  },
  undefined,
  err => console.error(err)
);

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

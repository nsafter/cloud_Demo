import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 1;
camera.rotation.x = 1.16;
camera.rotation.y = -0.12;
camera.rotation.z = 0.27;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.set(0, 80, 120);

// scene.fog = new THREE.FogExp2(0x03544e, 0.001);
// renderer.setClearColor(scene.fog.color);

renderer.render(scene, camera);

// const ambientlight = new THREE.AmbientLight(0x555555);
// scene.add(ambientlight);

let directionalLight = new THREE.DirectionalLight(0xff8c19);
directionalLight.position.set(1, 1, 1);

let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
orangeLight.position.set(200, 300, 100);
scene.add(orangeLight);
let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
redLight.position.set(100, 30, 100);
scene.add(redLight);
let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
blueLight.position.set(300, 300, 200);
scene.add(blueLight);

// const control = new OrbitControls(camera,renderer.domElement);

const smokeTexture = new THREE.TextureLoader().load("smoke.jpg");
const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
const cloudMaterial = new THREE.MeshLambertMaterial({
  map: smokeTexture,
  transparent: true,
});

var cloudMaterials = [];

for (let p = 0; p < 1000 ; p++) {
  let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
  cloud.position.set(Math.random() * 800 - 200, 500, Math.random() * 500 - 550);
  cloud.rotation.x = 1.16;
  cloud.rotation.y = -0.12;
  cloud.rotation.z = Math.random() * 2 * Math.PI;
  cloud.material.opacity = 0.05;
  cloudMaterials.push(cloud);
  scene.add(cloud);
}

function animate() {
  requestAnimationFrame(animate);
  cloudMaterials.forEach((p) => {
    p.rotation.z -= 0.001;
	  p.position.z -= 0.001;
  });
	//camera.rotation.y = 0.01;
	//camera.rotation.z = 0.01;
  // control.update();
  renderer.render(scene, camera);
}
animate();

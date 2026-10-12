
import * as THREE from
  'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// ========================
// שעון דיגיטלי
// ========================

function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  document.getElementById('clock').textContent =
    `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);

// ========================
// צבעי כפתורים משתנים
// ========================

const buttons = document.querySelectorAll('.buttons a');
let hueOffset = 0;

function updateButtonColors() {
  const count = buttons.length;

  buttons.forEach((btn, index) => {
    const hue = (hueOffset + (index / Math.max(count, 1)) * 150) % 360;
    btn.style.backgroundColor = `hsl(${hue}, 38%, 62%)`;
  });

  hueOffset = (hueOffset + 0.075) % 360;

  requestAnimationFrame(updateButtonColors);
}

updateButtonColors();

// ========================
// רקע תלת-ממדי באמצעות Three.js
// ========================

const bg = document.getElementById('background');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 10;
camera.position.x = 0;
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

bg.appendChild(renderer.domElement);

// גוף גאומטרי גדול עם פאות משולשות
const geometry = new THREE.IcosahedronGeometry(1, 3);

const material = new THREE.MeshStandardMaterial({
  color: 0x30385f,
  roughness: 0.58,
  metalness: 0.22,
  flatShading: true
});

const shape = new THREE.Mesh(geometry, material);

// גדול יותר מגובה המסך, חתוך בצד ימין
shape.scale.setScalar(5.8);
shape.position.set(15, 0, -1);

scene.add(shape);

// קווי המתאר של הפאות
const edgesGeometry = new THREE.EdgesGeometry(geometry, 15);

const edgesMaterial = new THREE.LineBasicMaterial({
  color: 0x8799ed,
  transparent: true,
  opacity: 0.65
});

const edges = new THREE.LineSegments(
  edgesGeometry,
  edgesMaterial
);

edges.scale.copy(shape.scale);
edges.position.copy(shape.position);

scene.add(edges);

// תאורה כללית
scene.add(new THREE.AmbientLight(0xffffff, 1.5));

// אור כחול
const blueLight = new THREE.PointLight(0x8298ff, 35);
blueLight.position.set(2, 4, 5);
scene.add(blueLight);

// אור סגול
const purpleLight = new THREE.PointLight(0xb49aff, 25);
purpleLight.position.set(5, -3, 3);
scene.add(purpleLight);

// אנימציה
function animate() {
  requestAnimationFrame(animate);

  shape.rotation.y += 0.0025;
  shape.rotation.x += 0.0008;

  edges.rotation.copy(shape.rotation);

  renderer.render(scene, camera);
}

animate();

// התאמה לשינוי גודל החלון
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

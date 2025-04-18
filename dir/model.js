import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Init
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Create the nucleus (protons and neutrons)
const nucleusGroup = new THREE.Group();
const particleGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const protonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red for protons
const neutronMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green for neutrons

// Parameters for nucleus creation
const maxParticles = 300; // Total number of particles (protons + neutrons)
let nucleusRadius = 0.5; // Start radius for the nucleus
for (let i = 0; i < maxParticles; i++) {
    // Alternate between proton and neutron materials
    const material = i % 2 === 0 ? protonMaterial : neutronMaterial;
    const particle = new THREE.Mesh(particleGeometry, material);

    // Randomize initial positions using spherical coordinates
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(1 - Math.random() * 2);

    particle.userData = { theta, phi, originalRadius: nucleusRadius }; // Store initial coordinates and radius
    nucleusGroup.add(particle);
}
scene.add(nucleusGroup);

// Define electron shell configuration
const electronShells = [2, 8, 18, 32, 32, 18, 8, 2];
const electronGroup = new THREE.Group();

electronShells.forEach((numElectrons, shellIndex) => {
    const shellRadius = 2 + shellIndex * 0.5; // Reduced shell spacing for compactness

    // Create orbit path using `LineLoop` with circular vertices
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitVertices = [];
    const steps = 64; // Number of points for the orbit circle
    for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        orbitVertices.push(shellRadius * Math.cos(angle), 0, shellRadius * Math.sin(angle));
    }
    orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitVertices, 3));
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff }); // White orbit path
    const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
    scene.add(orbit);

    // Create electrons
    for (let i = 0; i < numElectrons; i++) {
        const electronGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const electronMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue for electrons
        const electron = new THREE.Mesh(electronGeometry, electronMaterial);

        const angle = (i / numElectrons) * Math.PI * 2; // Spread electrons evenly in orbit
        electron.position.set(
            shellRadius * Math.cos(angle),
            0,
            shellRadius * Math.sin(angle)
        );

        // Store properties for dynamic animation
        electron.userData = { shellRadius, angleOffset: angle };
        electronGroup.add(electron);
    }
});
scene.add(electronGroup);

// Add lights
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Set camera position
camera.position.z = 15;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    nucleusGroup.children.forEach((particle, index) => {
        const { theta, phi } = particle.userData;

        // Adjust radius dynamically as the nucleus grows
        const radius = nucleusRadius * Math.sqrt(index / maxParticles); // Scale radius for tighter spacing

        particle.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );
    });

    // Animate electron movement along circular paths
    electronGroup.children.forEach((electron) => {
        const { shellRadius, angleOffset } = electron.userData;
        const time = performance.now() * 0.001; // Use time for animation

        electron.position.x = shellRadius * Math.cos(angleOffset + time);
        electron.position.z = shellRadius * Math.sin(angleOffset + time);
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

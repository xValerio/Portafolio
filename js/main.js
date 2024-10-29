// Selección de elementos del DOM
const menuButton = document.querySelector('.menu-button'); // Botón del menú
const sidebar = document.getElementById('sidebar'); // Sidebar (menú lateral)
const closeButton = sidebar.querySelector('.close-button'); // Botón de cerrar el menú
const nombre = document.querySelector('.nombre'); // Elemento con el nombre
const fuentes = ['"Dancing Script", cursive', '"Pacifico", cursive', '"Satisfy", cursive']; // Fuentes para el nombre
let index = 0; // Índice para cambiar las fuentes

// Establecer atributos ARIA para accesibilidad
menuButton.setAttribute('aria-controls', 'sidebar'); // Control de accesibilidad para el menú

// Función para cerrar el menú
function closeMenu() {
    sidebar.classList.remove('active'); // Quitar la clase 'active' del menú
    menuButton.setAttribute('aria-expanded', 'false'); // Actualizar atributo ARIA
    menuButton.focus(); // Focalizar de vuelta al botón del menú
}

// Manejo del clic en el botón del menú
menuButton.addEventListener('click', () => {
    const isActive = sidebar.classList.toggle('active'); // Alternar la clase 'active'
    menuButton.setAttribute('aria-expanded', isActive); // Actualizar atributo ARIA
    isActive ? closeButton.focus() : menuButton.focus(); // Focalizar en el botón correspondiente
});

// Manejo del clic en el botón de cerrar
closeButton.addEventListener('click', closeMenu); // Cerrar el menú

// Cerrar el menú al hacer clic fuera de él
document.addEventListener('click', (event) => {
    if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu(); // Llamar a la función para cerrar el menú
    }
});

// Manejo del evento mouseover para cambiar fuentes
nombre.addEventListener('mouseover', () => {
    index = (index + 1) % fuentes.length; // Cambiar el índice de la fuente
    nombre.style.fontFamily = fuentes[index]; // Aplicar la nueva fuente
});

// Efecto de caída y eliminación del nombre al hacer clic
nombre.addEventListener('click', () => {
    nombre.classList.add('caer'); // Agregar clase para animación
    setTimeout(() => {
        nombre.remove(); // Eliminar el elemento después de la animación
    }, 1600); // Tiempo coincide con la duración de la animación
});

//Three.js de un nudo toroidal rotante y un fondo de estrellas.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('bg-animation').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
var renderer, scene, camera;
var rot = 0;

// Basic settings(scene, camera, spotLight, renderer)
// Set OrbitControls
// Mesh settings
function init() {
  // Add scene
  scene = new THREE.Scene();
  // Camera settings
  var W = window.innerWidth,H = window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);
  // Set spotLight
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  // Set renderer
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);

  // Set OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Create a two dimensional grid(x,z) of objects, and position them accordingly
  // Start from -35 and sequentially add one every 5 pixels
  for (var x = -35; x < 40; x += 5) {
    for (var y = -35; y < 40; y += 5) {
      // Create 225 Cube Meshes with Lambert material
      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      // Set mesh
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        // Set mesh position
        mesh.position.x = x;
        mesh.position.z = y;
        // Assign random rotate directions to x,y,z axises
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;
      // Add mesh to scene
      scene.add(mesh);
    }
  }
}


// Set animations
function drawFrame(){
  requestAnimationFrame(drawFrame);
  renderer.render(scene, camera);
}


init();
drawFrame();

var renderer, scene, camera;
// Arrays
var cubes = [];
var rot_spd = [];
var rot_spd1 = [];
var rot_spd2 = [];

// Basic settings(scene, camera, spotLight, renderer)
// Set OrbitControls
// Mesh settings
function init() {
  // Add scene
  scene = new THREE.Scene();
  // Camera settings
  var W = window.innerWidth,H = window.innerHeight;
  camera = new THREE.PerspectiveCamera(15, W / H, .1, 1000);
  camera.position.set(0, 300, 0);
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

  // Create a two dimensional grid of objects, and position them accordingly
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
    // Add mesh to scene
    scene.add(mesh);
    // Push all meshes into the array
    cubes.push(mesh);
    // Push different random rotate speeds into 3 arrays
    rot_spd.push(Math.random() * 0.1 - 0.05);
    rot_spd1.push(Math.random() * 0.1 - 0.02);
    rot_spd2.push(Math.random() * 0.1 - 0.08);
    }
  }
}


// Set animations
function drawFrame(){
requestAnimationFrame(drawFrame);
  //forEach takes all the array entries and passes the c as the object, and i as the index
 cubes.forEach(function(c, i) {
  // Assign different random rotate speeds to x,y,z axises
  c.rotation.x += rot_spd[i];
  c.rotation.y += rot_spd1[i];
  c.rotation.z += rot_spd2[i];
});
  renderer.render(scene, camera);
}

init();
drawFrame();

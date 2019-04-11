var renderer, scene, camera;
// Arrays
var cubes = [];
var rot_spd = [];
var size = [];
var radius = 2;

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
  // Start from -10 and sequentially add one every 5 pixels
  for (var x = -10; x <= 10; x += 5) {
    for (var y = -10; y <= 10; y += 5) {
      // Create 25 Icosahedron Meshes with Basic material
      var boxGeometry = new THREE.IcosahedronGeometry(radius, 2);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshBasicMaterial({
           color: Math.random() * 0xFFFFFF,
           // All 25 Icosahedrons will only show their wireframe
           wireframe : true
         });
      // Set mesh
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      // Set 'thingssize' range:[0,5PI)
      var thingssize = Math.random()* 10 * Math.PI/2;
      // Add mesh to scene
      scene.add(mesh);
      // Push mesh into array
      cubes.push(mesh);
      // Push random value range: [-0.005,0.005) into array
      rot_spd.push(Math.random()* 0.01 - 0.005);
      // Push random value range: (-5PI,0] into array
      size.push(-thingssize);
    }
  }
}


// Set animations
function drawFrame(){
  requestAnimationFrame(drawFrame);
  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    // Set the random size of the x,y,z:(-5PI,0] for the object that is referenced in c
    c.scale.x = size[i];
    c.scale.y = size[i];
    c.scale.z = size[i];
    // Growing speed is 0.1, if any object become too big whose size is larger than 10, then its size for x,y,z will return to value -10
    size[i] += 0.1;
    if (size[i] > 10) size[i] = -10;
    // Put all the object that is referenced in c in the middle of the screen(0,0,0)
    c.position.x = 0;
    c.position.y = 0;
    c.position.z = 0;
    // Rotate x,y,z of the object that is referenced in c with the ramdom rotate speed:[-0.005,0.005)
    c.rotation.x += rot_spd[i];
    c.rotation.y += rot_spd[i];
    c.rotation.z += rot_spd[i];
  });
  renderer.render(scene, camera);
}


init();
drawFrame();

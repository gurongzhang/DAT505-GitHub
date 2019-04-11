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

  // Create a two dimensional grid of objects, and position them accordingly
  // Start from -10 and sequentially add one every 5 pixels
  for (var x = -10; x <= 10; x += 5) {
    for (var y = -10; y <= 10; y += 5) {
      var boxGeometry = new THREE.IcosahedronGeometry(radius, 2);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshBasicMaterial({
           color: Math.random() * 0xFFFFFF,
           wireframe : true
         });
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
          mesh.position.x = x;
          mesh.position.z = y;
          mesh.rotation.x= Math.random()* 1 * Math.PI/2;
          mesh.rotation.y= Math.random()* 1 * Math.PI/2;
          mesh.rotation.z= Math.random()* 1 * Math.PI/2;

      var thingssize = Math.random()* 10 * Math.PI/2;

      scene.add(mesh);
      cubes.push(mesh);
      rot_spd.push(Math.random()* 0.01 - 0.005);
      size.push(-thingssize);
    }
  }
}


function drawFrame(){
  requestAnimationFrame(drawFrame);
  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    c.scale.x = size[i];
    c.scale.y = size[i];
    c.scale.z = size[i];
    size[i] += 0.1;
  if (size[i] > 10) size[i] = -10;

    c.position.x = 0;
    c.position.y = 0;
    c.position.z = 0;
    c.rotation.x += rot_spd[i];
    c.rotation.y += rot_spd[i];
    c.rotation.z += rot_spd[i];
  });
console.log("size:" + size );
  renderer.render(scene, camera);
}

init();
drawFrame();

var renderer, scene, camera, mesh;
var controls;
// Array
var cubes = [];
var rot = 0;

// Basic settings(scene, camera, spotLight, renderer)
// Set OrbitControls
// Mesh settings
function init() {
  // Add scene
  scene = new THREE.Scene();
  // Camera settings
  var W = window.innerWidth,H = window.innerHeight;
  camera = new THREE.PerspectiveCamera(20, W / H, .1, 1000);
  camera.position.set(10, 10, 85);
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

  //Create a three dimensional grid of objects, and position them accordingly
  // Start from -10 and sequentially add one every 5 pixels
  for (var x = -10; x < 10; x += 5) {
    for (var y = -10; y < 10; y += 5) {
      for (var z = -10; z < 10; z += 5) {
        // Create 64 Cube Meshes with Lambert material
        var boxGeometry = new THREE.BoxGeometry(3, 6, 3);
        // Set mesh
        mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        // Define the conditions for mesh colors
        if(x >= 0 && y>= 0 && z >= 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color:0xFF00FF});
        }
        if(x >= 0 && y>= 0 && z < 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color:0x0000FF});
        }
        if(x < 0 && y>= 0 && z >= 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0x4169E1});
        }
        if(x < 0 && y>= 0 && z < 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0xF08080});
        }
        if(x >= 0 && y< 0 && z >= 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFF00});
        }
        if(x >= 0 && y< 0 && z < 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0x7B68EE});
        }
        if(x < 0 && y< 0&&z >= 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFB6C1});
        }
        if(x < 0 && y< 0&&z < 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0xDC143C});
        }
        // Set mesh postions
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        // Set mesh size
        mesh.scale.y = 0.5;
        // Add mesh to scene
        scene.add(mesh);
        // Push all cubes into array
        cubes.push(mesh);
      }
    }
  }
}


// Set animations
function drawFrame(){
  requestAnimationFrame(drawFrame);
 // Set rotation speed
 rot += 0.02;
 cubes.forEach(function(c, i){
   c.rotation.x = rot;
   c.rotation.y = rot;
   c.rotation.z = rot;
 });
  renderer.render(scene, camera);
}


init();
drawFrame();

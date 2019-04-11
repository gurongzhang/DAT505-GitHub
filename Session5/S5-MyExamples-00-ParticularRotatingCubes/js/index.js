var renderer, scene, camera;
var controls;
// Arrays
var cubes = [];
var rot_spd = [];

// Basic settings(scene, camera, spotLight, renderer)
// Set OrbitControls
// Mesh settings
function init() {
  // Add scene
  scene = new THREE.Scene();
  // Camera settings
  var W = window.innerWidth,H = window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  camera.position.set(10, 20, 85);
  camera.lookAt(scene.position);
  // Set spotLight
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 500, 0);
  scene.add(spotLight);
  // Set AmbientLight
  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0, 500, 0);
  ambLight.add(spotLight);
  scene.add(ambLight);
  //Set renderer
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);

  // Set OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Create a two dimensional grid(x,y) of objects, and position them accordingly
  // Start from -10 and sequentially add one every 5 pixels
  for (var x = -10; x <= 10; x += 5 ) {
   for (var y = -10; y <= 10; y += 5) {
    // Create 25 Cube Meshes with Lambert material
    var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      // Set conditions for colors
      // Assign a random color to Cube(x:-5, y:-5, z:0)
      if (x==-5 && y==-5){
       var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
     }else{// other cubes are white
           boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
      // Assign a random color to Cube(x:5, y:5, z:0)
      if (x==5 && y==5){
           boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      }else {// other cubes are white
           boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
      }
   }
   // Set mesh
   var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
       // Where those cubes placed
       mesh.position.x = x;
       mesh.position.y = y;
       // Assign random rotate directions to x,y,z axises
       mesh.rotation.x = Math.random() * 2 * Math.PI;
       mesh.rotation.y = Math.random() * 2 * Math.PI;
       mesh.rotation.z = Math.random() * 2 * Math.PI;
     // Push random number range[-0.05,0.05) into array
     rot_spd.push(Math.random() * 0.1 - 0.05);
   // Add mesh to scene
   scene.add( mesh );
   // Push mesh into array
   cubes.push(mesh);
    }
  }
}


// Set animations
function drawFrame(){
  requestAnimationFrame(drawFrame);
  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i){
        // Rotate specific cubes(cubes[6], cubes[18])
        // Assign a random number to their rotate speeds for x axis
        cubes[6].rotation.x += rot_spd[i];
        cubes[18].rotation.x += rot_spd[i];
  });
  renderer.render(scene, camera);
}


init();
drawFrame();

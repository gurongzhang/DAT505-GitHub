var renderer, scene, camera;

// Basic settings(scene, camera, spotLight, renderer)
// Set OrbitControls
// Mesh settings
function init() {
  // Add scene
  scene = new THREE.Scene();
  // Camera settings
  var W = window.innerWidth,H = window.innerHeight;
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.y = 400;
  camera.position.z = 400;
  camera.rotation.x = -45 * Math.PI / 180;
  // Set spotLight
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //Set renderer
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);

  // Set OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Create a three dimensional grid(x,y,z) of objects, and position them accordingly
  // Start from -35 and sequentially add one every 5 pixels
  for (var x = -35; x < 40; x += 5) {
    for (var y = -35; y < 40; y += 5) {
      // Create 225 Cube Meshes with Phong material
      var boxGeometry = new THREE.BoxGeometry(30, 30, 30);
      var boxMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
      // Create a cube which has yellow wireframe
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      var boxmesh = new THREE.BoxHelper( mesh, 0xffff00 );
      // Add boxmesh to scene
      scene.add( boxmesh );
      // Assign random values to the mesh posotion x,y,z
      mesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
      mesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
      mesh.position.y = Math.floor( Math.random() * 200 - 100 ) * 4;
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

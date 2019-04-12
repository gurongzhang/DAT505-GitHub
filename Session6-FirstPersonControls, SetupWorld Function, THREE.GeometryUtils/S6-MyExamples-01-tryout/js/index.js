var camera, scene, renderer, controls, clock;
var INV_MAX_FPS = 1 / 100, frameDelta = 0;

// SETUP
function setup() {
  document.body.style.backgroundColor = '#d7f0f7';
  requestAnimationFrame(function animate() {
    draw();
    // FirstPersonControls
    frameDelta += clock.getDelta();
    while (frameDelta >= INV_MAX_FPS) {
      update(INV_MAX_FPS);
      frameDelta -= INV_MAX_FPS;
    }
    requestAnimationFrame( animate );
  });
}

function setupThreeJS() {
  // Add scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x9db3b5, 0.002);
  // Set camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.y = 400;
  camera.position.z = 400;
  camera.rotation.x = -45 * Math.PI / 180;
  // Set renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMapEnabled = true;
  renderer.setClearColor(0x17293a, 1);
  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
  // FirstPersonControls
  clock = new THREE.Clock();
  controls = new THREE.FirstPersonControls(camera);
  controls.movementSpeed = 100;
  controls.lookSpeed = 0.1;
}

function setupWorld() {
  //Set Box Mesh with Phong material
  var geometry = new THREE.CubeGeometry(3, 3, 3);
  // Make the color of the cubes different every time refresh the page
  var material = new THREE.MeshPhongMaterial({color:Math.random() * 0xffffff});;
  //Geometry to store all buildings of the city
  var cityGeometry = new THREE.Geometry();
  for (var i = 0; i < 300; i++) {
    //Create geometry as a clone
    var building = new THREE.Mesh(geometry.clone());

    //Randomize position and the fixed scale of the buildings
    building.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
    building.position.y = Math.floor( Math.random() * 200 - 100 ) * 4;
    building.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
    building.scale.x  = 10;
    building.scale.y  = 10;
    building.scale.z  = 10;

    //Merge all buildings to one model - cityGeometry
    THREE.GeometryUtils.merge(cityGeometry, building);
  }

  //Mesh of the city
  var city = new THREE.Mesh(cityGeometry, material);
  // Add city to scene
  scene.add(city);

  //Create the lighting system and add to the scene
  var light = new THREE.DirectionalLight(0xf9f1c2, 1);
  light.position.set(500, 1500, 1000);
  light.castShadow = true;
  scene.add(light);
}

// DRAW
function draw() {
  renderer.render( scene, camera );
}

// UPDATE =======================================================
function update(delta) {
  controls.update(delta);
}

// RUN ==========================================================
setup();
setupThreeJS();
setupWorld();

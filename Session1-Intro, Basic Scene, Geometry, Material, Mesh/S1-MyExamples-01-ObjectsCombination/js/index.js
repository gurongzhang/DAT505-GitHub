//Global variables:once declared, belongs to no instance in particular and yet can be accessed by all. Just like local variables, global variables must be declared, but unlike a local variable, a global variable remains in memory until the end of the game.
var scene, camera, renderer, dirLight, dirLightHeper;
var geometry, material, mesh;//IcosahedronGeometry0
var geometry1, material1, mesh1;//IcosahedronGeometry1
var spotLight, lightHelper, shadowCameraHelper;
var radius = 20;

// Basic settings(scene, cameram renderer)
function init(){
  // Set scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( "#000000"  );
  // Set camera
  camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set( 0, 8, -10 );
  // Set renderer
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor("#000000");
  renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}


// Create objects
function geometry(){
  // Create an icosahedron mesh with Physical material
  geometry = new THREE.IcosahedronGeometry( radius, 1 );
  material = new THREE.MeshPhysicalMaterial( { color: "#FF1493" } );
  mesh = new THREE.Mesh( geometry, material );
  // Set wireframe
  var wireframeMaterial = new THREE.MeshBasicMaterial( { color: "#000000" , wireframe: true, transparent: true } );
	var wireframe = new THREE.Mesh( geometry, wireframeMaterial );
  // Add wireframe to scene
	mesh.add( wireframe );
  //Define the position of the object
  mesh.position.z = -500;

  //Create another icosahedron mesh with Basic material
  geometry1 = new THREE.IcosahedronGeometry( radius*2, 1 );;
  material1 = new THREE.MeshBasicMaterial( { wireframe: true } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  //Define the position of the object
  mesh1.position.z = -500;

  // Create a plane mesh with Lambert material
  var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
	var groundMat = new THREE.MeshLambertMaterial( { color: "#FFB6C1" } );
	var ground = new THREE.Mesh( groundGeo, groundMat );
   // Define the position of the plane
   ground.position.y = - 40;
	 ground.rotation.x = - Math.PI / 2;
  // Add meshes and ground to scene
  scene.add( ground );
  scene.add( mesh );
  scene.add( mesh1 );

  // Add Directional light
  dirLight = new THREE.DirectionalLight( "#FFB6C1", 1 );
  dirLight.color.setHSL( 0, 0.5, 1 );
  dirLight.position.set( 0, 10, -2.5 );
  dirLight.position.multiplyScalar( 30 );
  scene.add( dirLight );
  dirLight.castShadow = true;

  //Add SpotLight
  //SpotLight( color : Integer, intensity : Float)
  spotLight = new THREE.SpotLight( 0xffffff, 1 );
  // Position
  spotLight.position.set( 15, 40, 35 );
  spotLight.distance = 200;
  // Add spotLight to scene
  scene.add( spotLight );
}


// Render Loop
var render = function () {
 requestAnimationFrame( render );
   //Continuously rotate the mesh(icosahedron0)
   mesh.rotation.y += 0.04;
   mesh.rotation.z += 0.01;
   mesh.rotation.x += 0.03;
   //Continuously rotate the mesh(icosahedron1)
   mesh1.rotation.y -= 0.03;
   mesh1.rotation.z -= 0.01;
   mesh1.rotation.x -= 0.04;

   // Render the scene
   renderer.render(scene, camera);
};

init();
geometry();
render();

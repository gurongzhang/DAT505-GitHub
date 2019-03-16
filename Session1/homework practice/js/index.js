//Global variables
var scene, camera, renderer, dirLight, dirLightHeper;
var geometry, material, mesh;
var geometry1, material1, mesh1;
var spotLight, lightHelper, shadowCameraHelper;
var gui;
var radius = 20;

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();
  scene.background = new THREE.Color( "#000000"  );
  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set( 0, 8, -10 );
  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.IcosahedronGeometry( radius, 1 );
  material = new THREE.MeshPhysicalMaterial( { color: "#FF1493" } );
  mesh = new THREE.Mesh( geometry, material );
  var wireframeMaterial = new THREE.MeshBasicMaterial( { color: "#000000" , wireframe: true, transparent: true } );
	var wireframe = new THREE.Mesh( geometry, wireframeMaterial );
	mesh.add( wireframe );
  mesh.castShadow = true;
	mesh.receiveShadow = true;
  mesh.position.z = -500;

  geometry1 = new THREE.IcosahedronGeometry( radius*2, 1 );;
  material1 = new THREE.MeshBasicMaterial( { wireframe: true } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  mesh1.castShadow = true;
  mesh1.receiveShadow = true;
  mesh1.position.z = -500;

  var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
	var groundMat = new THREE.MeshLambertMaterial( { color: "#FFB6C1" } );
	var ground = new THREE.Mesh( groundGeo, groundMat );
	ground.position.y = - 40;
	ground.rotation.x = - Math.PI / 2;
	ground.receiveShadow = true;

  dirLight = new THREE.DirectionalLight( "#FFB6C1", 1 );
  dirLight.color.setHSL( 0, 0.5, 1 );
  dirLight.position.set( 0, 10, -2.5 );
  dirLight.position.multiplyScalar( 30 );
  scene.add( dirLight );
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  var d = 50;
  dirLight.shadow.camera.left = - d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = - d;
  dirLight.shadow.camera.far = 3500;
  dirLight.shadow.bias = - 0.0001;
  dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
  //scene.add( dirLightHeper );

  // Add mesh to scene
  scene.add( ground );
  scene.add( mesh );
  scene.add( mesh1 );
  var ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
  //scene.add( ambient );

  spotLight = new THREE.SpotLight( 0xffffff, 1 );
  spotLight.position.set( 15, 40, 35 );
  spotLight.angle = Math.PI / 2;
  spotLight.penumbra = 0.05;
  spotLight.decay = 2;
  spotLight.distance = 200;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 200;
  scene.add( spotLight );
  lightHelper = new THREE.SpotLightHelper( spotLight );
  scene.add( lightHelper );
  shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
  scene.add( shadowCameraHelper );
  scene.add( new THREE.AxesHelper( 10 ) );



}



// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.y += 0.04; //Continuously rotate the mesh
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.03;

  mesh1.rotation.y -= 0.03; //Continuously rotate the mesh
  mesh1.rotation.z -= 0.01;
  mesh1.rotation.x -= 0.04;
  renderer.setClearColor("#FFB6C1");

  lightHelper.update();
  shadowCameraHelper.update();

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();

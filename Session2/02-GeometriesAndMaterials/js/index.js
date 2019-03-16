//Global variables
var scene, camera, renderer, dirLight, dirLightHeper;
var geometry, material, mesh;
var geometry1, material1, mesh1;
var geometry2, material2, mesh2;
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
  renderer.setClearColor("#FFFFFF");

  renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.BoxGeometry( 27, 27, 27 );
  material = new THREE.MeshPhysicalMaterial( {
     color: "#FFB6C1",
     clearCoat : 0.1,
     reflectivity : 0.1
    } );
  mesh = new THREE.Mesh( geometry, material );
  //var wireframeMaterial = new THREE.MeshBasicMaterial( { color: "#FFFFFF" , wireframe: true, transparent: true } );
	//var wireframe = new THREE.Mesh( geometry, wireframeMaterial );
	//mesh.add( wireframe );
  mesh.castShadow = true;
	mesh.receiveShadow = true;
  mesh.position.z = -500;

  geometry1 = new THREE.IcosahedronGeometry( radius, 1 );
  var texture = new THREE.TextureLoader().load("textures/hardwood2_diffuse.jpg");
  material1 = new THREE.MeshBasicMaterial( {
    //color: "#FFB6C1",
    //lights : false,
    map: texture
  //  wireframe: true
   } );
  //material1 = new THREE.MeshBasicMaterial( { wireframe: false } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  var wireframeMaterial = new THREE.MeshBasicMaterial( { color: "#00008B" , wireframe: true, transparent: true } );
	var wireframe = new THREE.Mesh( geometry1, wireframeMaterial );
	mesh1.add( wireframe );
  mesh1.position.x = 50;
  mesh1.position.y = 0;
  mesh1.castShadow = true;
  mesh1.receiveShadow = true;
  mesh1.position.z = -500;

  geometry2 = new THREE.ConeGeometry( 10, 40, 32 );
  material2 = new THREE.MeshLambertMaterial( {
     color: "#FFB6C1",
     emissiveIntensity : 0.5,
     emissive : "#FF69B4"
   } );
  //material1 = new THREE.MeshBasicMaterial( { wireframe: false } );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.x = -50;
  mesh2.position.y = 0;
  mesh2.position.z = -500;

  material3 = new THREE.MeshPhongMaterial( {
    color: "#FFB6C1" ,
    specular: 0xffffff,
    shininess: 1000,
    lightMap: null,
    lightMapIntensity: 1,
    bumpMap: null,
    bumpScale: 1,
    normalMap: null,
    normalScale: 1,
    displacementMap: null,
    displacementScale: 1,
    displacementBias: 0,
    specularMap: null

} );
  var geometry3 = new THREE.OctahedronGeometry( radius, 1 );

  mesh3 = new THREE.Mesh( geometry3, material3 );
  mesh3.position.x = -100;
  mesh3.position.y = 0;
  mesh3.position.z = -500;

  material4 = new THREE.MeshNormalMaterial( {
    color: "#FFB6C1",
  lights : false,
  wireframe : true,
  wireframeLinewidth : 1
   } );
  mesh4 = new THREE.Mesh( geometry1, material4 );
  mesh4.position.x = 100;
  mesh4.position.y = 0;
  mesh4.position.z = -500;

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
  //scene.add( ground );
  scene.add( mesh );
  scene.add( mesh1 );
  scene.add( mesh2 );
  scene.add( mesh3 );
  scene.add( mesh4 );
  var ambient = new THREE.AmbientLight( 0xffffff, 0.5 );
  scene.add( ambient );

  spotLight = new THREE.SpotLight( 0xffffff, 1 );
  spotLight.position.set( 15, 40, 35 );
  spotLight.angle = Math.PI / 2;
  spotLight.penumbra = 0.05;
  spotLight.decay = 20;
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

  mesh2.rotation.y -= 0.03; //Continuously rotate the mesh
  mesh2.rotation.z -= 0.01;
  mesh2.rotation.x -= 0.04;

  mesh3.rotation.y += 0.04; //Continuously rotate the mesh
  mesh3.rotation.z += 0.01;
  mesh3.rotation.x += 0.03;

  mesh4.rotation.y -= 0.03; //Continuously rotate the mesh
  mesh4.rotation.z -= 0.01;
  mesh4.rotation.x -= 0.04;
  renderer.setClearColor("#FFB6C1");

  lightHelper.update();
  shadowCameraHelper.update();

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();

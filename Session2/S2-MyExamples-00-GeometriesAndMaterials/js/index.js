//Global variables
var scene, camera, renderer, dirLight, dirLightHeper;
var geometry, material, mesh;
var geometry1, material1, mesh1;
var geometry2, material2, mesh2;
var geometry3, material3, mesh3;
var material4, mesh4;
var spotLight, lightHelper, shadowCameraHelper;
var radius = 20;

// Basic settings
function init(){
  // Create a black scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( "#000000"  );
  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set( 0, 8, -10 );
  // Create a renderer with Antialiasing
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Set renderer
  renderer.setClearColor("#FFFFFF");
  renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}


// Create objects
function geometry(){
  // Create a Cube Mesh with Physical material
  geometry = new THREE.BoxGeometry( 27, 27, 27 );
  material = new THREE.MeshPhysicalMaterial({
     color: "#FFB6C1",
     clearCoat : 0.1,
     reflectivity : 0.1
  });
  // Set mesh
  mesh = new THREE.Mesh( geometry, material );
  // Define the position of this Box
  mesh.position.z = -500;

  // Create an Icosahedron Mesh with Physical material
  geometry1 = new THREE.IcosahedronGeometry( radius, 1 );
  // Load texture to the Icosahedron
  var texture = new THREE.TextureLoader().load("textures/hardwood2_diffuse.jpg");
  material1 = new THREE.MeshBasicMaterial( {map: texture});
  // Set mesh
  mesh1 = new THREE.Mesh( geometry1, material1 );
  // Add wireframe to mesh
  var wireframeMaterial = new THREE.MeshBasicMaterial( { color: "#00008B" , wireframe: true, transparent: true } );
	var wireframe = new THREE.Mesh( geometry1, wireframeMaterial );
	mesh1.add(wireframe);
  // Define the position of this Icosahedron
  mesh1.position.x = 50;
  mesh1.position.z = -500;

  // Create a Cone Mesh with Lambert material
  geometry2 = new THREE.ConeGeometry( 10, 40, 32 );
  material2 = new THREE.MeshLambertMaterial({
    color: "#FFB6C1",
    emissiveIntensity : 0.5,
    emissive : "#0000ff"// Emit blue light
  });
  // Set mesh
  mesh2 = new THREE.Mesh( geometry2, material2 );
  // Define the position of this Cone
  mesh2.position.x = -50;
  mesh2.position.z = -500;

  // Create an Octahedron Mesh with Phong material
  geometry3 = new THREE.OctahedronGeometry( radius, 1 );
  material3 = new THREE.MeshPhongMaterial({
    color: "#FFB6C1" ,
    specular: 0xffffff,
    shininess: 1000,
   });
  // Set mesh
  mesh3 = new THREE.Mesh( geometry3, material3 );
  // Define the position of this Octahedron
  mesh3.position.x = -100;
  mesh3.position.z = -500;

  // Create a Icosahedron Mesh(geometry1) with Normal material
  material4 = new THREE.MeshNormalMaterial({
    color: "#FFB6C1",
    lights : false,
    wireframe : true,
    wireframeLinewidth : 1
  });
  // Set mesh
  mesh4 = new THREE.Mesh( geometry1, material4 );
  // Define the position of this Icosahedron(geometry1)
  mesh4.position.x = 100;
  mesh4.position.z = -500;

  // Add meshes to scene
  scene.add( mesh );
  scene.add( mesh1 );
  scene.add( mesh2 );
  scene.add( mesh3 );
  scene.add( mesh4 );

  // Add directional light
  dirLight = new THREE.DirectionalLight( "#FFB6C1", 1 );
  dirLight.color.setHSL( 0, 0.5, 1 );
  dirLight.position.set( 0, 10, -2.5 );
  scene.add( dirLight );

  // Add ambient light
  var ambient = new THREE.AmbientLight( 0xffffff, 0.5 );
  scene.add( ambient );

  // Add spot light
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
  //Continuously rotate the mesh
  mesh.rotation.y += 0.04;
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.03;
  //Continuously rotate the mesh1
  mesh1.rotation.y -= 0.03;
  mesh1.rotation.z -= 0.01;
  mesh1.rotation.x -= 0.04;
  //Continuously rotate the mesh2
  mesh2.rotation.y -= 0.03;
  mesh2.rotation.z -= 0.01;
  mesh2.rotation.x -= 0.04;
  //Continuously rotate the mesh3
  mesh3.rotation.y += 0.04;
  mesh3.rotation.z += 0.01;
  mesh3.rotation.x += 0.03;
  //Continuously rotate the mesh4
  mesh4.rotation.y -= 0.03;
  mesh4.rotation.z -= 0.01;
  mesh4.rotation.x -= 0.04;

  lightHelper.update();
  shadowCameraHelper.update();

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();

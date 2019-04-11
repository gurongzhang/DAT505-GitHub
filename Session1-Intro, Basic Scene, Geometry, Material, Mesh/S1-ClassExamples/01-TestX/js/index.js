//Global variables
var scene, camera, renderer;
var geometry, material, mesh;
var geometry1, material1, mesh1;
var radius = 20;

// Basic settings(scene, camera, renderer)
function init(){
  // Create an empty scene
  scene = new THREE.Scene();
  // Create a  perspective camera --------------
  camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 200, 20000 );
  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});
  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );
  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}


// Creating objects
function geometry(){
  // Create a Cube Mesh with basic material
  geometry = new THREE.IcosahedronGeometry( radius, 1 );
  // Set color
  material = new THREE.MeshBasicMaterial( { color: "#FFDAB9" } );
  // Set mesh and place mesh
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1500;

  // Create a Cube Mesh with basic material
  geometry1 = new THREE.IcosahedronGeometry( radius*2, 1 );
  //Set color and make it shows its wireframe
  material1 = new THREE.MeshBasicMaterial( { color: "#FFFFF0", wireframe: true } );
  // Set mesh and place mesh
  mesh1 = new THREE.Mesh( geometry1, material1 );
  mesh1.position.z = -500;

  // Add mesh to scene
  scene.add( mesh );
  scene.add( mesh1 );
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );
  //Continuously rotate the x,y,z of the mesh
  mesh.rotation.y += 0.04;
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.03;
  //Continuously rotate the x,y,z of the mesh
  mesh1.rotation.y -= 0.03;
  mesh1.rotation.z -= 0.01;
  mesh1.rotation.x -= 0.04;
  renderer.setClearColor("#FFB6C1");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
